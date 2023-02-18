import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useContext } from 'react';
import themeContext from 'shared/lib/context/themeContext';

import AnalyticBl from '../../assets/images/analytic-bl.svg';
import Analytic from '../../assets/images/analytic-wh.svg';
import CardBl from '../../assets/images/card-bl.svg';
import Card from '../../assets/images/card-wh.svg';
import ChartBl from '../../assets/images/chart-bl.svg';
import Chart from '../../assets/images/chart-wh.svg';

import { colors } from '../../assets/styles/local.style';

import {
  ChartStackNavigator,
  AnalyticsStackNavigator,
  AccountsStackNavigator,
} from './StackNavigator';

import type { RootStackParamList } from './StackNavigator';

const Tab = createBottomTabNavigator<RootStackParamList>();

const BottomTabNavigator = () => {
  const theme = useContext<{ backgroundColor?: string; color?: string }>(themeContext);

  return (
    <Tab.Navigator
      initialRouteName='ChartTab'
      screenOptions={({ route }) => ({
        tabBarIcon: () => {
          if (theme.backgroundColor == colors.blackMain) {
            if (route.name == 'AccountsTab') {
              return <Card width={30} height={30} />;
            }
            if (route.name == 'ChartTab') {
              return <Chart width={30} height={30} />;
            }
            if (route.name == 'AnalyticsTab') {
              return <Analytic width={30} height={40} />;
            }
          } else {
            if (route.name == 'AccountsTab') {
              return <CardBl width={30} height={30} />;
            }
            if (route.name == 'ChartTab') {
              return <ChartBl width={30} height={30} />;
            }
            if (route.name == 'AnalyticsTab') {
              return <AnalyticBl width={30} height={40} />;
            }
          }
        },
        tabBarStyle: {
          backgroundColor:
            theme.backgroundColor == colors.blackMain ? colors.blackBar : colors.gray,
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
};

export default BottomTabNavigator;
