
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Main from '../Screens/Main/Main'
import Funds from '../Screens/Funds/Funds'
import Analytics from '../Screens/Analytics/Analytics'
import Registration from '../Screens/Auth/Registration'

const Stack = createStackNavigator();

const screenOptionStyle = {
  headerShown: false
};

const MainStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Main" component={Main} />
      <Stack.Screen name="Funds" component={Funds} />
    </Stack.Navigator>
  );
}

const FundsStackNavigator = () => {
    return (
      <Stack.Navigator screenOptions={screenOptionStyle}>
        <Stack.Screen name="Funds" component={Funds} />
      </Stack.Navigator>
    );
  }

const AnalyticsStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Analyticss" component={Analytics} />
    </Stack.Navigator>
  );
}

const AuthStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Registration" component={Registration} />
    </Stack.Navigator>
  );
}

export { 
  MainStackNavigator, 
  AnalyticsStackNavigator, 
  FundsStackNavigator, 
  AuthStackNavigator 
};