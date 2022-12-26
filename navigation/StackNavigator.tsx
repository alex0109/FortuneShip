import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Main from '../Screens/Main/Main'
import Funds from '../Screens/Funds/Funds'
import Analytics from '../Screens/Analytics/Analytics'
import Registration from '../Screens/Auth/Registration'
import Login from '../Screens/Auth/Login'

const Stack = createStackNavigator();

const screenOptionStyle = {
  headerShown: false
};

const MainStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Main stack" component={Main} />
    </Stack.Navigator>
  );
}

const FundsStackNavigator = () => {
    return (
      <Stack.Navigator screenOptions={screenOptionStyle}>
        <Stack.Screen name="Funds stack" component={Funds} />
      </Stack.Navigator>
    );
  }

const AnalyticsStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Analyticss stack" component={Analytics} />
    </Stack.Navigator>
  );
}

const RegistrationStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Registration stack" component={Registration} />
    </Stack.Navigator>
  );
}

const LoginStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Login stack" component={Login} />
    </Stack.Navigator>
  );
}

export { 
  MainStackNavigator, 
  AnalyticsStackNavigator, 
  FundsStackNavigator, 
  RegistrationStackNavigator,
  LoginStackNavigator 
};