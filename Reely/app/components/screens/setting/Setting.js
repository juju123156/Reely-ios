import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Divider } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';


// Setting 컴포넌트 (설정 페이지 전체 컨테이너)
const Setting = ({ children }) => (
  <View style={styles.settingContainer}>{children}</View>
);

// Section 컴포넌트 (각 항목)
const Section = ({ title, iconSrc, onClick, isActive }) => (
  <TouchableOpacity style={styles.section} onPress={onClick}>
    <Text style={[styles.sectionText, isActive && styles.activeText]}>{title}</Text>
    {iconSrc && <Image style={styles.icon} source={iconSrc} />}
  </TouchableOpacity>
);

// User 컴포넌트 (사용자 설정 페이지)
const User = () => {
  const navigation = useNavigation(); // 페이지 이동을 위한 hook
  const [activeSection, setActiveSection] = useState(null); // 클릭한 섹션 관리

  const arrowIcon = require('@assets/images/icons/arrow.png');
  const profileIcon = require('@assets/images/icons/profile.png');
  const settingIcon = require('@assets/images/icons/setting.png');

  const handleSectionClick = (sectionName) => {
    setActiveSection(sectionName);
    // 해당 섹션에 따라 페이지 이동 처리
    if (sectionName === '이메일 변경') {
      navigation.navigate('EmailChange');
    } else if (sectionName === '비밀번호 변경') {
      navigation.navigate('PasswordChange');
    } else if (sectionName === '사용자 데이터') {
      navigation.navigate('UserData');
    } else if (sectionName === '로그아웃') {
      navigation.navigate('Logout');
    } else if (sectionName === '알림 설정') {
      navigation.navigate('AlertSetting');
    } else if (sectionName === 'FAQ') {
      navigation.navigate('Faq');
    } else if (sectionName === '약관') {
      navigation.navigate('Terms');
    } else if (sectionName === '서비스 정보') {
      navigation.navigate('ServiceInfo');
    }
  }; 

  return (
    <Setting>
      {/* 사용자 정보 */}
      <View style={styles.userInfoContainer}>
        <Image style={styles.profileImage} source={profileIcon} />
        <View style={styles.userTextContainer}>
          <Text style={styles.userName}>노래하는톰하디</Text>
          <Text style={styles.userId}>minjupark</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('ProfileChange')}>
          <Image 
            style={styles.settingsIcon} source={settingIcon}
            />
        </TouchableOpacity>
      </View>

      {/* Divider와 Section */}
      <Divider style={styles.dividerSpace} />
      <Section
        title="이메일 변경" 
        iconSrc={arrowIcon}
        isActive={activeSection === '이메일 변경'}
        onClick={() => handleSectionClick('이메일 변경')}/>
      <Divider style={styles.divider} />
      <Section
        title="비밀번호 변경"
        iconSrc={arrowIcon}
        isActive={activeSection === '비밀번호 변경'}
        onClick={() => handleSectionClick('비밀번호 변경')}
      />
      <Divider style={styles.divider} />
      <Section
        title="사용자 데이터"
        iconSrc={arrowIcon}
        isActive={activeSection === '사용자 데이터'}
        onClick={() => handleSectionClick('사용자 데이터')}
      />
      <Divider style={styles.divider} />
      <Section
        title="로그아웃"
        iconSrc={arrowIcon}
        isActive={activeSection === '로그아웃'}
        onClick={() => handleSectionClick('로그아웃')}
      />
      <Divider style={styles.dividerSpace} />
      <Section
        title="알림 설정"
        iconSrc={arrowIcon}
        isActive={activeSection === '알림 설정'}
        onClick={() => handleSectionClick('알림 설정')}
      />
      <Divider style={styles.dividerSpace} />
      <Section
        title="FAQ"
        iconSrc={arrowIcon}
        isActive={activeSection === 'FAQ'}
        onClick={() => handleSectionClick('FAQ')}
      />
      <Divider style={styles.divider} />
      <Section
        title="약관"
        iconSrc={arrowIcon}
        isActive={activeSection === '약관'}
        onClick={() => handleSectionClick('약관')}
      />
      <Divider style={styles.divider} />
      <Section
        title="서비스 정보"
        iconSrc={arrowIcon}
        isActive={activeSection === '서비스 정보'}
        onClick={() => handleSectionClick('서비스 정보')}
      />
      <Divider style={styles.divider} />
    </Setting>
  );
};

const styles = StyleSheet.create({
  settingContainer: {
    flex: 1,
    backgroundColor: '#151515',
    paddingTop: 20,
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  profileImage: {
    width: 75,
    height: 75,
    borderRadius: 37.5,
    borderRadius: 15,

  },
  userTextContainer: {
    marginLeft: 20,
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#eee',
  },
  userId: {
    fontSize: 14,
    color: '#aaa',
    paddingTop:4,
  },
  settingsIcon: {
    width: 18,
    height: 18,
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  sectionText: {
    fontSize: 15,
    color: '#eee',
  },
  activeText: {
    color: '#337EFF', // 클릭한 항목의 색상 (예: 파란색)
  },
  icon: {
    width: 9,
    height: 9,
  },
  divider: {
    backgroundColor: '#222',
    height: 1,
  },
  dividerSpace: {
    backgroundColor: '#111111',
    height: 15,
    borderColor: '#222222',
    borderTopWidth: 0.5, // 위쪽 테두리
    borderBottomWidth: 0.5, // 아래쪽 테두리
  },
});

export { User, Setting };
