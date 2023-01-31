import React, { FC, useContext } from 'react';

import { View, Text, Button } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import themeContext from '../../../../shared/lib/context/themeContext';
import { styles } from './Chart.styles';
import { RootStackParamList } from '../../../../shared/lib/navigation/StackNavigator';

type MainScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'AccountsTab',
  'AnalyticsTab'
>;

type MainScreenProps = {
  navigation: MainScreenNavigationProp;
};

const Chart: FC<MainScreenProps> = ({ navigation }) => {
  const theme = useContext<{ backgroundColor?: string; color?: string }>(themeContext);
  return (
    <View style={[styles.main, { backgroundColor: theme.backgroundColor }]}>
      <Text style={[styles.mainText, { color: theme.color }]}>Main</Text>
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

export default Chart;
