import React, { useContext } from 'react';
import { View, Text, StatusBar } from 'react-native';

import themeContext from 'shared/lib/context/themeContext';

import { colors } from '../../assets/styles/local.style';
import { useTypedSelector } from '../../lib/hooks/useTypedSelector';

import { styles } from './AppHeaderTitle.styles';

import type { FC } from 'react';

const AppHeaderTitle: FC = () => {
  const { cash } = useTypedSelector((state) => state);
  const theme = useContext<{ backgroundColor?: string; color?: string }>(themeContext);

  return (
    <View style={[styles.headerContainer]}>
      <StatusBar />
      <Text
        style={{
          color: theme.backgroundColor == colors.blackMain ? colors.white : colors.blackMain,
        }}>
        All - {cash.reduce((pre: any, c: any) => pre + c.count, 0)}$
      </Text>
    </View>
  );
};

export default AppHeaderTitle;
