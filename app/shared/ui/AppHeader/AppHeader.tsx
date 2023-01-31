import { View, Text, StatusBar, StyleSheet, Dimensions } from 'react-native';
import React, { FC } from 'react';
import { useTypedSelector } from '../../lib/hooks/useTypedSelector';

import { colors } from '../../assets/styles/local.style';

import { styles } from './AppHeader.styles';

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
