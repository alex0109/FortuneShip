import React, { FC, useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ICash } from '../../../store/types';

import themeContext from '../../../config/themeContext';
import { styles } from './bars.style';

const CashBar: FC<ICash> = (cash) => {
  const theme = useContext<{ backgroundColor?: string; color?: string }>(themeContext);

  return (
    <View style={[styles.contentContainer, { borderBottomColor: theme.color }]}>
      <View style={styles.contentItem}>
        <View>
          <Text style={[{ color: theme.color, paddingLeft: 10 }]}>
            {!cash.title ? 'Head title' : cash.title}
          </Text>
          <Text style={[styles.subTitle]}>${cash.count}</Text>
        </View>
      </View>
    </View>
  );
};

export default CashBar;
