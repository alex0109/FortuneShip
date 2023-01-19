import React, { FC } from 'react';

import { StyleSheet, View, Text, Button } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import customStyles from '../../styles/local.styles';
import { RootStackParamList } from '../../navigation/StackNavigator';

type MainScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'AccountsTab',
  'AnalyticsTab'
>;

type MainScreenProps = {
  navigation: MainScreenNavigationProp;
};

const Main: FC<MainScreenProps> = ({ navigation }) => {
  return (
    <View style={styles.main}>
      <Text style={styles.mainText}>Main</Text>
      <Button
        onPress={() => navigation.navigate('AccountsTab', { name: 'AccountsTab' })}
        title='Go to Accounts Screen.'
      />
      <Button
        onPress={() => navigation.navigate('AnalyticsTab', { name: 'AnalyticsTab' })}
        title='Go to Analytics Screen.'
      />
    </View>
  );
};

export default Main;

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
