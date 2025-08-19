import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '@components/screens/member/Login';  // 로그인 화면
import MainScreen from '@components/navigations/FooterNavigation';    // footer -> main 화면
import JoinScreen from '@components/screens/member/Join';
import ProfileChangeScreen from '@components/screens/setting/ProfileChange';
import EmailChangeScreen from '@components/screens/setting/EmailChange';
import PasswordChangeScreen from '@components/screens/setting/PasswordChange';
import UserDataScreen from '@components/screens/setting/UserData';
import AlertSettingScreen from '@components/screens/setting/AlertSetting';
import FaqScreen from '@components/screens/setting/Faq';
import TermsScreen from '@components/screens/setting/Terms';
import TermsDetailScreen from '@components/screens/setting/TermsDetail';
import ServiceInfoScreen from '@components/screens/setting/ServiceInfo';
import MovieDetailScreen from '@components/screens/movie/MovieDetail';


const Stack = createStackNavigator();

const AppNavigation = () => {
  return (
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        {/* app 페이지 앞단(로그인) screen 정의 */}
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="Join" component={JoinScreen} />
        <Stack.Screen name="ProfileChange" component={ProfileChangeScreen} />
        <Stack.Screen name="EmailChange" component={EmailChangeScreen} />
        <Stack.Screen name="PasswordChange" component={PasswordChangeScreen} />
        <Stack.Screen name="UserData" component={UserDataScreen} />
        <Stack.Screen name="AlertSetting" component={AlertSettingScreen} />
        <Stack.Screen name="Faq" component={FaqScreen} />
        <Stack.Screen name="Terms" component={TermsScreen} />
        <Stack.Screen name="TermsDetail" component={TermsDetailScreen} />
        <Stack.Screen name="ServiceInfo" component={ServiceInfoScreen} />
        <Stack.Screen name="MovieDetail" component={MovieDetailScreen} />
      </Stack.Navigator>
  );
};

export default AppNavigation;