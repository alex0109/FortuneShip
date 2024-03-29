import React from 'react';
import Animated, { interpolate, useAnimatedProps } from 'react-native-reanimated';
import { Circle } from 'react-native-svg';

import type { FC } from 'react';

interface ChartSliceProps {
  center: number;
  radius: number;
  strokeWidth: number;
  color: string;
  circumference: number;
  angle: number;
  percent: number;
  progress: Animated.SharedValue<number>;
}

export type PieChartDataItem = {
  color: string;
  percent: number;
};

export type PieChartData = PieChartDataItem[];

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const ChartSlice: FC<ChartSliceProps> = ({
  center,
  radius,
  strokeWidth,
  circumference,
  color,
  angle,
  percent,
  progress,
}) => {
  const animatedProps = useAnimatedProps(() => {
    const strokeDashoffset = interpolate(
      progress.value,
      [0, 1],
      [circumference, circumference * (1 - percent)]
    );
    const rotateAngle = interpolate(progress.value, [0, 1], [0, angle]);

    return {
      strokeDashoffset,
      transform: [
        { translateX: center },
        { translateY: center },
        { rotate: `${rotateAngle}deg` },
        { translateX: -center },
        { translateY: -center },
      ],
    };
  });

  return (
    <AnimatedCircle
      cx={center}
      cy={center}
      r={radius}
      strokeWidth={strokeWidth}
      stroke={color}
      strokeDasharray={circumference}
      originX={center}
      originY={center}
      animatedProps={animatedProps}
    />
  );
};

export default ChartSlice;
