import React, { FC, useContext } from 'react';

import { View, Text } from 'react-native';

import { styles } from './analytics.style';
import themeContext from '../../config/themeContext';

const Analytics: FC = () => {
  const theme = useContext<{ backgroundColor?: string; color?: string }>(themeContext);

  return (
    <View style={[styles.main, { backgroundColor: theme.backgroundColor }]}>
      <Text style={[{ color: theme.color }]}>Analytics 3</Text>
    </View>
  );
};

export default Analytics;
