import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Image, TouchableWithoutFeedback, StyleSheet, Dimensions, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 화면의 크기를 가져옵니다.
const { width, height } = Dimensions.get('window');

const EmailChange = () => {
  const navigation = useNavigation();
  const [memberEmail, setMemberEmail] = useState(null);
  const [newEmail, setNewEmail] = useState(''); // 새로운 이메일 상태
  const [timer, setTimer] = useState(0); // 기본값 0
  const [isTimerActive, setIsTimerActive] = useState(false); // 타이머 작동 여부
  const [isSent, setIsSent] = useState(false); // 버튼 눌림 여부
  const [buttonText, setButtonText] = useState("인증번호 전송"); // 버튼 텍스트
  const [showSuccessMessage, setShowSuccessMessage] = useState(false); // 성공 메시지 표시 상태
  const [errorMessage, setErrorMessage] = useState(''); // 에러 메시지 상태

  useEffect(() => {
    const checkSession = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('userInfo');
        if (storedUser) {
          const user = JSON.parse(storedUser);
          setMemberEmail(user.memberEmail); // 이메일 상태 업데이트
        } else {
          navigation.navigate('Login'); // 세션이 없으면 로그인 화면으로 이동
        }
      } catch (error) {
        console.error(error);
      }
    };

    checkSession();
  }, []);

  // 타이머 감소 로직
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);
  const sendVerificationCode = async () => {
    try {
        const response = await axios.post(`${Config.BASE_URL}/api/auth/emailChange`);
        if (response.status !== 200) {
            throw new Error('Failed to fetch data');
        } else {
          // 성공 시 상태 업데이트
          setShowSuccessMessage(true); // 성공 메시지 표시
          setErrorMessage(''); // 에러 메시지 초기화
          return true;
        }
    } catch (error) {
        setErrorMessage('인증번호 전송에 실패했습니다. 다시 시도해 주세요.'); // 에러 메시지 설정
        setShowSuccessMessage(false); // 성공 메시지 숨기기
        setError(error.message || 'An error occurred');
        return false;
    } finally {
        setLoading(false);
    }
};

if (loading) {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color="#eee" />
        </View>
    );
}

