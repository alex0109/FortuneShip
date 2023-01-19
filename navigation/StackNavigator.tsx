import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Main from '../Screens/Main/Main';
import Accounts from '../Screens/Accounts/Accounts';
import Analytics from '../Screens/Analytics/Analytics';
import Registration from '../Screens/Auth/Registration';
import Login from '../Screens/Auth/Login';

export type RootStackParamList = {
  MainStack: { name: string };
  AccountsStack: { name: string };
  AnalyticssStack: { name: string };
  RegistrationStack: { name: string };
  LoginStack: { name: string };
  MainTab: { name: string };
  AccountsTab: { name: string };
  AnalyticsTab: { name: string };
  RegistrationDrawer: { name: string };
  LoginDrawer: { name: string };
};

const Stack = createStackNavigator<RootStackParamList>();

const screenOptionStyle = {
  headerShown: false,
};

const MainStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name='MainStack' options={{ title: 'Main' }} component={Main} />
    </Stack.Navigator>
  );
};

const AccountsStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name='AccountsStack' options={{ title: 'Accounts' }} component={Accounts} />
    </Stack.Navigator>
  );
};

const AnalyticsStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name='AnalyticssStack' component={Analytics} />
    </Stack.Navigator>
  );
};

const RegistrationStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name='RegistrationStack' component={Registration} />
    </Stack.Navigator>
  );
};

const LoginStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name='LoginStack' component={Login} />
    </Stack.Navigator>
  );
};

export {
  MainStackNavigator,
  AnalyticsStackNavigator,
  AccountsStackNavigator,
  RegistrationStackNavigator,
  LoginStackNavigator,
};
