import React, { useState } from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { EventRegister } from 'react-native-event-listeners';

import { RegistrationStackNavigator, LoginStackNavigator } from './StackNavigator';
import TabNavigator from './TabNavigator';

import Dialog from '../assets/images/dialog.svg';
import User from '../assets/images/user.svg';
import LightTheme from '../assets/images/lightButton.svg';

import { colors } from '../styles/local.style';
import AccountsHeader from '../Screens/Accounts/AccountsHeader';
import { Dimensions, View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Drawer = createDrawerNavigator();

const screenWidth = Dimensions.get('screen').width;

const DrawerNavigator = () => {
  const [mode, setMode] = useState(true);
  return (
    <Drawer.Navigator
      screenOptions={({ route }) => ({
        drawerIcon: ({ focused }) => {
          if (route.name == 'MainDrawer') {
            return <Dialog width={30} height={30} fill={focused ? colors.info : colors.white} />;
          }
          if (route.name == 'RegistrationDrawer') {
            return <User width={30} height={30} fill={focused ? colors.info : colors.white} />;
          }
          if (route.name == 'LoginDrawer') {
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
      })}
    >
      <Drawer.Screen
        name='MainDrawer'
        options={{
          title: 'Main',
          headerTitleStyle: {
            maxWidth: screenWidth,
          },
          headerTitle: () => {
            return <AccountsHeader />;
          },
          headerRightContainerStyle: {},
          headerRight: () => {
            return (
              <View style={{ width: screenWidth / 8 }}>
                <TouchableOpacity
                  onPress={() => {
                    setMode(!mode);
                    EventRegister.emit('changeTheme', mode);
                  }}
                >
                  <LightTheme width={30} height={30} fill={colors.white} />
                </TouchableOpacity>
              </View>
            );
          },
        }}
        component={TabNavigator}
      />
      <Drawer.Screen
        name='RegistrationDrawer'
        options={{ title: 'Registration', headerTitle: '' }}
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
