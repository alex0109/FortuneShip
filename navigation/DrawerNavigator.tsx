
import React from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";

import { AuthStackNavigator } from "./StackNavigator";
import TabNavigator from "./TabNavigator";

import Dialog from '../assets/images/dialog.svg'
import Eye from '../assets/images/eye.svg'
import User from '../assets/images/user.svg'
import colors from '../styles/projectStyle'

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator screenOptions={({ route }) => ({
        drawerIcon: ({ focused }) => {
          if(route.name == 'Main') {
            return <Dialog width={30} height={30} fill={focused ? colors.colors.info : colors.colors.white}/>
          }
          if(route.name == 'Registration') {
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
      <Drawer.Screen name="Main" component={TabNavigator} />
      <Drawer.Screen name="Registration" component={AuthStackNavigator} />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;