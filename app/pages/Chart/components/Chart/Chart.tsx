import React, { useContext } from 'react';
import { View } from 'react-native';
import themeContext from 'shared/lib/context/themeContext';

import Category from '../Category/Category';
import ChartPie from '../ChartPie/ChartPie';

import { styles } from './Chart.styles';

import type { FC } from 'react';

const Chart: FC = () => {
  const theme = useContext<{ backgroundColor?: string; color?: string }>(themeContext);

  return (
    <View style={[styles.main, { backgroundColor: theme.backgroundColor }]}>
      <ChartPie>
        <Category />
        <Category />
        <Category />
        <Category />
      </ChartPie>
    </View>
  );
};

export default Chart;
