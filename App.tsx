import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { EventRegister } from 'react-native-event-listeners';

import { store } from './store/store';
import themeContext from './config/themeContext';

import DrawerNavigator from './navigation/DrawerNavigator';

import { theme } from './styles/local.style';

export default function App() {
  const [mode, setMode] = useState(false);

  useEffect(() => {
    let eventListener = EventRegister.addEventListener('changeTheme', (data) => {
      setMode(data);
      console.log(data);
    });
    return () => {
      EventRegister.removeEventListener(eventListener);
    };
  });

  const [loaded] = useFonts({
    Assistant: require('./assets/fonts/Assistant-Regular.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <themeContext.Provider value={mode ? theme.dark : theme.light}>
        <NavigationContainer>
          <DrawerNavigator />
        </NavigationContainer>
      </themeContext.Provider>
    </Provider>
  );
}
