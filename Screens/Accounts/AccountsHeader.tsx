import { View, Text, StatusBar, StyleSheet, Dimensions } from 'react-native';
import React, { FC } from 'react';
import { useTypedSelector } from '../../hooks/useTypedSelector';

import customStyles from '../../styles/local.styles.js';

const windowWidth = Dimensions.get('window').width;

const AccountsHeader: FC = () => {
  const { cash } = useTypedSelector((state) => state);

  return (
    <View style={[styles.headerContainer]}>
      <StatusBar />
      <Text style={{ color: customStyles.colors.white }}>
        All - {cash.reduce((pre, c) => pre + c.count, 0)}$
      </Text>
    </View>
  );
};

export default AccountsHeader;

const styles = StyleSheet.create({
  headerContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: windowWidth - windowWidth / 2.5,
    height: '100%',
  },
});
