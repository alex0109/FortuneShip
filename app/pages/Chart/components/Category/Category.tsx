import React from 'react';
import { View } from 'react-native';

import Wallet from 'shared/assets/images/wallet-wh.svg';

import { styles } from './Category.styles';

const Category = () => (
  <View style={[styles.container]}>
    <Wallet width={30} height={30} />
  </View>
);

export default Category;
