import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';

import themeContext from 'shared/lib/context/themeContext';

import AnalyticGraph from '../AnalyticGraph/AnalyticGraph';
import AnalyticHistoryList from '../AnalyticHistoryList/AnalyticHistoryList';

const Analytic = () => {
  const theme = useContext<{ backgroundColor?: string; color?: string }>(themeContext);

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <AnalyticGraph />
      <AnalyticHistoryList />
    </View>
  );
};

export default Analytic;

const styles = StyleSheet.create({
  container: {
    flex: 10,
    flexDirection: 'column',
  },
});
