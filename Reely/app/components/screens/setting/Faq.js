import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, Image, StyleSheet, TouchableWithoutFeedback, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const Faq = () => {
        const navigation = useNavigation();
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
            <Text style={styles.title}>FAQ</Text>
        </View>
    </View>
);
}

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
        left: width / 2 - 133 / 2, // 화면 너비를 기준으로 중앙 정렬
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
    sectionContent: {
        flexDirection: 'column',
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 18, // 푸시 알림 텍스트와 설명 텍스트 사이의 간격
    },
    sectionHeaderDefault: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
  },
    sectionText: {
        fontSize: 16,
        color: '#eee',
    },
    sectionInfoText: {
        fontSize: 13,
        color: '#AAAAAA',
        textAlign: 'left', // 왼쪽 정렬
    },
    divider: {
        backgroundColor: '#333',
        height: 1,
    },
    dividerSpace: {
        backgroundColor: '#111111',
        height: 15,
        borderColor: '#222222',
        borderTopWidth: 0.5,
        borderBottomWidth: 0.5,
    },
});

export default Faq;