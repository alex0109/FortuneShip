import BottomSheet from 'app/modules/BottomSheet/BottomSheet';
import { getCoordinatesForIndex } from 'pages/Chart/lib/helpers/helpers';
import { mockCat } from 'pages/Chart/lib/store/data';

import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { Dimensions, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import themeContext from 'shared/lib/context/themeContext';

import { useActions } from 'shared/lib/hooks/useActions';
import { useTypedSelector } from 'shared/lib/hooks/useTypedSelector';

import Category from '../Category/Category';
import ChartPie from '../ChartPie/ChartPie';

import { styles } from './Chart.styles';

import type { BottomSheetRefProps } from 'app/modules/BottomSheet/BottomSheet';
import type { ICategory } from 'pages/Chart/lib/types/types';
import type { FC } from 'react';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const Chart: FC = () => {
  const theme = useContext<{ backgroundColor?: string; color?: string }>(themeContext);

  const { handleAddCategory } = useActions();
  const { categories } = useTypedSelector((state) => state);
  const bottomSheetRef = useRef<BottomSheetRefProps>(null);
  const [category, setCategory] = useState<ICategory>(mockCat);
  // const scrollTo = bottomSheetRef?.current?.scrollTo;

  const handleBtmShtOpen = useCallback((index: string) => {
    const categoryToBottomSheet: ICategory = categories.find((item) => item.index === index)!;

    setCategory(categoryToBottomSheet);
    const isActive = bottomSheetRef?.current?.isActive();
    if (isActive) {
      bottomSheetRef?.current?.scrollTo(0);
    } else {
      bottomSheetRef?.current?.scrollTo(-SCREEN_HEIGHT / 1.8);
    }
  }, []);

  const handleAddButtonClick = () => {
    handleAddCategory(mockCat);
  };

  return (
    <>
      <View style={[styles.main, { backgroundColor: theme.backgroundColor }]}>
        <View style={[styles.chart]}>
          <ChartPie />
          <View style={[styles.categoriesCircle]}>
            {categories.map((item, index) => {
              const { x, y } = getCoordinatesForIndex(-index + 1, categories.length);

              return (
                <View
                  key={index}
                  style={[styles.categoryItem, { left: x, top: y, backgroundColor: item.color }]}>
                  <TouchableOpacity onPress={() => handleBtmShtOpen(item.index)}>
                    <Ionicons name={item.icon} size={35} color={'white'} />
                  </TouchableOpacity>
                </View>
              );
            })}
            <TouchableOpacity onPress={handleAddButtonClick}>
              <View style={[styles.addItemCircle, { borderColor: theme.color }]}>
                <Ionicons name={'add-outline'} size={35} color={theme.color} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <BottomSheet ref={bottomSheetRef}>
          <Category category={category} />
        </BottomSheet>
      </View>
    </>
  );
};

export default Chart;
