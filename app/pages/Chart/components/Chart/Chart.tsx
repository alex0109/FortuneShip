import React, { useContext, useEffect } from 'react';
import { View, Button, Dimensions } from 'react-native';
import { useSharedValue, withTiming } from 'react-native-reanimated';
import Svg from 'react-native-svg';

import themeContext from 'shared/lib/context/themeContext';

import { generateChartData } from '../../lib/store/data';
import ChartSlice from '../ChartSlice/ChartSlice';

import { styles } from './Chart.styles';

type ChartProps = {
  size?: number;
  strokeWidth?: number;
};

export type ChartDataItem = {
  color: string;
  percent: number;
};

export type ChartData = ChartDataItem[];

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const Chart = ({ size = SCREEN_WIDTH * 0.8, strokeWidth = SCREEN_WIDTH / 15 }: ChartProps) => {
  const progress = useSharedValue(0);
  const [data, setData] = React.useState<ChartData>([]);
  const [startAngles, setStartAngles] = React.useState<number[]>([]);
  const center = size / 2;
  const radius = (size - strokeWidth) / 3;
  const circumference = 2 * Math.PI * radius;

  const theme = useContext<{ backgroundColor?: string; color?: string }>(themeContext);

  const refresh = () => {
    const generatedData = generateChartData();

    let angle = 0;
    const angles: number[] = [];
    generatedData.forEach((item) => {
      angles.push(angle);
      angle += item.percent * 360;
    });

    setData(generatedData);
    setStartAngles(angles);

    progress.value = 0;
    progress.value = withTiming(1, {
      duration: 1000,
    });
  };

  useEffect(() => {
    refresh();
  }, []);

  return (
    <View style={[styles.main, { backgroundColor: theme.backgroundColor }]}>
      <View style={[{ width: size, height: size }, styles.rotate]}>
        <Svg viewBox={`0 0 ${size} ${size}`}>
          {data.map((item, index) => (
            <ChartSlice
              key={`${item.color}-${index}`}
              center={center}
              radius={radius}
              circumference={circumference}
              angle={startAngles[index]}
              color={item.color}
              percent={item.percent}
              strokeWidth={strokeWidth}
              progress={progress}
            />
          ))}
        </Svg>
      </View>
      <View style={styles.buttonWrap}>
        <Button title='Refresh' onPress={refresh} />
      </View>
    </View>
  );
};

export default Chart;
