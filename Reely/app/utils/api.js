import axios from 'axios';
import * as Keychain from 'react-native-keychain';
import Config from 'react-native-config';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Axios 인스턴스 생성
const api = axios.create({
  baseURL: Config.BASE_URL,
});

// 토큰 갱신 중 여부와 대기중인 요청을 저장할 변수
let isRefreshing = false;
let refreshSubscribers = [];

// 토큰 갱신 후 대기 중인 요청 처리 함수
const onRefreshed = (newToken) => {
  refreshSubscribers.forEach((callback) => callback(newToken));
  refreshSubscribers = [];
};

// 요청 인터셉터: AsyncStorage에서 access token을 가져와 헤더에 첨부
api.interceptors.request.use(
  async (config) => {
    const accessToken = await AsyncStorage.getItem('accessToken');
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터: 401 (Unauthorized) 에러 발생 시 refresh token으로 access token 갱신
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // 401 에러이고 재시도하지 않은 경우 처리
    if (error.response?.status === 403 && !originalRequest._retry) {
      
      // 이미 토큰 갱신 중인 경우 대기
      if (isRefreshing) {
        return new Promise((resolve) => {
          refreshSubscribers.push((newToken) => {
            originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
            resolve(api(originalRequest));
          });
        });
      }
      
      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Keychain에서 refresh token을 가져올 때 service 옵션 명시
        const refreshTokenCredentials = await Keychain.getGenericPassword();
        if (!refreshTokenCredentials || !refreshTokenCredentials.password) {
          throw new Error('No refresh token found');
        }
        const { password: refreshToken } = refreshTokenCredentials;
        console.log('Refresh Token:', refreshToken);
        
        // 백엔드에 refresh token으로 access token 재발급 요청
        console.log('refresh token 재발급');
        const refreshResponse = await axios.post(`${Config.BASE_URL}/api/auth/reissue`, {
          refreshToken,
        });
        
        const newAccessToken = refreshResponse.data?.accessToken;
        const newRefreshToken = refreshResponse.data?.refreshToken;
        if (!(newAccessToken && newRefreshToken)) {
          throw new Error('No access token received from refresh endpoint');
        }

        await Keychain.setGenericPassword('user' , newRefreshToken, {
            service: "com.Reely.auth",
            accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED, // 잠금 해제 시 접근 가능
        });

        // 새 access token을 AsyncStorage에 저장하고 기본 헤더 업데이트
        await AsyncStorage.setItem('accessToken', newAccessToken);
        api.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;

        // 대기 중인 요청들 처리
        onRefreshed(newAccessToken);
        
        // 원래 요청 헤더 업데이트 후 재시도
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.error("Refresh token 실패:", refreshError);
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;
