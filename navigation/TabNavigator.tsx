import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import {
  MainStackNavigator,
  AnalyticsStackNavigator,
  AccountsStackNavigator,
  RootStackParamList,
} from './StackNavigator';

import Main from '../assets/images/moneyIconMain.svg';
import Analys from '../assets/images/analys.svg';
import Accounts from '../assets/images/accounts.svg';
import customStyles from '../styles/local.styles';

const Tab = createBottomTabNavigator<RootStackParamList>();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName='MainTab'
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          if (route.name == 'MainTab') {
            return (
              <Main
                width={30}
                height={30}
                fill={focused ? customStyles.colors.info : customStyles.colors.red}
              />
            );
          }
          if (route.name == 'AccountsTab') {
            return (
              <Accounts
                width={30}
                height={30}
                fill={focused ? customStyles.colors.info : customStyles.colors.white}
              />
            );
          }
          if (route.name == 'AnalyticsTab') {
            return (
              <Analys
                width={30}
                height={40}
                fill={focused ? customStyles.colors.info : customStyles.colors.white}
              />
            );
          }
        },
        tabBarStyle: {
          backgroundColor: customStyles.colors.blackBar,
          borderTopWidth: 0,
        },
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: customStyles.colors.warning,
        tabBarInactiveTintColor: 'white',
        headerShown: false,
        tabBarShowLabel: false,
      })}
    >
      <Tab.Screen name='AccountsTab' component={AccountsStackNavigator} />
      <Tab.Screen name='MainTab' component={MainStackNavigator} />
      <Tab.Screen name='AnalyticsTab' component={AnalyticsStackNavigator} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;