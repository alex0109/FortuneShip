import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';

import registerRootComponent from 'expo/build/launch/registerRootComponent';

import React, { useState, useEffect } from 'react';
import { EventRegister } from 'react-native-event-listeners';
import { Provider } from 'react-redux';

import { theme } from './shared/assets/styles/local.style';
import themeContext from './shared/lib/context/themeContext';
import DrawerNavigator from './shared/lib/navigation/DrawerNavigator';
import { store } from './shared/lib/store/store';

export default function App() {
  const [mode, setMode] = useState(false);

  useEffect(() => {
    const eventListener = EventRegister.addEventListener('changeTheme', (data: boolean) => {
      setMode(data);
    });
    return () => {
      EventRegister.removeEventListener(eventListener);
    };
  });

  const [loaded] = useFonts({
    Assistant: require('./shared/assets/fonts/Assistant/Assistant-Regular.ttf'),
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

registerRootComponent(App);
