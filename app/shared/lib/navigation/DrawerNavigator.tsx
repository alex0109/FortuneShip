import Ionicons from '@expo/vector-icons/Ionicons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import React, { useContext } from 'react';

import i18n from 'shared/config/i18n/i18n';
import themeContext from 'shared/lib/context/themeContext';
import HeaderThemeSwitch from 'shared/ui/HeaderThemeSwitch/HeaderThemeSwitch';

import CustomDrawerContent from './CustomDrawerItem/CustomDrawerItem';
import { SignInStackNavigator } from './StackNavigator';

import BottomTabNavigator from './TabNavigator';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const theme = useContext<{ backgroundColor?: string; color?: string }>(themeContext);
  return (
    <Drawer.Navigator
      drawerContent={CustomDrawerContent}
      screenOptions={{
        headerShown: true,
        drawerActiveBackgroundColor: theme.color,
        drawerActiveTintColor: theme.backgroundColor,
        drawerInactiveTintColor: theme.color,
        drawerInactiveBackgroundColor: theme.backgroundColor,
        headerTitle: () => <></>,
        headerStyle: {
          backgroundColor: theme.backgroundColor,
        },
        headerTintColor: theme.color,
        drawerStyle: {
          backgroundColor: theme.backgroundColor,
        },
        drawerLabelStyle: {
          marginLeft: -25,
          fontFamily: 'Assistant',
          fontSize: 15,
        },
        headerRight: () => <HeaderThemeSwitch />,
      }}>
      <Drawer.Screen
        name='Home'
        component={BottomTabNavigator}
        options={{
          drawerIcon: ({ color }) => <Ionicons name='disc' size={22} color={color} />,
          title:i18n.t('Home')!
        }}
      />
      <Drawer.Screen
        name='SignIn'
        component={SignInStackNavigator}
        options={{
          drawerIcon: ({ color }) => <Ionicons name='ios-enter-outline' size={22} color={color} />,
          title:i18n.t('SignIn')!
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
