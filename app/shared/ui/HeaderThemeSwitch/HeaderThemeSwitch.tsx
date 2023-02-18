import React, { useState } from 'react';
import { Dimensions, TouchableOpacity, View } from 'react-native';

import { EventRegister } from 'react-native-event-listeners';

import Moon from '../../assets/images/moon.svg';
import Sun from '../../assets/images/sun.svg';

import type { FC } from 'react';

const screenWidth = Dimensions.get('screen').width;

const HeaderThemeSwitch: FC = () => {
  const [mode, setMode] = useState(true);
  return (
    <View style={{ width: screenWidth / 8 }}>
      <TouchableOpacity
        onPressOut={() => {
          setMode(!mode);
          EventRegister.emit('changeTheme', mode);
        }}>
        {mode == false ? <Sun width={30} height={30} /> : <Moon width={30} height={30} />}
      </TouchableOpacity>
    </View>
  );
};

export default HeaderThemeSwitch;
