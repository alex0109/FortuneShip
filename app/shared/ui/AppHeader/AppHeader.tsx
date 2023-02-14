import React from 'react';
import { View, Text, StatusBar } from 'react-native';

import { colors } from '../../assets/styles/local.style';
import { useTypedSelector } from '../../lib/hooks/useTypedSelector';

import { styles } from './AppHeader.styles';

import type { FC } from 'react';

const AppHeader: FC = () => {
  const { cash } = useTypedSelector((state) => state);

  return (
    <View style={[styles.headerContainer]}>
      <StatusBar />
      <Text style={{ color: colors.white }}>
        All - {cash.reduce((pre: any, c: any) => pre + c.count, 0)}$
      </Text>
    </View>
  );
};

export default AppHeader;
