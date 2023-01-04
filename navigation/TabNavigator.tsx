import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { MainStackNavigator, AnalyticsStackNavigator, AccountsStackNavigator } from "./StackNavigator";

import Dialog from '../assets/images/dialog.svg'
import Eye from '../assets/images/eye.svg'
import File from '../assets/images/file.svg'
import colors from '../styles/projectStyle'

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator initialRouteName="Main tab" screenOptions={({ route }) => ({
      tabBarIcon: ({ focused }) => {
        if(route.name == 'Main tab') {
          return <Dialog width={30} height={30} fill={focused ? colors.colors.info : colors.colors.white}/>
        }
        if(route.name == 'Accounts tab') {
          return <File width={30} height={30} fill={focused ? colors.colors.info : colors.colors.white}/>
        }
        if(route.name == 'Analytics tab') {
          return <Eye width={30} height={40} fill={focused ? colors.colors.info : colors.colors.white}/>
        }
      },
      tabBarStyle: {
        backgroundColor: colors.colors.blackBar,
        borderTopWidth: 0
      },
      tabBarHideOnKeyboard: true,
      tabBarActiveTintColor: colors.colors.warning,
      tabBarInactiveTintColor: 'white',
      headerShown: false, 
      tabBarShowLabel: false
    })}>
      <Tab.Screen name='Accounts tab' component={AccountsStackNavigator} />
      <Tab.Screen name='Main tab' component={MainStackNavigator} />
      <Tab.Screen name='Analytics tab' component={AnalyticsStackNavigator} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;