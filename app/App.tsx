import React, { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { EventRegister } from 'react-native-event-listeners';

import { store } from './shared/lib/store/store';
import themeContext from './shared/lib/context/themeContext';

import DrawerNavigator from './shared/lib/navigation/DrawerNavigator';

import { theme } from './shared/assets/styles/local.style';

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
    Assistant: require('./shared/assets/fonts/Assistant-Regular.ttf'),
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
