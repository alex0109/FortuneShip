import { createDrawerNavigator } from '@react-navigation/drawer';
import React, { useContext } from 'react';


import { Dimensions, View, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

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

import CustomDrawerContent from './CustomDrawerItem/CustomDrawerItem';
import { SignInStackNavigator, SignUpStackNavigator } from './StackNavigator';

import TabNavigator from './TabNavigator';

const Drawer = createDrawerNavigator();

const screenWidth = Dimensions.get('screen').width;

const DrawerNavigator = () => {
  const theme = useContext<{ backgroundColor?: string; color?: string }>(themeContext);
  return (
    <>
      {/* // <Drawer.Navigator
    //   screenOptions={({ route }) => ({
    //     drawerIcon: () => {
    //       if (theme.backgroundColor == colors.blackMain) {
    //         if (route.name == 'ChartDrawer') {
    //           return <User width={30} height={30} />;
    //         }
    //         if (route.name == 'SignUpDrawer') {
    //           return <Logout width={30} height={30} />;
    //         }
    //         if (route.name == 'SignInDrawer') {
    //           return <Login width={30} height={30} />;
    //         }
    //       } else {
    //         if (route.name == 'ChartDrawer') {
    //           return <UserBl width={30} height={30} />;
    //         }
    //         if (route.name == 'SignUpDrawer') {
    //           return <LogoutBL width={30} height={30} />;
    //         }
    //         if (route.name == 'SignInDrawer') {
    //           return <LoginBl width={30} height={30} />;
    //         }
    //       }
    //     },
    //     drawerStyle: {},
    //     drawerLabelStyle: {
    //       color: theme.backgroundColor == colors.blackMain ? colors.white : colors.blackMain,
    //     },
    //     drawerContentStyle: {
    //       backgroundColor:
    //         theme.backgroundColor == colors.blackMain ? colors.blackBar : colors.gray,
    //     },
    //     headerStyle: {
    //       backgroundColor:
    //         theme.backgroundColor == colors.blackMain ? colors.blackBar : colors.gray,
    //       elevation: 0,
    //       shadowOpacity: 0,
    //     },
    //     headerTintColor:
    //       theme.backgroundColor == colors.blackMain ? colors.white : colors.blackMain,
    //     swipeEdgeWidth: 50,
    //   })}>
    //   <Drawer.Screen
    //     name='ChartDrawer'
    //     options={{
    //       title: 'Account',
    //       headerTitleStyle: {
    //         maxWidth: screenWidth,
    //       },
    //       headerTitle: () => <AppHeaderTitle />,
    //       headerRight: () => <HeaderThemeSwitch />,
    //     }}
    //     component={TabNavigator}
    //   />
    //   <Drawer.Screen
    //     name='SignUpDrawer'
    //     options={{ title: 'Logout', headerTitle: 'SIGN UP' }}
    //     component={SignUpStackNavigator}
    //   />
    //   <Drawer.Screen
    //     name='SignInDrawer'
    //     options={{ title: 'Login', headerTitle: 'SIGN IN' }}
    //     component={SignInStackNavigator}
    //   />
    //   <Drawer.Group>
    //     <Drawer.Screen
    //       name='Button'
    //       component={() => (
    //         <View>
    //           <Text>Hello</Text>
    //         </View>
    //       )}
    //     />
    //   </Drawer.Group>
    // </Drawer.Navigator> */}
      <Drawer.Navigator
        drawerContent={CustomDrawerContent}
        screenOptions={{
          headerShown: false,
          drawerActiveBackgroundColor: '#aa18ea',
          drawerActiveTintColor: '#fff',
          drawerInactiveTintColor: '#333',
          drawerLabelStyle: {
            marginLeft: -25,
            fontFamily: 'Roboto-Medium',
            fontSize: 15,
          },
        }}>
        {/* <Drawer.Screen
          name='SignUpDrawer'
          options={{ title: 'Sign up', headerTitle: '' }}
          component={SignUpStackNavigator}
        />
        <Drawer.Screen
          name='SignInDrawer'
          options={{ title: 'Sign in', headerTitle: '' }}
          component={SignInStackNavigator}
        /> */}
        <Drawer.Screen
          name='Home'
          component={TabNavigator}
          options={{
            drawerIcon: ({ color }) => <Ionicons name='home-outline' size={22} color={color} />,
          }}
        />
        <Drawer.Screen
          name='Profile'
          component={TabNavigator}
          options={{
            drawerIcon: ({ color }) => <Ionicons name='person-outline' size={22} color={color} />,
          }}
        />
        <Drawer.Screen
          name='Messages'
          component={TabNavigator}
          options={{
            drawerIcon: ({ color }) => (
              <Ionicons name='chatbox-ellipses-outline' size={22} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name='Moments'
          component={TabNavigator}
          options={{
            drawerIcon: ({ color }) => <Ionicons name='timer-outline' size={22} color={color} />,
          }}
        />
        <Drawer.Screen
          name='Settings'
          component={TabNavigator}
          options={{
            drawerIcon: ({ color }) => <Ionicons name='settings-outline' size={22} color={color} />,
          }}
        />
      </Drawer.Navigator>
    </>
  );
};

export default DrawerNavigator;
