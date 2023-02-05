import { createDrawerNavigator } from '@react-navigation/drawer';
import React, { useState } from 'react';

import { Dimensions, View } from 'react-native';

import { EventRegister } from 'react-native-event-listeners';
import { TouchableOpacity } from 'react-native-gesture-handler';

import Dialog from '../../assets/images/eye.svg';
import LightTheme from '../../assets/images/lightButton.svg';
import User from '../../assets/images/user.svg';
import { colors } from '../../assets/styles/local.style';
import AppHeader from '../../ui/AppHeader/AppHeader';

import { SignInStackNavigator, SignUpStackNavigator } from './StackNavigator';
import TabNavigator from './TabNavigator';

const Drawer = createDrawerNavigator();

const screenWidth = Dimensions.get('screen').width;

const DrawerNavigator = () => {
  const [mode, setMode] = useState(true);
  return (
    <Drawer.Navigator
      screenOptions={({ route }) => ({
        drawerIcon: ({ focused }) => {
          if (route.name == 'ChartDrawer') {
            return <Dialog width={30} height={30} fill={focused ? colors.info : colors.white} />;
          }
          if (route.name == 'SignUpDrawer') {
            return <User width={30} height={30} fill={focused ? colors.info : colors.white} />;
          }
          if (route.name == 'SignInDrawer') {
            return <User width={30} height={30} fill={focused ? colors.info : colors.white} />;
          }
        },
        drawerStyle: {},
        drawerLabelStyle: {
          color: colors.white,
        },
        drawerContentStyle: {
          backgroundColor: colors.blackBar,
        },
        headerStyle: {
          backgroundColor: colors.blackBar,
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTintColor: colors.white,
        swipeEdgeWidth: 50,
      })}>
      <Drawer.Screen
        name='ChartDrawer'
        options={{
          title: 'Account',
          headerTitleStyle: {
            maxWidth: screenWidth,
          },
          headerTitle: () => <AppHeader />,
          headerRightContainerStyle: {},
          headerRight: () => (
            <View style={{ width: screenWidth / 8 }}>
              <TouchableOpacity
                onPress={() => {
                  setMode(!mode);
                  EventRegister.emit('changeTheme', mode);
                }}>
                <LightTheme width={30} height={30} fill={colors.white} />
              </TouchableOpacity>
            </View>
          ),
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
