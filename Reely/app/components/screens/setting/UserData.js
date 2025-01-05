import React, {useState} from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Divider } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

// 화면의 크기를 가져옵니다.
const { width, height } = Dimensions.get('window');

const UserData = () => {
    const navigation = useNavigation();
    const [activeSection, setActiveSection] = useState(null);

    const trashcanIcon = require('@assets/images/icons/trashcan.png');

    const handleSectionClick = (sectionName) => {
        setActiveSection(sectionName);
        // 해당 섹션에 따라 페이지 이동 처리
        if (sectionName === '캐시 데이터 삭제') {
          navigation.navigate('DeleteCash');
        } else if (sectionName === '데이터 초기화') {
          navigation.navigate('DataReset');
        } else if (sectionName === '탈퇴하기') {
          navigation.navigate('DeleteAccount');
        }
      }; 

    const Section = ({ title, iconSrc, onClick, isActive, infoText }) => (
      <TouchableOpacity style={styles.section} onPress={onClick}>
        <Text style={[styles.sectionTitle, isActive && styles.activeText]}>{title}</Text>
        <View style={styles.infoBox}>
            {infoText && <Text style={styles.infoText}>{infoText}</Text>}
            {iconSrc && <Image style={styles.icon} source={iconSrc} />}
        </View>
      </TouchableOpacity>
      
    );
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
                <Text style={styles.title}>사용자 데이터</Text>
        </View>
        
      <Section style={styles.sectionTitle}
        title="캐시 데이터 삭제" 
        isActive={activeSection === '캐시 데이터 삭제'}
        onClick={() => handleSectionClick('캐시 데이터 삭제')} 
        infoText="158KB"
        iconSrc={trashcanIcon}/>
      <Divider style={styles.divider} />
      <Section
        title="데이터 초기화"
        isActive={activeSection === '데이터 초기화'}
        onClick={() => handleSectionClick('데이터 초기화')}
        iconSrc={trashcanIcon}
        infoText="158KB"
      />
      <Divider style={styles.divider} />
      <Section
        title="탈퇴하기"
        isActive={activeSection === '탈퇴하기'}
        onClick={() => handleSectionClick('탈퇴하기')}
      />
      <Divider style={styles.divider} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#151515',
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start', // 요소를 오른쪽으로 정렬
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  sectionTitle: {
    fontSize: 15,
    fontFamily: 'Pretendard',
    color: '#EEEEEE',
  },
  divider: {
    top: height * 0.18, 
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
  activeText: {
    color: '#ED7373',
  },
  infoText: {
    width: 40,
    fontSize: 11,
    lineHeight: 16.5,
    fontFamily: 'Pretendard',
    color: '#666',
    //flexDirection: 'row',
    //alignItems: '',
    //paddingHorizontal: 10,
  },
  infoBox: {
    width: 340,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 200,
  },
  icon: {
    width: 10,
    height: 12,
  },
});

export default UserData;
