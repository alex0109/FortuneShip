import { createDrawerNavigator } from '@react-navigation/drawer';
import React, { useContext } from 'react';

import { Dimensions } from 'react-native';
import themeContext from 'shared/lib/context/themeContext';

import AppHeaderTitle from 'shared/ui/AppHeaderTitle/AppHeaderTitle';
import HeaderThemeSwitch from 'shared/ui/HeaderThemeSwitch/HeaderThemeSwitch';

import LoginBl from '../../assets/images/login-bl.svg';
import Login from '../../assets/images/login-wh.svg';
import LogoutBL from '../../assets/images/logout-bl.svg';
import Logout from '../../assets/images/logout-wh.svg';
import UserBl from '../../assets/images/user-bl.svg';
import User from '../../assets/images/user-wh.svg';

import { colors } from '../../assets/styles/local.style';

import { SignInStackNavigator, SignUpStackNavigator } from './StackNavigator';

import TabNavigator from './TabNavigator';

const Drawer = createDrawerNavigator();

const screenWidth = Dimensions.get('screen').width;

const DrawerNavigator = () => {
  const theme = useContext<{ backgroundColor?: string; color?: string }>(themeContext);
  return (
    <Drawer.Navigator
      screenOptions={({ route }) => ({
        drawerIcon: () => {
          if (theme.backgroundColor == colors.blackMain) {
            if (route.name == 'ChartDrawer') {
              return <User width={30} height={30} />;
            }
            if (route.name == 'SignUpDrawer') {
              return <Logout width={30} height={30} />;
            }
            if (route.name == 'SignInDrawer') {
              return <Login width={30} height={30} />;
            }
          } else {
            if (route.name == 'ChartDrawer') {
              return <UserBl width={30} height={30} />;
            }
            if (route.name == 'SignUpDrawer') {
              return <LogoutBL width={30} height={30} />;
            }
            if (route.name == 'SignInDrawer') {
              return <LoginBl width={30} height={30} />;
            }
          }
        },
        drawerStyle: {},
        drawerLabelStyle: {
          color: theme.backgroundColor == colors.blackMain ? colors.white : colors.blackMain,
        },
        drawerContentStyle: {
          backgroundColor:
            theme.backgroundColor == colors.blackMain ? colors.blackBar : colors.gray,
        },
        headerStyle: {
          backgroundColor:
            theme.backgroundColor == colors.blackMain ? colors.blackBar : colors.gray,
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTintColor:
          theme.backgroundColor == colors.blackMain ? colors.white : colors.blackMain,
        swipeEdgeWidth: 50,
      })}>
      <Drawer.Screen
        name='ChartDrawer'
        options={{
          title: 'Account',
          headerTitleStyle: {
            maxWidth: screenWidth,
          },
          headerTitle: () => <AppHeaderTitle />,
          headerRight: () => <HeaderThemeSwitch />,
        }}
        component={TabNavigator}
      />
      <Drawer.Screen
        name='SignUpDrawer'
        options={{ title: 'Logout', headerTitle: '' }}
        component={SignUpStackNavigator}
      />
      <Drawer.Screen
        name='SignInDrawer'
        options={{ title: 'Login', headerTitle: '' }}
        component={SignInStackNavigator}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
