import { getHistory } from 'pages/Analytic/lib/helpers/helpers';
import React, { useContext } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import themeContext from 'shared/lib/context/themeContext';

import { useTypedSelector } from 'shared/lib/hooks/useTypedSelector';

import AnalyticGraph from '../AnalyticGraph/AnalyticGraph';
import AnalyticHistoryList from '../AnalyticHistoryList/AnalyticHistoryList';

const Analytic = () => {
  const theme = useContext<{ backgroundColor?: string; color?: string }>(themeContext);
  const { categories } = useTypedSelector((state) => state);

  const history = getHistory(categories);

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      {history.length == 0 ? (
        <Text style={{ textAlign: 'center', marginTop: 15, fontSize: 22 }}>No data</Text>
      ) : (
        <AnalyticGraph history={history} />
      )}
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
