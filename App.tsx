import React from 'react'
import { StyleSheet, View } from 'react-native';
import { useFonts } from 'expo-font';
// import Swiper from 'react-native-swiper';
import { NavigationContainer } from "@react-navigation/native";

import DrawerNavigator from "./navigation/DrawerNavigator";

import projectStyle from './styles/projectStyle';
import Registration from './Screens/Auth/Registration';

export default function App(){

    const [loaded] = useFonts({
        Assistant: require('./assets/fonts/Assistant-Regular.ttf') 
    });

    if (!loaded) {
        return null;
    }

    return (
      <React.Fragment>
        <NavigationContainer>
          <DrawerNavigator />
        </NavigationContainer>
      </React.Fragment>
    )
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: projectStyle.colors.blackMain,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 10
  },
  mainText: {
    color: projectStyle.colors.white
  },
  swiper: {
    flex: 1
  }
})