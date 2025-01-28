import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Divider } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import SwitchToggle from '@utils/SwitchToggle';

const { width } = Dimensions.get('window');

const AlertSetting = () => {
    const navigation = useNavigation();
    const [isNotificationsOn, setIsNotificationsOn] = useState(false);
    const [isRandomQuestionOn, setIsRandomQuestionOn] = useState(false);
    const [isEventInfoOn, setIsEventInfoOn] = useState(false);

    // 푸시 알림 상태 변경 핸들러
    const handleNotificationToggle = (isOn) => {
        setIsNotificationsOn(isOn);

        // 푸시 알림이 켜질 경우, 하위 토글도 활성화
        if (isOn) {
            setIsRandomQuestionOn(true);
            setIsEventInfoOn(true);
        } else {
            // 푸시 알림이 꺼질 경우, 하위 토글 비활성화
            setIsRandomQuestionOn(false);
            setIsEventInfoOn(false);
        }
    };

    // 하단 토글 상태 연계 처리
    const handleSubToggle = (type, isOn) => {
        if (type === 'random') setIsRandomQuestionOn(isOn);
        if (type === 'event') setIsEventInfoOn(isOn);

        // 두 토글이 모두 꺼질 경우, 상단 알림 비활성화
        if (!isOn && (!isRandomQuestionOn || type === 'random') && (!isEventInfoOn || type === 'event')) {
            handleNotificationToggle(false);
        }
    };

    return (
        <View style={styles.container}>
            {/* Profile Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image
                        style={styles.arrow}
                        source={require('@assets/images/icons/backArrow.png')}
                        alt="Back Arrow"
                    />
                </TouchableOpacity>
                <Text style={styles.title}>알림 설정</Text>
            </View>

            {/* 푸시 알림 섹션 */}
            <View style={styles.section}>
                <View style={[styles.sectionContent, { paddingBottom: 18 }]}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionText}>푸시 알림</Text>
                        <SwitchToggle
                            isOn={isNotificationsOn}
                            onToggle={() => handleNotificationToggle(!isNotificationsOn)}
                        />
                    </View>
                    <Text style={styles.sectionInfoText}>
                        알림을 켜면, Reely에서 알림 받을 항목을 설정할 수 있습니다.
                    </Text>
                </View>
            </View>
            <Divider style={styles.dividerSpace} />

            {/* 랜덤 질문 섹션 */}
            {isNotificationsOn && (
                <View>
                    <TouchableOpacity style={styles.section}>
                        <View style={styles.sectionContent}>
                            <View style={styles.sectionHeader}>
                                <Text style={styles.sectionText}>랜덤 질문</Text>
                                <SwitchToggle
                                    isOn={isRandomQuestionOn}
                                    onToggle={() => handleSubToggle('random', !isRandomQuestionOn)}
                                />
                            </View>
                        </View>
                    </TouchableOpacity>
                    <Divider style={styles.divider} />
                </View>
            )}

            {/* 이벤트 정보 섹션 */}
            {isNotificationsOn && (
                <View>
                    <TouchableOpacity style={styles.section}>
                        <View style={styles.sectionContent}>
                            <View style={styles.sectionHeader}>
                                <Text style={styles.sectionText}>이벤트 정보</Text>
                                <SwitchToggle
                                    isOn={isEventInfoOn}
                                    onToggle={() => handleSubToggle('event', !isEventInfoOn)}
                                />
                            </View>
                        </View>
                    </TouchableOpacity>
                    <Divider style={styles.divider} />
                </View>
            )}
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
    sectionContent: {
        flexDirection: 'column',
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 18,
    },
    sectionText: {
        fontSize: 16,
        color: '#eee',
    },
    sectionInfoText: {
        fontSize: 13,
        color: '#AAAAAA',
        textAlign: 'left',
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

export default AlertSetting;
