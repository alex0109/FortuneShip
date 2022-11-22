import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { MainStackNavigator, AnalyticsStackNavigator, FundsStackNavigator } from "./StackNavigator";

import Dialog from '../assets/images/dialog.svg'
import Eye from '../assets/images/eye.svg'
import File from '../assets/images/file.svg'
import colors from '../styles/projectStyle'

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator initialRouteName="Main" screenOptions={({ route }) => ({
      tabBarIcon: ({ focused }) => {
        if(route.name == 'Main') {
          return <Dialog width={30} height={30} fill={focused ? colors.colors.info : colors.colors.white}/>
        }
        if(route.name == 'Funds') {
          return <File width={30} height={30} fill={focused ? colors.colors.info : colors.colors.white}/>
        }
        if(route.name == 'Analytics') {
          return <Eye width={30} height={40} fill={focused ? colors.colors.info : colors.colors.white}/>
        }
      },
      tabBarStyle: {
        backgroundColor: colors.colors.blackBar,
      },
      tabBarActiveTintColor: colors.colors.warning,
      tabBarInactiveTintColor: 'white',
      headerShown: false, 
      tabBarShowLabel: false
    })}>
      <Tab.Screen name='Funds' component={FundsStackNavigator} />
      <Tab.Screen name='Main' component={MainStackNavigator} />
      <Tab.Screen name='Analytics' component={AnalyticsStackNavigator} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;