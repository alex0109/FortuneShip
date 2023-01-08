import React from 'react';
import { StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';

import { store } from './store/store';

import DrawerNavigator from './navigation/DrawerNavigator';

import customStyles from './styles/local.styles';

export default function App() {
  const [loaded] = useFonts({
    Assistant: require('./assets/fonts/Assistant-Regular.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <DrawerNavigator />
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: customStyles.colors.blackMain,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 10,
  },
  mainText: {
    color: customStyles.colors.white,
  },
  swiper: {
    flex: 1,
  },
});
