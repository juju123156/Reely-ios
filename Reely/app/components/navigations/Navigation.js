import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import Search from '../screens/movie/Search';
import BottomTabBar from './BottomTabBar';

// 임시 컴포넌트들
const Record = () => null;
const Statistics = () => null;
const Archive = () => null;
const Settings = () => null;

const Tab = createBottomTabNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBar={props => <BottomTabBar {...props} />}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Tab.Screen name="기록" component={Record} />
        <Tab.Screen name="검색" component={Search} />
        <Tab.Screen name="통계" component={Statistics} />
        <Tab.Screen name="아카이브" component={Archive} />
        <Tab.Screen name="설정" component={Settings} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Navigation; 