import { getPercantageForCategory } from 'pages/Chart/lib/helpers/helpers';

import React, { useEffect, useState } from 'react';
import { View, Dimensions, Button } from 'react-native';
import { useSharedValue, withTiming } from 'react-native-reanimated';
import Svg from 'react-native-svg';

import { categories } from '../../lib/store/data';
import ChartSlice from '../ChartSlice/ChartSlice';

import { styles } from './ChartPie.styles';

import type { ICategory } from 'pages/Chart/lib/types/types';

import type { FC } from 'react';

interface ChartPieProps {
  size?: number;
  strokeWidth?: number;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const ChartPie: FC<ChartPieProps> = ({
  size = SCREEN_WIDTH * 0.8,
  strokeWidth = SCREEN_WIDTH / 15,
}) => {
  const progress = useSharedValue(0);
  const [data, setData] = useState<ICategory[]>([]);
  const [startAngles, setStartAngles] = useState<number[]>([]);
  const center = size / 2;
  const radius = (size - strokeWidth) / 3;
  const circumference = 2 * Math.PI * radius;

  const refresh = () => {
    const generatedData = getPercantageForCategory(categories);

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
    <>
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
      <View>
        <Button title='Refresh' onPress={refresh} />
      </View>
    </>
  );
};

export default ChartPie;
