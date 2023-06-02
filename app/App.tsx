import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';

import registerRootComponent from 'expo/build/launch/registerRootComponent';

import React, { useState, useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';
import { EventRegister } from 'react-native-event-listeners';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';


import i18n from 'shared/config/i18n/i18n';

import { theme } from './shared/assets/styles/local.style';
import themeContext from './shared/lib/context/themeContext';
import DrawerNavigator from './shared/lib/navigation/DrawerNavigator';
import { persistor, store } from './shared/lib/store/store';

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
    AssistantBold: require('./shared/assets/fonts/Assistant/Assistant-Bold.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <I18nextProvider i18n={i18n}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <themeContext.Provider value={mode ? theme.dark : theme.light}>
          <NavigationContainer>
            <DrawerNavigator />
          </NavigationContainer>
        </themeContext.Provider>
      </PersistGate>
    </Provider>
    </I18nextProvider>
  );
}

registerRootComponent(App);
