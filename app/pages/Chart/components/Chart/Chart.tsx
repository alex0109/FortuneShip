import { getCoordinatesForIndex } from 'pages/Chart/lib/helpers/helpers';
// import { useCategoriesState } from 'pages/Chart/lib/store/categories';
import { categories } from 'pages/Chart/lib/store/data';
// import { colorsArray, iconsArray } from 'pages/Chart/lib/store/propertires';
import React, { useContext, useEffect, useRef } from 'react';
import { Animated, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import themeContext from 'shared/lib/context/themeContext';

import ChartPie from '../ChartPie/ChartPie';

import { styles } from './Chart.styles';

import type { FC } from 'react';

const Chart: FC = ({ navigation }) => {
  const theme = useContext<{ backgroundColor?: string; color?: string }>(themeContext);

  const animatedValues = useRef(categories.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    const animations = categories.map((_, index) =>
      Animated.timing(animatedValues[index], {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      })
    );

    Animated.sequence(animations).start();
  }, []);

  return (
    <>
      <View style={[styles.main, { backgroundColor: theme.backgroundColor }]}>
        <View style={[styles.chart]}>
          <ChartPie />
          <View style={[styles.categorieCircle]}>
            {categories.map((item, index) => {
              const { x, y } = getCoordinatesForIndex(-index + 1, categories.length);
              const opacity = animatedValues[index].interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
              });

              return (
                <Animated.View
                  key={index}
                  style={[
                    styles.categoryItem,
                    { left: x, top: y, opacity, backgroundColor: item.color },
                  ]}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.push('CategoryStack', {
                        index: item.index,
                        title: item.title,
                        count: item.count,
                        color: item.color,
                      })
                    }>
                    <Ionicons name={item.icon} size={35} color={'white'} />
                  </TouchableOpacity>
                </Animated.View>
              );
            })}
          </View>
        </View>
      </View>
    </>
  );
};

export default Chart;
