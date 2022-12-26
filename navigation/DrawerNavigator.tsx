
import React from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";

import { RegistrationStackNavigator, LoginStackNavigator } from "./StackNavigator";
import TabNavigator from "./TabNavigator";

import Dialog from '../assets/images/dialog.svg'
import User from '../assets/images/user.svg'
import colors from '../styles/projectStyle'

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator screenOptions={({ route }) => ({
        drawerIcon: ({ focused }) => {
          if(route.name == 'Main drawer') {
            return <Dialog width={30} height={30} fill={focused ? colors.colors.info : colors.colors.white}/>
          }
          if(route.name == 'Registration drawer') {
            return <User width={30} height={30} fill={focused ? colors.colors.info : colors.colors.white}/>
          }
          if(route.name == 'Login drawer') {
            return <User width={30} height={30} fill={focused ? colors.colors.info : colors.colors.white}/>
          }
        },
        drawerStyle: {},
        drawerLabelStyle: {
          color: colors.colors.white
        },
        drawerContentStyle: {
          backgroundColor: colors.colors.blackBar
        },
        headerStyle: {
          backgroundColor: colors.colors.blackBar
        },
        headerTintColor: colors.colors.white,
        swipeEdgeWidth: 50,
        })} 
      >
      <Drawer.Screen name="Main drawer" options={{title: "Main"}} component={TabNavigator} />
      <Drawer.Screen name="Registration drawer" options={{title: "Registration"}} component={RegistrationStackNavigator} />
      <Drawer.Screen name="Login drawer" options={{title: "Login"}} component={LoginStackNavigator} />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;