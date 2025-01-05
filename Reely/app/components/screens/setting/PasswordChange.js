import React from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// 화면의 크기를 가져옵니다.
const { width, height } = Dimensions.get('window');

const PasswordChange = () => {
    const navigation = useNavigation();
  return (
    <View style={[styles.container, { width, height }]}>
    <View style={styles.header}>
        {/* Back Arrow */}
        <TouchableOpacity onPress={() => navigation.goBack()}> 
            <Image
                style={styles.arrow}
                source={require('@assets/images/icons/backArrow.png')}
                alt="Back Arrow"
            />
        </TouchableOpacity>
        {/* Title */}
        <Text style={styles.title}>비밀번호 변경</Text>
    </View>
      {/* 이메일 */}
      <View style={styles.section}>
        <Text style={styles.label}>이메일</Text>
        <View style={styles.emailContainer}>
            <View style={styles.inputBox}>
                <TextInput style={styles.inputText} value="newemail@gmail.com" />
            </View>
            <TouchableOpacity style={styles.resendButton}>
                <Text style={styles.resendButtonText}>인증번호 재전송</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.verificationContainer}>
            <View style={styles.inputBox}>
                <TextInput style={styles.inputText} placeholderTextColor='#444' placeholder="인증번호 입력" />
                <Text style={styles.timer}>03:00</Text>
            </View>
            <TouchableOpacity style={styles.verifyButton}>
                <Text style={styles.verifyButtonText}>인증번호 확인</Text>
            </TouchableOpacity>
        </View>
        <Text style={styles.infoText}>해당 주소로 인증 메일이 전송되었습니다.</Text>
      </View>

      {/* 비밀번호 */}
      <View style={[styles.section, { top: height * 0.40, left: (width - 333) / 2 }]}>
        <Text style={styles.label}>새로운 비밀번호</Text>
        <View style={styles.inputContainer}>
            <View style={[styles.inputBox, {top:6}]}>
                 <Text style={styles.inputText}>새로운 비밀번호 입력</Text>
                 <Image style={styles.icon} source={require('@assets/images/icons/visible.png')} />
            </View>
        </View>
        <View style={styles.infoBox}>
            <Text style={[styles.infoTexts,{top:35}]}>* 개인정보와 관련된 비밀번호는 안전을 위해 사용을 자제해 주세요.</Text>
            <Text style={styles.infoTexts}>* 이전에 사용하지 않은 새로운 비밀번호로 변경을 권장드립니다.</Text>
        </View>
      </View>

      <View style={[styles.saveButtonContainer, { top: height * 0.88, left: (width - 333) / 2 }]}>
        <Text style={styles.saveButtonText}>변경된 비밀번호 저장</Text>
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
  inputText: {
    fontSize: 14,
    lineHeight: 21,
    letterSpacing: 0.01,
    fontFamily: 'Pretendard',
    color: '#444',
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
  resendButton: {
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
  resendButtonText: {
    fontSize: 10,
    lineHeight: 15,
    fontFamily: 'Pretendard',
    fontWeight: '500',
    color: '#fff',
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
  infoBox: {
    width: 323,
    justifyContent: 'space-between',
    top: 10,
  },
  infoTexts: {
    fontSize: 10.5,
    lineHeight: 16.5,
    fontFamily: 'Pretendard',
    color: '#666',
    flexDirection: 'row',
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

export default PasswordChange;
