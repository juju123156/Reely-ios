import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Switch, Alert } from 'react-native';
import axios from 'axios';  // axios 임포트
import { useNavigation } from '@react-navigation/native';

const Login = () => {
  // 상태 변수 선언
  const navigation = useNavigation();  // useNavigation 훅을 사용하여 네비게이션 객체 가져오기
  const [memberId, setMemberId] = useState('');  // 아이디
  const [memberPwd, setMemberPwd] = useState('');  // 비밀번호
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);  // 로그인 상태 유지 여부

  // 로그인 버튼 클릭 시 처리 함수
  const handleLogin = async () => {
    try {
      console.log('로그인 시도:', memberId, memberPwd);
      if (!(memberId && memberPwd)) {
        Alert.alert('아이디와 비밀번호를 입력해주세요.');
        return;
      }
      const params = {
        memberId,
        memberPwd,
        keepLoggedIn,
      };

      // axios를 사용하여 서버에 로그인 요청 보내기
      const response = await axios.post('http://localhost:8080/api/auth/login', params);

      // 서버 응답에 따른 처리
      if (response.status === 200) {
        console.log('로그인 성공:', response.data);
        // 성공적인 로그인 후 처리 (예: 토큰 저장, 화면 이동 등)
        navigation.navigate('Main'); // 'Home'은 이동하려는 화면의 이름
      } else {
        console.log('로그인 실패:', response.data);
        // 로그인 실패 처리
      }
    } catch (error) {
      console.error('로그인 중 오류 발생:', error);
      // 오류 발생 시 처리
    }
  };

  // 아이디 찾기 클릭 시 처리 함수
  const handleFindId = () => {
    console.log('아이디 찾기');
    // 여기에 아이디 찾기 로직 추가
  };

  // 비밀번호 찾기 클릭 시 처리 함수
  const handleFindPassword = () => {
    console.log('비밀번호 찾기');
    // 여기에 비밀번호 찾기 로직 추가
  };

  return (
    <View style={styles.container}>
      <Image style={styles.backgroundImage} source={require('@assets/images/icons/test_image.png')} />
      <View style={styles.loginContainer}>
        <Text style={styles.title}>로그인</Text>

        {/* 아이디 입력 */}
        <TextInput
          style={styles.input}
          placeholder="아이디"
          placeholderTextColor="#aaa"
          value={memberId}
          onChangeText={setMemberId}  // 입력 값 상태 업데이트
        />
        
        {/* 비밀번호 입력 */}
        <TextInput
          style={styles.input}
          placeholder="비밀번호"
          placeholderTextColor="#aaa"
          secureTextEntry={true}
          value={memberPwd}
          onChangeText={setMemberPwd}  // 입력 값 상태 업데이트
        />

        {/* 로그인 상태 유지와 아이디/비밀번호 찾기 버튼 배치 */}
        <View style={styles.keepLoggedInContainer}>
          {/* 로그인 상태 유지 */}
          <View style={styles.keepLoggedInSection}>
            <Switch
              value={keepLoggedIn}  // Switch 상태 값
              onValueChange={setKeepLoggedIn}  // 상태 변경 시 처리
              trackColor={{ false: '#767577', true: '#005eff' }}
              thumbColor={keepLoggedIn ? '#fff' : '#f4f3f4'}
              style={styles.switch}  // 크기 조정을 위한 스타일 추가
            />
            <Text style={styles.keepLoggedInText}>로그인 상태 유지</Text>
          </View>

          {/* 아이디 찾기 | 비밀번호 찾기 */}
          <View style={styles.forgotPasswordContainer}>
            <TouchableOpacity onPress={handleFindId}>
              <Text style={styles.forgotPasswordText}>아이디 찾기</Text>
            </TouchableOpacity>
            <Text style={styles.divider}>|</Text>
            <TouchableOpacity onPress={handleFindPassword}>
              <Text style={styles.forgotPasswordText}>비밀번호 찾기</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 로그인 버튼 */}
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>로그인</Text>
        </TouchableOpacity>

        {/* SNS 계정으로 로그인 */}
        <View style={styles.snsLoginContainer}>
          <Text style={styles.snsLoginText}>SNS 계정으로 로그인하기</Text>
          <View style={styles.line} />
        </View>

        {/* SNS 로그인 아이콘 */}
        <View style={styles.snsIconsContainer}>
          <Image style={styles.snsIcon} source={require('@assets/images/icons/google_icon.png')} />
          <Image style={styles.snsIcon} source={require('@assets/images/icons/naver_icon.png')} />
          <Image style={styles.snsIcon} source={require('@assets/images/icons/kakao_icon.png')} />
        </View>

        {/* 회원가입 링크 */}
        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>
            ‘Reely’의 회원이 아니신가요? <Text style={styles.signupLink}>회원가입하기</Text>
          </Text>
        </View>
      </View>
    </View>
  );
};

// 스타일 정의
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#151515',
  },
  backgroundImage: {
    width: '100%',
    height: 446,
    position: 'absolute',
    top: 0,
  },
  loginContainer: {
    paddingHorizontal: 30,
    marginTop: 380,
  },
  title: {
    fontSize: 25,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 25,
  },
  input: {
    width: '100%',
    height: 40,
    backgroundColor: '#333',
    color: '#fff',
    borderRadius: 3,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  keepLoggedInContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
  },
  keepLoggedInSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  switch: {
    transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],  // 크기 축소
  },
  keepLoggedInText: {
    color: '#666',
    marginLeft: 5,
  },
  forgotPasswordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  forgotPasswordText: {
    color: '#aaa',
    fontSize: 12,
  },
  divider: {
    color: '#aaa',
    fontSize: 12,
    marginHorizontal: 5,
  },
  loginButton: {
    backgroundColor: '#005eff',
    paddingVertical: 12,
    borderRadius: 3,
    alignItems: 'center',
    marginBottom: 25,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
  snsLoginContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  snsLoginText: {
    color: '#666',
    fontSize: 11,
    textAlign: 'center',
    flex: 1,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#666',
  },
  snsIconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 25,
  },
  snsIcon: {
    width: 50,
    height: 50,
  },
  signupContainer: {
    alignItems: 'center',
  },
  signupText: {
    color: '#aaa',
    fontSize: 11,
  },
  signupLink: {
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
});

export default Login;