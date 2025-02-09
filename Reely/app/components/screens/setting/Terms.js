import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, Image, StyleSheet, TouchableWithoutFeedback, Dimensions, FlatList, ActivityIndicator } from 'react-native';
import Config from 'react-native-config';
import axios from 'axios';

const { width, height } = Dimensions.get('window');

const Terms = () => {
    const navigation = useNavigation();
    const [faqData, setTermsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchTermsData = async () => {
        try {
            const response = await axios.get(`${Config.BASE_URL}/setting/terms/getTermsList`);
            if (response.status !== 200) {
                throw new Error('Failed to fetch data');
            } else {
                const data = response.data;
                setTermsData(data);
            }
        } catch (error) {
            setError(error.message || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTermsData();
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

    return (
        <View style={styles.container}>
            {/* 헤더 부분 */}
            <View style={styles.header}>
                <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
                    <Image
                        style={styles.arrow}
                        source={require('@assets/images/icons/backArrow.png')}
                    />
                </TouchableWithoutFeedback>
                <Text style={styles.title}>약관</Text>
            </View>

            {/* 약관 목록 출력 */} 
            <FlatList
                data={faqData}
                keyExtractor={(item, index) => item.id ? item.termsId.toString() : index.toString()}
                renderItem={({ item }) => (
                    <TouchableWithoutFeedback onPress={() => navigation.navigate('TermsDetail', {
                        termsTitle: item.termsTitle,
                        termsContents: item.termsContents,
                    })}>
                        <View style={styles.section}>
                            <View style={styles.sectionHeader}>
                                <Text style={styles.sectionText}>{item.termsTitle}</Text>
                                <Image
                                    source={require('@assets/images/icons/arrow.png')} // 아이콘 이미지 경로 수정
                                    style={styles.icon}
                                />
                            </View>
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
    sectionText: {
        fontSize: 16,
        color: '#eee',
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
    icon: {
        width: 9,
        height: 9,
    },
});

export default Terms;