import { Canvas, Path, Skia, Text } from '@shopify/react-native-skia';
import React, { useContext } from 'react';

import { StyleSheet, View } from 'react-native';

import themeContext from 'shared/lib/context/themeContext';

import type { SkFont, SkiaMutableValue } from '@shopify/react-native-skia';

import type { FC } from 'react';

interface CircularProgressProps {
  strokeWidth: number;
  radius: number;
  backgroundColor: string;
  percentageComplete: SkiaMutableValue<number>;
  font: SkFont;
  targetPercentage: number;
}

const TargetDonut: FC<CircularProgressProps> = ({
  strokeWidth,
  radius,
  percentageComplete,
  font,
  targetPercentage,
}) => {
  const theme = useContext<{ backgroundColor?: string; color?: string }>(themeContext);

  const innerRadius = radius - strokeWidth / 2;
  const targetText = `${Math.trunc(targetPercentage * 10000) / 100}%`;

  const path = Skia.Path.Make();
  path.addCircle(radius, radius, innerRadius);

  const width = font.getTextWidth(targetText);

  return (
    <View style={styles.container}>
      <Canvas style={styles.container}>
        <Path
          path={path}
          color='green'
          style='stroke'
          strokeJoin='round'
          strokeWidth={strokeWidth}
          strokeCap='round'
          start={0}
          end={percentageComplete}
        />
        <Path
          path={path}
          color='green'
          style='stroke'
          strokeJoin='round'
          strokeWidth={strokeWidth}
          strokeCap='round'
          opacity={0.2}
        />
        <Text
          x={innerRadius - width / 2}
          y={radius + strokeWidth}
          text={targetText}
          font={font}
          opacity={0.4}
          color={theme.color}
        />
      </Canvas>
    </View>
  );
};

export default TargetDonut;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
  },
});
