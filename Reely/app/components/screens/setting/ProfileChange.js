import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// 화면의 width와 height 값을 가져옵니다.
const { width, height } = Dimensions.get('window');

const ProfileChange = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
        {/* Profile Header */}
        <View style={styles.header}>
            {/* Back Arrow */}
            <TouchableOpacity onPress={() => navigation.goBack()}> 
                <Image
                    style={styles.arrow}
                    source={require('@assets/images/icons/backArrow.png')} // @assets 경로 사용
                    alt="Back Arrow"
                />
            </TouchableOpacity>
            {/* Title */}
            <Text style={styles.title}>프로필 변경</Text>
        </View>
        {/* Avatar */}
        <Image
            style={styles.avatar}
            source={require('@assets/images/icons/profileChange.png')} // @assets 경로 사용
            alt="Avatar"
        />
        
        <View style={styles.inputContainer}>
          <Text style={styles.label}>유저 네임</Text>
          <View style={styles.inputBox}>
            <Text style={styles.usernameText}>노래하는톰하디</Text>
            <Image
              style={styles.refreshIcon}
              source={require('@assets/images/icons/refresh.png')} // @assets 경로 사용
              alt="refresh"
            />
          </View>
        
      </View>

      {/* Save Button */}
      <TouchableOpacity style={styles.saveButtonContainer}>
        <Text style={styles.saveButtonText}>변경된 프로필 저장</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: 393,
    height: 852,
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
  
   arrow: {
     position: 'absolute',
     left: 25,
     top: 20,
     width: 6,
     height: 17,
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

  inputContainer: {
    alignItems: 'center',
    width: 333,
    position: 'absolute',
    left: width / 2 - 333 / 2, // 화면 너비를 기준으로 중앙 정렬
    top: 236,
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 10,
  },

  inputBox: {
    flex: 1,
    width: 333,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 13,
    borderBottomWidth: 1,
    borderColor: '#444',
    borderBottomWidth: 1,
  },

  label: {
    width: '100%',
    fontSize: 14,
    lineHeight: 14,  // 100% 대신 14px로 설정
    fontFamily: 'Pretendard',
    fontWeight: '600',
    color: '#aaa',
  },

  usernameText: {
    fontSize: 14,
    lineHeight: 21,  // 14px의 1.5배
    letterSpacing: 0.01,
    fontFamily: 'Pretendard',
    fontWeight: '500',
    color: '#eee',
    flexShrink: 1,
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

  avatar: {
    position: 'absolute',
    left: width / 2 - 110 / 2, // 화면 너비를 기준으로 중앙 정렬
    top: 101,
    width: 110,
    height: 110,
  },

  progressBar: {
    position: 'absolute',
    left: width / 2 - 140 / 2, // 화면 너비를 기준으로 중앙 정렬
    top: 839,
    width: 140,
    height: 5,
    backgroundColor: '#fff',
    borderRadius: 100,
  },

  statusBar: {
    position: 'absolute',
    left: 20,
    top: 80,
    width: 312,
    height: 35,
  },

  refreshIcon: {
    width: 13,
    height: 17,
  },
});

export default ProfileChange;
