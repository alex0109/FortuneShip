import { Canvas, Circle, Group } from '@shopify/react-native-skia';
import React, { useContext } from 'react';

import { View, Text } from 'react-native';

import themeContext from 'shared/lib/context/themeContext';

import { styles } from './Analytic.styles';

import type { FC } from 'react';

const Analytics: FC = () => {
  const size = 256;
  const r = size * 0.33;
  return (
    <Canvas style={{ flex: 1 }}>
      <Group blendMode='multiply'>
        <Circle cx={r} cy={r} r={r} color='cyan' />
        <Circle cx={size - r} cy={r} r={r} color='magenta' />
        <Circle cx={size / 2} cy={size - r} r={r} color='yellow' />
      </Group>
    </Canvas>
  );
};

export default Analytics;
