import { createStackNavigator } from '@react-navigation/stack';

import Accounts from 'pages/Accounts/Accounts/Accounts';
import Analytic from 'pages/Analytic/components/Analytic/Analytic';
import Category from 'pages/Chart/components/Category/Category';
import Chart from 'pages/Chart/components/Chart/Chart';
import SignIn from 'pages/SignIn/components/SignIn/SignIn';
import SignUp from 'pages/SignUp/components/SignUp/SignUp';

import React from 'react';

export type RootStackParamList = {
  ChartStack: { name: string };
  CategoryStack: { name: string };
  AccountsStack: { name: string };
  AnalyticssStack: { name: string };
  SignUpStack: { name: string };
  SignInStack: { name: string };
  ChartTab: { name: string };
  AccountsTab: { name: string };
  AnalyticsTab: { name: string };
  SignUpDrawer: { name: string };
  SignInDrawer: { name: string };
};

const Stack = createStackNavigator<RootStackParamList>();

const screenOptionStyle = {
  headerShown: false,
  animationEnabled: false,
};

const ChartStackNavigator = () => (
  <Stack.Navigator screenOptions={screenOptionStyle}>
    <Stack.Screen name='ChartStack' options={{ title: 'Main' }} component={Chart} />
    <Stack.Screen name='CategoryStack' options={{ title: 'Category' }} component={Category} />
  </Stack.Navigator>
);

const AccountsStackNavigator = () => (
  <Stack.Navigator screenOptions={screenOptionStyle}>
    <Stack.Screen name='AccountsStack' options={{ title: 'Accounts' }} component={Accounts} />
  </Stack.Navigator>
);

const AnalyticsStackNavigator = () => (
  <Stack.Navigator screenOptions={screenOptionStyle}>
    <Stack.Screen name='AnalyticssStack' component={Analytic} />
  </Stack.Navigator>
);

const SignUpStackNavigator = () => (
  <Stack.Navigator screenOptions={screenOptionStyle}>
    <Stack.Screen name='SignUpStack' component={SignUp} />
  </Stack.Navigator>
);

const SignInStackNavigator = () => (
  <Stack.Navigator screenOptions={screenOptionStyle}>
    <Stack.Screen name='SignInStack' component={SignIn} />
    <Stack.Screen name='SignUpDrawer' component={SignUp} />
  </Stack.Navigator>
);

export {
  ChartStackNavigator,
  AnalyticsStackNavigator,
  AccountsStackNavigator,
  SignUpStackNavigator,
  SignInStackNavigator,
};
