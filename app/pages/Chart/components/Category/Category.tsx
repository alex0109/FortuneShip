import React from 'react';
import { Text, View } from 'react-native';

import { styles } from './Category.styles';

import type { FC } from 'react';

const Category: FC = () => (
  <View style={[styles.container]}>
    <Text>Hello world!</Text>
  </View>
);

export default Category;
