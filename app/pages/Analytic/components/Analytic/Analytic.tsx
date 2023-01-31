import React, { FC, useContext } from 'react';

import { View, Text } from 'react-native';

import { styles } from './Analytic.styles';
import themeContext from '../../../../shared/lib/context/themeContext';

const Analytics: FC = () => {
  const theme = useContext<{ backgroundColor?: string; color?: string }>(themeContext);

  return (
    <View style={[styles.main, { backgroundColor: theme.backgroundColor }]}>
      <Text style={[{ color: theme.color }]}>Analytics 3</Text>
    </View>
  );
};

export default Analytics;
