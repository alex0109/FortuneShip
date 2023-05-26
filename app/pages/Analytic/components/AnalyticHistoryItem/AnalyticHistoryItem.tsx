import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import type { IDateGroupItem } from 'pages/Analytic/lib/types/interface';

import type { FC } from 'react';

interface AnalyticHistoryItemProps {
  values: IDateGroupItem[];
}

const AnalyticHistoryItem: FC<AnalyticHistoryItemProps> = ({ values }) => (
  <>
    {values.map((item, index) => (
      <View key={index} style={styles.item}>
        <Text style={styles.category}>
          {item.title} - {item.value}
        </Text>
      </View>
    ))}
  </>
);

export default AnalyticHistoryItem;

const styles = StyleSheet.create({
  item: {
    marginLeft: 10,
    marginVertical: 5,
  },
  category: {
    fontSize: 16,
    fontFamily: 'Assistant',
  },
});
