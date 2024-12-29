import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// 화면의 너비와 높이 구하기
const { width, height } = Dimensions.get('window');

const Join = () => {
  const [memberId, setMemberId] = useState('');  // 아이디
  const [memberPwd, setMemberPwd] = useState('');  // 비밀번호
  const [memberEmail, setMemberEmail] = useState('');  // 이메일
  const [isIdValid, setIsIdValid] = useState(true);  // 아이디 유효성 상태
  const [isPwdValid, setIsPwdValid] = useState(true);  // 비밀번호 유효성 상태
  const navigation = useNavigation();

  // 뒤로가기
  const handleBackPress = () => {
    navigation.navigate('Login');
  };

  // 회원가입
  const handleJoinPress = () => {
    console.log('join');
  };

  // 아이디 유효성 검사
  const validateId = (id) => {
    return id.length >= 6 && id.length <= 12;  // 간단한 길이 검사
  };

  // 비밀번호 유효성 검사
  const validatePwd = (pwd) => {
    return pwd.length >= 8 && pwd.length <= 20;  // 간단한 길이 검사
  };

  const handleIdChange = (id) => {
    setMemberId(id);
    setIsIdValid(validateId(id));
  };

  const handlePwdChange = (pwd) => {
    setMemberPwd(pwd);
    setIsPwdValid(validatePwd(pwd));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>회원가입</Text>
        <TouchableOpacity onPress={handleBackPress}>
          <Text style={styles.backText}>뒤로가기</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.form}>
        <View style={styles.formGroup}>
          <Text style={styles.label}>아이디</Text>
          <View style={styles.inputWithIcon}>
            <TextInput
              style={styles.input}
              placeholder="아이디 영문 소문자, 숫자 6~12자"
              placeholderTextColor="#444"
              value={memberId}
              onChangeText={handleIdChange}
            />
            {memberId && !isIdValid && (
              <Image
                style={styles.icon}
                width={15}
                height={15}
                source={require('@assets/images/icons/wrong_icon.png')}
              />
            )}
            {memberId && isIdValid && (
              <Image
                style={styles.icon}
                width={15}
                height={15}
                source={require('@assets/images/icons/confirm_icon.png')} // confirm icon when valid
              />
            )}
          </View>
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>비밀번호</Text>
          <View style={styles.inputWithIcon}>
            <TextInput
              style={styles.input}
              placeholder="비밀번호 영문, 숫자, 특수문자 8~20자"
              placeholderTextColor="#444"
              secureTextEntry={true}
              value={memberPwd}
              onChangeText={handlePwdChange}
            />
            {memberPwd && !isPwdValid && (
              <Image
                style={styles.icon}
                width={15}
                height={15}
                source={require('@assets/images/icons/wrong_icon.png')}
              />
            )}
            {memberPwd && isPwdValid && (
              <Image
                style={styles.icon}
                width={15}
                height={15}
                source={require('@assets/images/icons/confirm_icon.png')} // confirm icon when valid
              />
            )}
            <Image
              style={[styles.icon, memberPwd ? styles.iconShift : '']}
              width={15}
              height={18}
              source={require('@assets/images/icons/union.png')}
            />
          </View>
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>이메일</Text>
          <View style={styles.inputWithButton}>
            <TextInput
              style={styles.inputEmail}
              placeholder="이메일 입력"
              placeholderTextColor="#444"
              value={memberEmail}
            />
            <TouchableOpacity style={styles.verifyButton}>
              <Text style={styles.verifyButtonText}>인증번호 전송</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.agreements}>
          {renderAgreement('[필수]  Reely 서비스 이용 약관에 동의합니다.')}
          {renderAgreement('[필수]  개인정보 수집 및 이용에 대한 안내에 동의합니다.')}
          {renderAgreement('[필수]  만 14세 이상입니다.')}
          {renderAgreement('[선택]  광고/이벤트 앱 푸시 알림에 동의합니다.')}
          <View style={styles.agreement}>
            <View style={styles.checkbox} />
            <Text style={styles.agreementText}>약관 전체에 동의합니다.</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity style={styles.joinButton} onPress={handleJoinPress}>
        <Text style={styles.joinButtonText}>회원가입</Text>
      </TouchableOpacity>
    </View>
  );
};

const renderAgreement = (text) => (
  <View style={styles.agreement}>
    <View style={styles.checkbox} />
    <Text style={styles.agreementText}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#151515',
    paddingHorizontal: 20,
    paddingTop: 20,
    justifyContent: 'center', // 컨텐츠를 세로로 가운데 정렬
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  headerText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#eee',
  },
  backText: {
    fontSize: 13,
    color: '#aaa',
  },
  form: {
    marginTop: 30,
  },
  formGroup: {
    marginBottom: 25,
  },
  label: {
    fontSize: 14,
    color: '#aaa',
    fontWeight: 'bold',
  },
  input: {
    height: 35,
    borderColor: '#666',
    borderBottomWidth: 1,
    color: '#444',
    paddingHorizontal: 10,
    marginBottom: 10,
    width: '100%', // 아이디와 비밀번호 입력칸의 너비를 100%로 고정
  },
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%', // 비밀번호 입력칸 너비를 100%로 고정
  },
  icon: {
    position: 'absolute',
    right: 10, // 아이콘을 오른쪽 끝에 배치
    top: 8, // 아이콘을 placeholder와 맞추기 위해 위로 8픽셀 올리기
  },
  iconShift: {
    right: 40, // union 아이콘을 왼쪽으로 밀기 위해 위치 조정
  },
  inputWithButton: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%', // 이메일 입력칸과 인증번호 전송 버튼이 한 줄에 위치하도록 설정
  },
  inputEmail: {
    height: 35,
    borderColor: '#666',
    borderBottomWidth: 1,
    color: '#444',
    paddingHorizontal: 10,
    marginBottom: 10,
    width: '80%', // 이메일 입력창의 너비를 80%로 설정
  },
  verifyButton: {
    backgroundColor: '#222',
    padding: 7,
    borderRadius: 3,
    marginLeft: 10,
    justifyContent: 'center',
    width: '20%', // 인증번호 전송 버튼의 너비를 이메일 입력창과 맞추기 위해 20%로 설정
  },
  verifyButtonText: {
    fontSize: width * 0.025,
    color: '#888',
  },
  agreements: {
    marginTop: 40,
  },
  agreement: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  checkbox: {
    width: 18,
    height: 18,
    backgroundColor: '#15151580',
    borderColor: '#444',
    borderWidth: 1,
    borderRadius: 50,
    marginRight: 10,
  },
  agreementText: {
    fontSize: 11,
    color: '#aaa',
  },
  joinButton: {
    backgroundColor: '#222',
    paddingVertical: 18,
    borderRadius: 3,
    alignItems: 'center',
    marginTop: 30,
  },
  joinButtonText: {
    fontSize: 14,
    color: '#888',
    fontWeight: 'bold',
  },
});

export default Join;
