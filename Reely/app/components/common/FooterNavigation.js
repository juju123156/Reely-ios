import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { View, Text, Image } from 'react-native';

// Placeholder screens
const RecordScreen = () => (
  <View>
    <Text>기록 화면</Text>
  </View>
);
const SearchScreen = () => (
  <View>
    <Text>검색 화면</Text>
  </View>
);
const StatsScreen = () => (
  <View>
    <Text>통계 화면</Text>
  </View>
);
const ArchiveScreen = () => (
  <View>
    <Text>아카이브 화면</Text>
  </View>
);
const SettingsScreen = () => (
  <View>
    <Text>설정 화면</Text>
  </View>
);

const Tab = createBottomTabNavigator();

const FooterNavigation = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, size }) => {
            // Define icon paths for each tab
            const icons = {
              기록: focused
                ? require('@assets/images/icons/calendar_focused.png')
                : require('@assets/images/icons/calendar.png'),
              검색: focused
                ? require('@assets/images/icons/search_focused.png')
                : require('@assets/images/icons/search.png'),
              통계: focused
                ? require('@assets/images/icons/statistics_focused.png')
                : require('@assets/images/icons/statistics.png'),
              아카이브: focused
                ? require('@assets/images/icons/archive_focused.png')
                : require('@assets/images/icons/archive.png'),
              설정 : focused
                ? require('@assets/images/icons/setting_focused.png')
                : require('@assets/images/icons/setting.png'),
            };

            return (
              <Image
                source={icons[route.name]}
                style={{ width: 21, height: 21, marginTop:10 }}
                resizeMode="contain"
              />
            );
          },
          tabBarActiveTintColor: '#0062ff',
          tabBarInactiveTintColor: '#666',
          tabBarStyle: {
            backgroundColor: '#151515',
            borderTopWidth: 1,
            borderTopColor: '#222',
            height: 80,
          },
          tabBarLabelStyle: {
            fontSize: 9,
            fontFamily: 'Pretendard',
            marginTop: 8,
            marginBottom: 6,
          },
          tabBarLabelPosition: 'below-icon',
        })}
      >
        <Tab.Screen 
          name="기록" 
          component={RecordScreen} 
          // options={{
          //   title: '기록',
          // }}
          />
        <Tab.Screen name="검색" component={SearchScreen} />
        <Tab.Screen name="통계" component={StatsScreen} />
        <Tab.Screen name="아카이브" component={ArchiveScreen} />
        <Tab.Screen name="설정" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default FooterNavigation;
