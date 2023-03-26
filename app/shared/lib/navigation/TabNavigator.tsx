import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useContext } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import themeContext from 'shared/lib/context/themeContext';

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
      screenOptions={() => ({
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
      <Tab.Screen
        name='AccountsTab'
        options={{
          tabBarIcon: ({ color }) => <Ionicons name='alarm' size={22} color={color} />,
        }}
        component={AccountsStackNavigator}
      />
      <Tab.Screen
        name='ChartTab'
        options={{
          tabBarIcon: ({ color }) => <Ionicons name='alarm' size={22} color={color} />,
        }}
        component={ChartStackNavigator}
      />
      <Tab.Screen
        name='AnalyticsTab'
        options={{
          tabBarIcon: ({ color }) => <Ionicons name='alarm' size={22} color={color} />,
        }}
        component={AnalyticsStackNavigator}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
