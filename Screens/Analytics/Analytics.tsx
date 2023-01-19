import React from 'react';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, Alert } from 'react-native';

import customStyles from '../../styles/local.styles';

export default function Analytics() {
  return (
    <View style={styles.main}>
      <Text style={styles.mainText}>Analytics 3</Text>
    </View>
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
    fontFamily: 'Assistant',
  },
  testText: {
    color: customStyles.colors.white,
    fontFamily: 'Assistant',
    fontWeight: '900',
  },
});
