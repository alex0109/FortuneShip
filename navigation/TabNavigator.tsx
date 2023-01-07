import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { MainStackNavigator, AnalyticsStackNavigator, AccountsStackNavigator } from "./StackNavigator";

import Main from '../assets/images/moneyIconMain.svg'
import Analys from '../assets/images/analys.svg'
import Accounts from '../assets/images/accounts.svg'
import customStyles from '../styles/projectStyle'

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator initialRouteName="Main tab" screenOptions={({ route }) => ({
      tabBarIcon: ({ focused }) => {
        if(route.name == 'Main tab') {
          return <Main width={30} height={30} fill={focused ? customStyles.colors.info : customStyles.colors.white}/>
        }
        if(route.name == 'Accounts tab') {
          return <Accounts width={30} height={30} fill={focused ? customStyles.colors.info : customStyles.colors.white}/>
        }
        if(route.name == 'Analytics tab') {
          return <Analys width={30} height={40} fill={focused ? customStyles.colors.info : customStyles.colors.white}/>
        }
      },
      tabBarStyle: {
        backgroundColor: customStyles.colors.blackBar,
        borderTopWidth: 0
      },
      tabBarHideOnKeyboard: true,
      tabBarActiveTintColor: customStyles.colors.warning,
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