if (error) {
    return (
        <View style={styles.container}>
            <Text style={styles.errorText}>Error: {error}</Text>
        </View>
    );
}

  // 인증번호 전송 버튼 클릭 시 실행
  const handleSendCode = async () => {
    if (!newEmail) {
      Alert.alert('새로운 이메일 주소를 입력해 주세요.');
      return;
    }
    const isSuccess = await sendVerificationCode(newEmail); // 인증번호 전송 API 호출
    if (isSuccess) {
      setTimer(180); // 타이머 재설정
      setIsTimerActive(true); // 타이머 활성화
      setIsSent(true); // 버튼 상태 변경
      setButtonText("인증번호 재전송"); // 버튼 텍스트 변경
    }
  };

  // 타이머 포맷 (MM:SS)
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <View style={[styles.container, { width, height }]}>
    {/* Profile Header */}
    <View style={styles.header}>
        {/* Back Arrow */}
        <TouchableWithoutFeedback onPress={() => navigation.goBack()}> 
            <Image
                style={styles.arrow}
                source={require('@assets/images/icons/backArrow.png')}
                alt="Back Arrow"
            />
        </TouchableWithoutFeedback>
        {/* Title */}
        <Text style={styles.title}>이메일 변경</Text>
    </View>
      

      {/* 기존 이메일 */}
      <View style={styles.section}>
        <Text style={styles.label}>기존 이메일</Text>
        <View style={styles.inputContainer}>
            <View style={styles.inputBox}>
                <Text style={styles.placeHolderText}>{memberEmail}</Text>
            </View>
        </View>
      </View>

      {/* 이메일 */}
      <View style={[styles.section, { top: height * 0.32, left: (width - 333) / 2 }]}>
        <Text style={styles.label}>이메일</Text>
        <View style={styles.emailContainer}>
            <View style={styles.inputBox}>
                <TextInput style={styles.inputText} 
                  placeholder="새로운 이메일 주소"
                  placeholderTextColor="#444" />
            </View>
            <TouchableWithoutFeedback onPress={handleSendCode}>
              <View style={isSent ? styles.sentButton : styles.notSentButton}>
                <Text style={isSent ? styles.sendButtonText : styles.notSendButtonText}>{buttonText}</Text>
              </View>
            </TouchableWithoutFeedback>
        </View>
        <View style={styles.verificationContainer}>
            <View style={styles.inputBox}>
                <TextInput style={styles.inputText} placeholderTextColor='#444' placeholder="인증번호 입력" />
                <Text style={styles.timer}>{formatTime(timer)}</Text>
            </View>
            <TouchableWithoutFeedback onPress={() => {}} disabled={timer === 0}>
              <View style={[styles.verifyButton, timer === 0 && styles.disabledButton]}>
                <Text style={[styles.verifyButtonText, timer === 0 && styles.disabledText]}>인증번호 확인</Text>
              </View>
            </TouchableWithoutFeedback>
        </View>
        {showSuccessMessage && (
          <Text style={styles.successText}>해당 주소로 인증 메일이 전송되었습니다.</Text>
        )}
        {errorMessage && (
          <Text style={styles.errorText}>{errorMessage}</Text>
        )}
      </View>

      {/* 비밀번호 */}
      <View style={[styles.section, { top: height * 0.55, left: (width - 333) / 2 }]}>
        <Text style={styles.label}>비밀번호</Text>
        <View style={styles.inputContainer}>
            <View style={[styles.inputBox, {top:6}]}>
                 <TextInput style={styles.inputText}
                 placeholder="비밀번호 입력"
                 placeholderTextColor="#444"></TextInput>
                 <Image style={styles.icon} source={require('@assets/images/icons/visible.png')} />
            </View>
        </View>
      </View>

      <View style={[styles.saveButtonContainer, { top: height * 0.88, left: (width - 333) / 2 }]}>
        <Text style={styles.saveButtonText}>변경된 이메일 저장</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    backgroundColor: '#151515',
    overflow: 'hidden',
  },
  header: {
    position: 'absolute',
    left: width / 2 - 383 / 2, // 화면 너비를 기준으로 중앙 정렬
    top: 36,
    height:35,
    width: 333,
    flexDirection: 'column',
    //alignItems: 'flex-start',
    //gap: 10,
  },
  arrowIcon: {
    position: 'absolute',
    left: 20,
    top: 80,
    width: 9,
    height: 6,
  },
  title: {
    position: 'absolute',
    left: width / 2 - 133 / 2, // 화면 너비를 기준으로 중앙 정렬
    top: 18,
    width: 133,
    fontSize: 19,
    fontFamily: 'Pretendard',
    fontWeight: 'bold',
    color: '#eee',
    textAlign: 'center',
  },
  arrow: {
    position: 'absolute',
    left: 25,
    top: 20,
    width: 6,
    height: 17,
 },
  section: {
    top: height * 0.18, 
    left: (width - 333) / 2,
    position: 'absolute',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    gap: 10,
  },
  label: {
    width: '100%',
    fontSize: 14,
    lineHeight: 14,
    fontFamily: 'Pretendard',
    fontWeight: '600',
    color: '#aaa',
  },
  inputContainer: {
    width: 333,
    height: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderColor: '#666',
    paddingVertical: 13,
    paddingHorizontal: 10,
  },
  inputBox: {
    flex: 1,
    width: 333,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    borderBottomWidth: 1.5,
    borderColor: '#444',
  },
  placeHolderText: {
    fontSize: 14,
    lineHeight: 21,
    letterSpacing: 0.01,
    fontFamily: 'Pretendard',
    color: '#444',
    fontWeight: '500',
    flexShrink: 1,
    top: 4,
  },
  inputText: {
    fontSize: 14,
    lineHeight: 21,
    letterSpacing: 0.01,
    fontFamily: 'Pretendard',
    color: '#aaa',
    fontWeight: '500',
    flexShrink: 1,
    top: 4,
  },
  emailContainer: {
    width: 333,
    height: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // 좌우 공간 분배
    borderColor: '#666',
    paddingVertical: 13,
    paddingHorizontal: 10,
  },
  sentButton: {
    width: 79,
    height: 23,
    flexDirection: 'row',
    backgroundColor: '#0062ff',
    borderRadius: 3,
    padding: 3,
    marginLeft: 13,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notSentButton: {
    width: 79,
    height: 23,
    backgroundColor: '#222',
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginLeft: 13,
  },
  sendButtonText: {
    fontSize: 10,
    lineHeight: 15,
    fontFamily: 'Pretendard',
    fontWeight: '500',
    color: '#fff',
    textAlign: 'center',
  },

  notSendButtonText: {
    fontSize: 10,
    lineHeight: 15,
    fontFamily: 'Pretendard',
    fontWeight: '500',
    color: '#888',
    textAlign: 'center',
  },
  verificationContainer: {
    width: 333,
    height: 20,
    top: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // 좌우 공간 분배
    borderColor: '#666',
    paddingVertical: 13,
    paddingHorizontal: 10,
  },
  timer: {
    fontSize: 10,
    lineHeight: 15,
    fontFamily: 'Pretendard',
    color: '#ed7373',
    textAlign: 'right',
    top: 8,
  },
  verifyButton: {
    width: 79,
    height: 23,
    backgroundColor: '#222',
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginLeft: 13,
  },
  verifyButtonText: {
    fontSize: 10,
    lineHeight: 15,
    fontFamily: 'Pretendard',
    fontWeight: '500',
    color: '#888',
    textAlign: 'center',
  },
  infoText: {
    width: 323,
    fontSize: 11,
    lineHeight: 16.5,
    fontFamily: 'Pretendard',
    color: '#666',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    top: 10,
    paddingHorizontal: 20,
  },
  icon: {
    width: 18,
    height: 18,
  },
  saveButtonContainer: {
    position: 'absolute',
    left: width / 2 - 333 / 2, // 화면 너비를 기준으로 중앙 정렬
    top: 553,
    width: 333,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#222',
    borderRadius: 3,
  },
  saveButtonText: {
    fontSize: 14,
    lineHeight: 21,
    fontFamily: 'Pretendard',
    fontWeight: '600',
    color: '#888',
    textAlign: 'center',
  },
});

export default EmailChange;
