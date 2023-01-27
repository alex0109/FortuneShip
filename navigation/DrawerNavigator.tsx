import React from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';


import { RegistrationStackNavigator, LoginStackNavigator } from './StackNavigator';
import TabNavigator from './TabNavigator';
import User from '../assets/images/user.svg';
import Login from '../assets/images/login.svg';
import Logout from '../assets/images/logout.svg';
import colors from '../styles/local.styles';
import AccountsHeader from '../Screens/Accounts/AccountsHeader';
import { Dimensions, View, Text } from 'react-native';

const Drawer = createDrawerNavigator();

const screenWidth = Dimensions.get('screen').width;

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={({ route }) => ({
        drawerIcon: ({ focused }) => {
          if (route.name == 'MainDrawer') {
            return (
              <User
                width={30}
                height={30}
                fill={focused ? colors.colors.info : colors.colors.white}
              />
            );
          }
          if (route.name == 'RegistrationDrawer') {
            return (
              <Logout
                width={30}
                height={30}
                fill={focused ? colors.colors.info : colors.colors.white}
              />
            );
          }
          if (route.name == 'LoginDrawer') {
            return (
              <Login
                width={30}
                height={30}
                fill={focused ? colors.colors.info : colors.colors.white}
              />
            );
          }
        },
        drawerStyle: {},
        drawerLabelStyle: {
          color: colors.colors.white,
        },
        drawerContentStyle: {
          backgroundColor: colors.colors.blackBar,
        },
        headerStyle: {
          backgroundColor: colors.colors.blackBar,
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTintColor: colors.colors.white,
        swipeEdgeWidth: 50,
      })}
    >
      <Drawer.Screen
        name='MainDrawer'
        options={{
          title: 'Account',
          headerTitleStyle: {
            maxWidth: screenWidth,
          },
          headerTitle: () => {
            return <AccountsHeader />;
          },
          headerRightContainerStyle: {
            backgroundColor: 'gray',
          },
          headerRight: () => {
            return (
              <View style={{ width: screenWidth / 8 }}>
                <Text>Theme</Text>
              </View>
            );
          },
        }}
        component={TabNavigator}
      />
      <Drawer.Screen
        name='RegistrationDrawer'
        options={{ title: 'Logout', headerTitle: '' }}
        component={RegistrationStackNavigator}
      />
      <Drawer.Screen
        name='LoginDrawer'
        options={{ title: 'Login', headerTitle: '' }}
        component={LoginStackNavigator}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
