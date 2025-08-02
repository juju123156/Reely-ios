import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

const BottomTabBar = ({ state, descriptors, navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.tabItem}
        onPress={() => navigation.navigate('기록')}
      >
        <Image
          source={require('../../assets/images/icons/calendar.png')}
          style={styles.tabIcon}
        />
        <Text style={[styles.tabText, state.index === 0 && styles.activeText]}>기록</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.tabItem}
        onPress={() => navigation.navigate('검색')}
      >
        <Image
          source={require('../../assets/images/icons/search.png')}
          style={styles.tabIcon}
        />
        <Text style={[styles.tabText, state.index === 1 && styles.activeText]}>검색</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.tabItem}
        onPress={() => navigation.navigate('통계')}
      >
        <Image
          source={require('../../assets/images/icons/statistics.png')}
          style={styles.tabIcon}
        />
        <Text style={[styles.tabText, state.index === 2 && styles.activeText]}>통계</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.tabItem}
        onPress={() => navigation.navigate('아카이브')}
      >
        <Image
          source={require('../../assets/images/icons/archive.png')}
          style={styles.tabIcon}
        />
        <Text style={[styles.tabText, state.index === 3 && styles.activeText]}>아카이브</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.tabItem}
        onPress={() => navigation.navigate('설정')}
      >
        <Image
          source={require('../../assets/images/icons/setting.png')}
          style={styles.tabIcon}
        />
        <Text style={[styles.tabText, state.index === 4 && styles.activeText]}>설정</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#151515',
    borderTopWidth: 1,
    borderTopColor: '#333333',
    height: 60,
    paddingBottom: 10,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIcon: {
    width: 24,
    height: 24,
    marginBottom: 4,
  },
  tabText: {
    color: '#666666',
    fontSize: 9,
    fontFamily: 'Pretendard',
    fontWeight: '500',
  },
  activeText: {
    color: '#347BED',
  },
});

export default BottomTabBar; 