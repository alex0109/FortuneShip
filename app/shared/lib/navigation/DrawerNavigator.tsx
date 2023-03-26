import { createDrawerNavigator } from '@react-navigation/drawer';
import React, { useContext } from 'react';

import Ionicons from 'react-native-vector-icons/Ionicons';

import themeContext from 'shared/lib/context/themeContext';
import AppHeaderTitle from 'shared/ui/AppHeaderTitle/AppHeaderTitle';
import HeaderThemeSwitch from 'shared/ui/HeaderThemeSwitch/HeaderThemeSwitch';

import CustomDrawerContent from './CustomDrawerItem/CustomDrawerItem';
import { SignInStackNavigator, SignUpStackNavigator } from './StackNavigator';

import TabNavigator from './TabNavigator';
import BottomTabNavigator from './TabNavigator';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const theme = useContext<{ backgroundColor?: string; color?: string }>(themeContext);
  return (
    <Drawer.Navigator
      drawerContent={CustomDrawerContent}
      screenOptions={{
        headerShown: true,
        drawerActiveBackgroundColor: '#aa18ea',
        drawerActiveTintColor: '#fff',
        drawerInactiveTintColor: '#333',
        drawerLabelStyle: {
          marginLeft: -25,
          fontFamily: 'Assistant',
          fontSize: 15,
        },
      }}>
      <Drawer.Screen
        name='Home'
        component={BottomTabNavigator}
        options={{
          drawerIcon: ({ color }) => <Ionicons name='disc' size={22} color={color} />,
        }}
      />
      <Drawer.Screen
        name='Profile'
        component={BottomTabNavigator}
        options={{
          drawerIcon: ({ color }) => <Ionicons name='person-outline' size={22} color={color} />,
        }}
      />
      <Drawer.Screen
        name='Messages'
        component={BottomTabNavigator}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name='chatbox-ellipses-outline' size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name='Moments'
        component={BottomTabNavigator}
        options={{
          drawerIcon: ({ color }) => <Ionicons name='timer-outline' size={22} color={color} />,
        }}
      />
      <Drawer.Screen
        name='Settings'
        component={BottomTabNavigator}
        options={{
          drawerIcon: ({ color }) => <Ionicons name='settings-outline' size={22} color={color} />,
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
