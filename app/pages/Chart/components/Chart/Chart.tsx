import { Canvas, Circle, useSharedValueEffect, useValue } from '@shopify/react-native-skia';
import { moveBallInBezierCurve } from 'pages/Chart/lib/helpers/transformHelper';
import React, { useContext, useEffect, useCallback, useRef, useState } from 'react';
import { Animated, TouchableOpacity, View, Text, TextInput, Dimensions } from 'react-native';
import { Button } from 'react-native';
import { useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';
import Svg from 'react-native-svg';
import Wallet from 'shared/assets/images/wallet-wh.svg';
import themeContext from 'shared/lib/context/themeContext';

import ChartPie from '../ChartPie/ChartPie';

import { styles } from './Chart.styles';

import type { IPoint } from 'pages/Chart/lib/types/types';

import type { FC } from 'react';
import type { RootStackParamList } from 'shared/lib/navigation/StackNavigator';

interface IChartProps {
  navigation: RootStackParamList;
}

const Chart: FC = ({ navigation }) => {
  const theme = useContext<{ backgroundColor?: string; color?: string }>(themeContext);
  const [categories, setCategories] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);

  // const x = useValue(30);

  // const y = useValue(30);

  // const r = 20;

  // const points: IPoint[] = [
  //   { x: x.current, y: y.current },
  //   { x: 60, y: 70 },
  //   { x: 500, y: 110 },
  //   { x: 250, y: 300 },
  // ];

  // const progress = useSharedValue(0);

  // const moveBezierCategory = useCallback(
  //   () => ((progress.value = withTiming(1, { duration: 1900 })), -1, true),
  //   [progress]
  // );

  useEffect(() => {
    // progress.value = withRepeat(withTiming(1, { duration: 1900 }), -1, true);
    moveCategory();
  }, []); // progress

  // useSharedValueEffect(() => {
  //   moveBallInBezierCurve(points, progress, x, y);
  // }, progress);

  const ballAnimatedValue = useRef(new Animated.Value(0)).current;

  const moveCategory = () => {
    Animated.timing(ballAnimatedValue, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const positionTransform = (position: number) => {
    const xVal = ballAnimatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 0],
    });

    const yVal = ballAnimatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 0],
    });

    const result = { transform: [{ translateX: xVal }, { translateY: yVal }] };

    if (position === 0) {
      // result.transform[0].translateX = 110;
      result.transform[0].translateX = ballAnimatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 110],
      });
      // result.transform[1].translateY = 5;
      result.transform[1].translateY = ballAnimatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 5],
      });
    }
    if (position === 1) {
      result.transform[0].translateX = ballAnimatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 190],
      });
      result.transform[1].translateY = ballAnimatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 5],
      });
    }
    if (position === 2) {
      result.transform[0].translateX = ballAnimatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 260],
      });
      result.transform[1].translateY = ballAnimatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 30],
      });
    }
    if (position === 3) {
      result.transform[0].translateX = ballAnimatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 295],
      });
      result.transform[1].translateY = ballAnimatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 100],
      });
    }
    if (position === 4) {
      result.transform[0].translateX = ballAnimatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 295],
      });
      result.transform[1].translateY = ballAnimatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 185],
      });
    }
    if (position === 5) {
      result.transform[0].translateX = ballAnimatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 260],
      });
      result.transform[1].translateY = ballAnimatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 260],
      });
    }
    if (position === 6) {
      result.transform[0].translateX = ballAnimatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 190],
      });
      result.transform[1].translateY = ballAnimatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 295],
      });
    }
    if (position === 7) {
      result.transform[0].translateX = ballAnimatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 110],
      });
      result.transform[1].translateY = ballAnimatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 295],
      });
    }
    if (position === 8) {
      result.transform[0].translateX = ballAnimatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 40],
      });
      result.transform[1].translateY = ballAnimatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 260],
      });
    }
    if (position === 9) {
      result.transform[0].translateX = ballAnimatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 5],
      });
      result.transform[1].translateY = ballAnimatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 185],
      });
    }
    if (position === 10) {
      result.transform[0].translateX = ballAnimatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 5],
      });
      result.transform[1].translateY = ballAnimatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 100],
      });
    }
    if (position === 11) {
      result.transform[0].translateX = ballAnimatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 40],
      });
      result.transform[1].translateY = ballAnimatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 30],
      });
    }

    return result;
  };

  return (
    <>
      <View style={[styles.main, { backgroundColor: theme.backgroundColor }]}>
        <View style={[styles.chart]}>
          <ChartPie />
          {categories.map((item: number) => (
            <Animated.View style={[styles.categoryItem, positionTransform(item)]} key={item}>
              <View>
                <TouchableOpacity onPress={() => navigation.push('CategoryStack')}>
                  <Wallet width={35} height={35} />
                </TouchableOpacity>
              </View>
            </Animated.View>
          ))}
        </View>
      </View>
      {/* <Canvas style={{ width, height }}>
        <Circle cx={x} cy={y} r={r} color='red' />
        <Circle cx={x} cy={30} r={r} color='red' />
        <Circle cx={30} cy={y} r={r} color='red' />
      </Canvas> */}
    </>
  );
};

export default Chart;
