import React from 'react';
import { View, Text, Image, StyleSheet, TouchableWithoutFeedback, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const TermsDetail = ({ route }) => {
    const { termsTitle, termsContents } = route.params; // 네비게이션을 통해 전달된 데이터

    return (
        <View style={styles.container}>
            {/* 헤더 부분 */}
            <View style={styles.header}>
                <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
                    <Image
                        style={styles.arrow}
                        source={require('@assets/images/icons/backArrow.png')}
                        alt="Back Arrow"
                    />
                </TouchableWithoutFeedback>
                <Text style={styles.title}>{termsTitle}</Text>
            </View>
            <View style={styles.contentsContainer}>
                <Text style={styles.contentsText}>{termsContents}</Text>
            </View>
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
        width: 300,
        height: 35,
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
        fontSize: 19,
        fontFamily: 'Pretendard',
        fontWeight: 'bold',
        color: '#eee',
        textAlign: 'center',
    },
    contentsContainer : {
        marginHorizontal: 20,  // 양옆에 여백을 주기 위한 설정
    },
    contentsText: {
        fontSize: 12,
        color: '#AAAAAA',
        position: 'absolute',
        top: 40,
    },
});

export default TermsDetail;