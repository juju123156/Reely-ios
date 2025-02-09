import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions, Alert } from 'react-native';
import { Divider } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import DeviceInfo from 'react-native-device-info';  // 현재 버전을 가져오는 라이브러리

// 화면의 크기를 가져옵니다.
const { width, height } = Dimensions.get('window');

const ServiceInfo = () => {
    const navigation = useNavigation();
    const [activeSection, setActiveSection] = useState(null);
    const [currentVersion, setCurrentVersion] = useState(null); // 현재 버전
    const [latestVersion, setLatestVersion] = useState(null); // 최신 버전
    const [versionStatus, setVersionStatus] = useState('');
    const [loading, setLoading] = useState(false); // 로딩 상태
    const [error, setError] = useState(null);

    useEffect(() => {
        // 현재 버전 가져오기 (앱에 하드코딩된 값)
        const version = DeviceInfo.getVersion();
        setCurrentVersion(version);
        
        const fetchVersionData = async () => {
            try {
                const response = await axios.get(`${Config.BASE_URL}/setting/serviceInfo/getLatestVersion`);
                if (response.status !== 200) {
                    throw new Error('Failed to fetch data');
                } else {
                    const data = response.data;
                    setLatestVersion(data.latestVersion);
                }
            } catch (error) {
                setError(error.message || 'An error occurred');
            } finally {
                setLoading(false);
            }
        };
        fetchVersionData();
    }, []); // 컴포넌트가 마운트될 때 한 번만 실행

    useEffect(() => {
        if (latestVersion) {
            if (currentVersion === latestVersion) {
                setVersionStatus('최신 버전입니다');
            } else {
                setVersionStatus('버전 업데이트');
            }
        }
    }, [latestVersion]);

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

    const handleSectionClick = (sectionName) => {
        setActiveSection(sectionName);
        // 해당 섹션에 따라 페이지 이동 처리
        if (sectionName === '버전 정보') {
          
        } else if (sectionName === '리뷰 남기기') {
          navigation.navigate('writeReview');
        }
      }; 
    
    const handleUpdateVersion = () => {
        // 실제 버전 업데이트 이벤트 처리 (여기서는 Alert로 알림)
        Alert.alert("버전 업데이트", "새로운 버전이 있습니다. 업데이트를 진행하세요.");
        // 여기서 실제 업데이트 로직을 추가할 수 있습니다.
    };

    const Section = ({ title, onClick, isActive, infoText }) => (
      <TouchableOpacity style={styles.section} onPress={onClick}>
        <Text style={[styles.sectionTitle, isActive && styles.activeText]}>{title}</Text>
        <View style={styles.infoBox}>
            {infoText && <Text style={styles.infoText}>{infoText}</Text>}
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
                <Text style={styles.title}>서비스 정보</Text>
        </View>
        
        <Section
                title="버전 정보"
                isActive={activeSection === '버전 정보'}
                onClick={() => handleSectionClick('버전 정보')}
                infoText={
                    <>
                        {loading ? (
                            <Text style={styles.versionText}>로딩 중...</Text>
                        ) : (
                            <>
                                <Text style={styles.versionText}>{currentVersion}</Text>
                                {versionStatus === '최신 버전입니다' ? (
                                    <Text style={styles.latestVersion}>{versionStatus}</Text>
                                ) : (
                                    <TouchableOpacity onPress={handleUpdateVersion}>
                                        <Text style={styles.updateVersion}>{versionStatus}</Text>
                                    </TouchableOpacity>
                                )}
                            </>
                        )}
                    </>
                }
            />
      <Divider style={styles.divider} />
      <Section
        title="리뷰 남기기"
        isActive={activeSection === '리뷰 남기기'}
        onClick={() => handleSectionClick('리뷰 남기기')}
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
    width: '30%',
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
  infoBox: {
    width: '70%',
    flexDirection: 'row', // 수직 정렬
    alignItems: 'center', // 왼쪽 정렬
    justifyContent: 'flex-end',
    paddingHorizontal: 10,  // 아이콘과 텍스트 사이의 간격을 설정
  },
  infoText: {
    width: 50,
    fontSize: 11,
    lineHeight: 16.5,
    fontFamily: 'Pretendard',
    color: '#666',
    textAlign: 'left',
    flexDirection: 'row',
    //alignItems: '',
    //paddingHorizontal: 10,
  },
  icon: {
    //flex: 1,
    width: 10,
    height: 12,
  },
});

export default ServiceInfo;
