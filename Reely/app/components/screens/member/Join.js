import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// 화면의 너비와 높이 구하기
const { width, height } = Dimensions.get('window');

const Join = () => {
  const navigation = useNavigation();
  const handleBackPress = () => {
    navigation.navigate('Login');
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
          <TextInput
            style={styles.input}
            placeholder="아이디 영문 소문자, 숫자 6~12자"
            placeholderTextColor="#444"
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>비밀번호</Text>
          <View style={styles.inputWithIcon}>
            <TextInput
              style={styles.input}
              placeholder="비밀번호 영문, 숫자, 특수문자 8~20자"
              placeholderTextColor="#444"
              secureTextEntry={true}
            />
            <Image
              style={styles.icon}
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
      <TouchableOpacity style={styles.signUpButton}>
        <Text style={styles.signUpButtonText}>회원가입</Text>
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
    marginBottom: 20,
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
    width: 22,
    height: 18,
    position: 'absolute',
    right: 10, // 아이콘을 오른쪽 끝에 배치
    top: 8, // 아이콘을 placeholder와 맞추기 위해 위로 8픽셀 올리기
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
  signUpButton: {
    backgroundColor: '#222',
    paddingVertical: 18,
    borderRadius: 3,
    alignItems: 'center',
    marginTop: 30,
  },
  signUpButtonText: {
    fontSize: 14,
    color: '#888',
    fontWeight: 'bold',
  },
});

export default Join;
