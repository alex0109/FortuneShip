import { Canvas, Circle, useSharedValueEffect, useValue } from '@shopify/react-native-skia';
import { moveBallInBezierCurve, positionTransform } from 'pages/Chart/lib/helpers/transformHelper';
import React, { useContext, useEffect, useCallback, useRef, useState } from 'react';
import { Animated, TouchableOpacity, View, Text, TextInput, Dimensions } from 'react-native';
import { Button } from 'react-native';
import { useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';
import Wallet from 'shared/assets/images/wallet-wh.svg';
import themeContext from 'shared/lib/context/themeContext';

import ChartPie from '../ChartPie/ChartPie';

import { styles } from './Chart.styles';

import type { IPoint } from 'pages/Chart/lib/types/types';

import type { FC } from 'react';
import Svg from 'react-native-svg';

const { width, height } = Dimensions.get('window');

const Chart: FC = () => {
  const theme = useContext<{ backgroundColor?: string; color?: string }>(themeContext);
  const [categories, setCategories] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);

  const x = useValue(30);

  const y = useValue(30);

  const r = 20;

  const points: IPoint[] = [
    { x: x.current, y: y.current },
    { x: 60, y: 70 },
    { x: 500, y: 110 },
    { x: 250, y: 300 },
  ];

  const progress = useSharedValue(0);

  // const move = useCallback(
  //   () => ((progress.value = withTiming(1, { duration: 1900 })), -1, true),
  //   [progress]
  // );

  useEffect(() => {
    progress.value = withRepeat(withTiming(1, { duration: 1900 }), -1, true);
  }, [progress]);

  useSharedValueEffect(() => {
    moveBallInBezierCurve(points, progress, x, y);
  }, progress);

  return (
    <>
      {/* <View style={{ flex: 10, position: 'absolute' }}>
        <Canvas style={{ flex: 1 }}>
          <Circle cx={x} cy={y} r={r} color='red' />
        </Canvas>
      </View>
      <View style={[styles.main, { backgroundColor: theme.backgroundColor, position: 'absolute' }]}>
        <View style={[styles.chart, { flex: 10 }]}>
          <ChartPie />
          {categories.map((item) => (
            <Animated.View style={[styles.container]} key={item}>
              <Wallet width={35} height={35} />
            </Animated.View>
          ))}
        </View>
      </View> */}
      {/* <Canvas style={{ width, height }}>
        <Circle cx={x} cy={y} r={r} color='red' />
        <Circle cx={x} cy={30} r={r} color='red' />
        <Circle cx={30} cy={y} r={r} color='red' />
      </Canvas> */}
    </>
  );
};

export default Chart;
