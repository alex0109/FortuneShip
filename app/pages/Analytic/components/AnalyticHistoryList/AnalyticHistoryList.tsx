import moment from 'moment';
import { getHistory, groupByDate } from 'pages/Analytic/lib/helpers/helpers';
import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { useTypedSelector } from 'shared/lib/hooks/useTypedSelector';

import Title from 'shared/ui/Title/Title';

import AnalyticHistoryItem from '../AnalyticHistoryItem/AnalyticHistoryItem';

const AnalyticHistoryList = () => {
  const { categories } = useTypedSelector((state) => state);
  const history = groupByDate(getHistory(categories));

  return (
    <View style={[styles.container]}>
      <Title>History</Title>
      <ScrollView style={styles.historiesContainer}>
        {history.length == 0 ? (
          <Text style={styles.historyTitle}>I'm feeling alone here :(</Text>
        ) : (
          history.map((item, index) => (
            <View key={index}>
              <Text style={styles.historyTitle}>
                {moment(item.date).format('ddd - MMM DD YYYY')}
              </Text>
              <AnalyticHistoryItem values={item.values} />
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
};

export default AnalyticHistoryList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
  },
  historiesContainer: {
    marginHorizontal: 35,
  },
  historyTitle: {
    fontSize: 22,
    fontFamily: 'AssistantBold',
  },
});
