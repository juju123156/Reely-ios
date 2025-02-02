import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, Image, StyleSheet, TouchableWithoutFeedback, Dimensions, FlatList, ActivityIndicator } from 'react-native';
import Config from 'react-native-config';
import axios from 'axios';  // axios 임포트

const { width, height } = Dimensions.get('window');

const Terms = () => {
    const navigation = useNavigation();
    const [faqData, setFaqData] = useState([]);  // 받아온 FAQ 데이터를 상태로 저장
    const [loading, setLoading] = useState(true); // 데이터 로딩 상태 관리
    const [error, setError] = useState(null);     // 에러 상태 관리

    // 백엔드 API에서 FAQ 데이터를 받아오는 함수
    const fetchFaqData = async () => {
        try {
            const response = await axios.get(`${Config.BASE_URL}/setting/terms/getTermsList`); // 실제 API URL로 변경
            if (response.status !== 200) {
                throw new Error('Failed to fetch data');
            }else {
            const data = response.data;  // axios는 response.data에 데이터가 있음
            setFaqData(data);  // 데이터를 상태에 저장
            }
        } catch (error) {
            setError(error.message || 'An error occurred');  // 에러 발생 시 에러 메시지 저장
        } finally {
            setLoading(false);  // 데이터 로딩 완료
        }
    };

    useEffect(() => {
        fetchFaqData();  // 컴포넌트가 마운트될 때 API 호출
    }, []);

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

    const toggleContents = (index) => {
        // 클릭된 index가 확장된 상태면 닫기
        if (expandedIndex === index) {
            setExpandedIndex(null);
        }else {
            setExpandedIndex(index);
        }
    }

    return (
        <View style={styles.container}>
            {/* Profile Header */}
            <View style={styles.header}>
                <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
                    <Image
                        style={styles.arrow}
                        source={require('@assets/images/icons/backArrow.png')}
                        alt="Back Arrow"
                    />
                </TouchableWithoutFeedback>
                <Text style={styles.title}>Terms</Text>
            </View>

            {/* FAQ 목록 출력 */}
            <FlatList
                data={faqData}
                keyExtractor={(item, index) => item.id ? item.faqId.toString() : index.toString()} // 각 항목에 고유 키 지정
                renderItem={({ item, index }) => (
                    <TouchableWithoutFeedback onPress={() => toggleContents(index)}>
                        <View style={styles.section}>
                            
                                <View style={styles.sectionHeader}>
                                    <Text style={styles.sectionText}>{item.faqTitle}</Text>
                                </View>
                            
                            {/* 확장된 항목만 보여줌 */}
                            {expandedIndex === index &&(
                                <View style={styles.sectionHiddenHeader}>
                                    <Text style={styles.sectionInfoText}>{item.faqContents}</Text>
                                </View>
                            )}
                        </View>
                    </TouchableWithoutFeedback>
                )}
                ItemSeparatorComponent={() => <View style={styles.divider} />}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#151515',
        paddingTop: 50,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 35,
        paddingBottom: 70,
        backgroundColor: '#151515',
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
        left: width / 2 - 133 / 2,
        top: 18,
        width: 133,
        fontSize: 19,
        fontFamily: 'Pretendard',
        fontWeight: 'bold',
        color: '#eee',
        textAlign: 'center',
    },
    section: {
        paddingHorizontal: 20,
        paddingVertical: 6,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 10,
        marginBottom: 10,
    },
    sectionHiddenHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#111111',
        marginTop: 10,
        marginBottom: 10,
    },
    sectionText: {
        fontSize: 16,
        color: '#eee',
    },
    sectionInfoText: {
        borderTopWidth: 0.5,    // 위쪽 테두리
        borderBottomWidth: 0.5, // 아래쪽 테두리
        borderLeftWidth: 0,     // 왼쪽 테두리 없음
        borderRightWidth: 0,    // 오른쪽 테두리 없음
        fontSize: 13,
        color : '#FFFFFF',
        textAlign: 'left',
    },
    divider: {
        backgroundColor: '#333',
        height: 1,
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
    },
    dividerSpace: {
        backgroundColor: '#111111',
        height: 15,
        borderColor: '#222222',
        borderTopWidth: 0.5,
        borderBottomWidth: 0.5,
    },
});

export default Terms;
