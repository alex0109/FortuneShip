import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';

import Analytic from '../../assets/images/analytic-wh.svg';
import Card from '../../assets/images/card-wh.svg';
import Chart from '../../assets/images/chart-wh.svg';

import { colors } from '../../assets/styles/local.style';

import {
  ChartStackNavigator,
  AnalyticsStackNavigator,
  AccountsStackNavigator,
} from './StackNavigator';

import type { RootStackParamList } from './StackNavigator';

const Tab = createBottomTabNavigator<RootStackParamList>();

const BottomTabNavigator = () => (
  <Tab.Navigator
    initialRouteName='ChartTab'
    screenOptions={({ route }) => ({
      tabBarIcon: () => {
        if (route.name == 'AccountsTab') {
          return <Card width={30} height={30} />;
        }
        if (route.name == 'ChartTab') {
          return <Chart width={30} height={30} />;
        }
        if (route.name == 'AnalyticsTab') {
          return <Analytic width={30} height={40} />;
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
