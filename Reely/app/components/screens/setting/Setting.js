import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Divider } from 'react-native-paper';

// Setting 컴포넌트 (설정 페이지 전체 컨테이너)
const Setting = ({ children }) => (
  <View style={styles.settingContainer}>{children}</View>
);

// Section 컴포넌트 (각 항목)
const Section = ({ title, iconSrc, onClick }) => (
  <View style={styles.section} onClick={onClick}>
    <Text style={styles.sectionText}>{title}</Text>
    {iconSrc && <Image style={styles.icon} source={iconSrc} />}
  </View>
);

// User 컴포넌트 (사용자 설정 페이지)
const User = () => {
  const arrowIcon = require('@assets/images/icons/arrow.png');
  const profileIcon = require('@assets/images/icons/profile.png');
  const settingIcon = require('@assets/images/icons/setting.png');

  return (
    <Setting>
      {/* 사용자 정보 */}
      <View style={styles.userInfoContainer}>
        <Image style={styles.profileImage} source={profileIcon} />
        <View style={styles.userTextContainer}>
          <Text style={styles.userName}>노래하는톰하디</Text>
          <Text style={styles.userId}>minjupark</Text>
        </View>
        <Image style={styles.settingsIcon} source={settingIcon} />
      </View>

      {/* Divider와 Section */}
      <Divider style={styles.dividerSpace} />
      <Section title="이메일 변경" iconSrc={arrowIcon} />
      <Divider style={styles.divider} />
      <Section title="비밀번호 변경" iconSrc={arrowIcon} />
      <Divider style={styles.divider} />
      <Section title="사용자 데이터" iconSrc={arrowIcon} />
      <Divider style={styles.divider} />
      <Section title="로그아웃" iconSrc={arrowIcon} />
      <Divider style={styles.dividerSpace} />
      <Section title="알림 설정" iconSrc={arrowIcon} />
      <Divider style={styles.dividerSpace } />
      <Section title="FAQ" iconSrc={arrowIcon} />
      <Divider style={styles.divider} />
      <Section title="약관" iconSrc={arrowIcon} />
      <Divider style={styles.divider} />
      <Section title="서비스 정보" iconSrc={arrowIcon} />
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
    fontSize: 13,
    color: '#aaa',
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
