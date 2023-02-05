import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';


import Accounts from '../../assets/images/accounts.svg';
import Analys from '../../assets/images/analys.svg';
import Main from '../../assets/images/moneyIconMain.svg';
import { colors } from '../../assets/styles/local.style';

import {
  ChartStackNavigator,
  AnalyticsStackNavigator,
  AccountsStackNavigator
} from './StackNavigator';

import type {
  RootStackParamList} from './StackNavigator';

const Tab = createBottomTabNavigator<RootStackParamList>();

const BottomTabNavigator = () => (
    <Tab.Navigator
      initialRouteName='ChartTab'
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          if (route.name == 'ChartTab') {
            return <Main width={30} height={30} fill={focused ? colors.info : colors.red} />;
          }
          if (route.name == 'AccountsTab') {
            return <Accounts width={30} height={30} fill={focused ? colors.info : colors.white} />;
          }
          if (route.name == 'AnalyticsTab') {
            return <Analys width={30} height={40} fill={focused ? colors.info : colors.white} />;
          }
        },
        tabBarStyle: {
          backgroundColor: colors.blackBar,
          borderTopWidth: 0,
        },
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: colors.warning,
        tabBarInactiveTintColor: 'white',
        headerShown: false,
        tabBarShowLabel: false,
      })}>
      <Tab.Screen name='AccountsTab' component={AccountsStackNavigator} />
      <Tab.Screen name='ChartTab' component={ChartStackNavigator} />
      <Tab.Screen name='AnalyticsTab' component={AnalyticsStackNavigator} />
    </Tab.Navigator>
  );

export default BottomTabNavigator;
