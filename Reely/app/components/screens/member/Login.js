import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Switch, Alert, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Keychain from 'react-native-keychain';
import api from '@utils/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
  const navigation = useNavigation();  // useNavigation 훅을 사용하여 네비게이션 객체 가져오기
  const [memberId, setMemberId] = useState('');  // 아이디
  const [memberEmail, setMemberEmail] = useState('');  // 이메일
  const [memberPwd, setMemberPwd] = useState('');  // 비밀번호
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);  // 로그인 상태 유지 여부

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
      };

      const response = await api.post(`/api/auth/login`, params);

      if (response.status === 200) {
        const tokens = response.data;
        // 데이터 저장
        try {
          // 엑세스 토큰 저장
          await AsyncStorage.setItem('accessToken', tokens.accessToken);
          await Keychain.setGenericPassword('user' , tokens.refreshToken, {
            service: "com.Reely.auth",
            accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED, // 잠금 해제 시 접근 가능
          });

          const refreshToken = await Keychain.getGenericPassword();
          console.log(refreshToken);
          console.log('Tokens stored securely!');
        } catch (error) {
          console.error('Error storing tokens', error);
        }

        navigation.navigate('Main'); // 'Main'은 이동하려는 화면의 이름
      } else {
        console.log('로그인 실패:', response.data);
      }
    } catch (error) {
      console.error('로그인 중 오류 발생:', error);
    }
  };

  const handleFindId = () => {
    console.log('아이디 찾기');
  };

  const handleFindPassword = () => {
    console.log('비밀번호 찾기');
  };

  const handleJoin = () => {
    navigation.navigate('Join'); // 'Join'은 이동하려는 회원가입 화면의 이름
  };

  return (
    <View style={styles.container}>
      <Image style={styles.backgroundImage} source={require('@assets/images/icons/test_image.png')} />
      <View style={styles.loginContainer}>
        <Text style={styles.title}>로그인</Text>
        <TextInput
          style={styles.input}
          placeholder="아이디"
          placeholderTextColor="#aaa"
          value={memberId}
          onChangeText={setMemberId}
        />
        <TextInput
          style={styles.input}
          placeholder="비밀번호"
          placeholderTextColor="#aaa"
          secureTextEntry={true}
          value={memberPwd}
          onChangeText={setMemberPwd}
        />
        <View style={styles.keepLoggedInContainer}>
          <View style={styles.keepLoggedInSection}>
            <Switch
              value={keepLoggedIn}
              onValueChange={setKeepLoggedIn}
              trackColor={{ false: '#767577', true: '#005eff' }}
              thumbColor={keepLoggedIn ? '#fff' : '#f4f3f4'}
              style={styles.switch}
            />
            <Text style={styles.keepLoggedInText}>로그인 상태 유지</Text>
          </View>
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
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>로그인</Text>
        </TouchableOpacity>
        <View style={styles.snsLoginContainer}>
          <Text style={styles.snsLoginText}>SNS 계정으로 로그인하기</Text>
          <View style={styles.line} />
        </View>
        <View style={styles.snsIconsContainer}>
          <Image style={styles.snsIcon} source={require('@assets/images/icons/google_icon.png')} />
          <Image style={styles.snsIcon} source={require('@assets/images/icons/naver_icon.png')} />
          <Image style={styles.snsIcon} source={require('@assets/images/icons/kakao_icon.png')} />
        </View>
        <View style={styles.joinContainer}>
          <Text style={styles.joinText}>
            ‘Reely’의 회원이 아니신가요?{' '}
            <Text style={styles.joinLink} onPress={handleJoin}>회원가입하기</Text>
          </Text>
        </View>
      </View>
    </View>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#151515',
  },
  backgroundImage: {
    width: '100%',
    height: height * 0.55,
    position: 'absolute',
    top: 0,
  },
  loginContainer: {
    paddingHorizontal: width * 0.08,
    marginTop: height * 0.4,
  },
  title: {
    fontSize: 25,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: height * 0.03,
  },
  input: {
    width: '100%',
    height: height * 0.05,
    backgroundColor: '#333',
    color: '#fff',
    borderRadius: 3,
    paddingHorizontal: width * 0.03,
    marginBottom: height * 0.02,
  },
  keepLoggedInContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: height * 0.03,
  },
  keepLoggedInSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  switch: {
    transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
  },
  keepLoggedInText: {
    color: '#666',
    marginLeft: width * 0.02,
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
    marginHorizontal: width * 0.01,
  },
  loginButton: {
    backgroundColor: '#005eff',
    paddingVertical: height * 0.015,
    borderRadius: 3,
    alignItems: 'center',
    marginBottom: height * 0.03,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
  snsLoginContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: height * 0.025,
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
    marginBottom: height * 0.03,
  },
  snsIcon: {
    width: width * 0.13,
    height: width * 0.13,
  },
  joinContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  joinText: {
    color: '#aaa',
    fontSize: 11,
  },
  joinLink: {
    textDecorationLine: 'underline',
    fontWeight: 'bold',
    color: '#aaa',
    fontSize: 11,
  },
});

export default Login;
