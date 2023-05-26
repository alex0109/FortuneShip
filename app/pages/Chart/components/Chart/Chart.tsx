import Ionicons from '@expo/vector-icons/Ionicons';
import BottomSheet from 'app/modules/BottomSheet/BottomSheet';
import { getCoordinatesForIndex } from 'pages/Chart/lib/helpers/helpers';
import { mockCat } from 'pages/Chart/lib/store/data';

import React, { useCallback, useContext, useRef, useState } from 'react';
import { Dimensions, TouchableOpacity, View, Text } from 'react-native';
import themeContext from 'shared/lib/context/themeContext';

import { useActions } from 'shared/lib/hooks/useActions';
import { useTypedSelector } from 'shared/lib/hooks/useTypedSelector';

import Category from '../Category/Category';
import ChartPie from '../ChartPie/ChartPie';

import { styles } from './Chart.styles';

import type { BottomSheetRefProps } from 'app/modules/BottomSheet/BottomSheet';
import type { FC } from 'react';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const Chart: FC = () => {
  const theme = useContext<{ backgroundColor?: string; color?: string }>(themeContext);

  const { handleAddCategory } = useActions();
  const { categories } = useTypedSelector((state) => state);
  const bottomSheetRef = useRef<BottomSheetRefProps>(null);
  const [categoryID, setCategoryID] = useState<string>(mockCat.index);
  const scrollTo = bottomSheetRef?.current?.scrollTo;

  const handleBtmShtOpen = useCallback((index: string) => {
    setCategoryID(index);

    const isActive = bottomSheetRef?.current?.isActive();
    if (isActive) {
      bottomSheetRef?.current?.scrollTo(0);
    } else {
      bottomSheetRef?.current?.scrollTo(-SCREEN_HEIGHT / 1.8);
    }
  }, []);

  return (
    <>
      <View style={[styles.main, { backgroundColor: theme.backgroundColor }]}>
        <View style={[styles.chart]}>
          <ChartPie />
          <View style={[styles.categoriesCircle]}>
            {categories.map((item, index) => {
              const { x, y } = getCoordinatesForIndex(-index + 1, categories.length);

              return item ? (
                <View
                  key={item.index}
                  style={[styles.categoryItem, { left: x, top: y, backgroundColor: item.color }]}>
                  <TouchableOpacity onPress={() => handleBtmShtOpen(item.index)}>
                    <Ionicons name={item.icon} size={35} color={'white'} />
                  </TouchableOpacity>
                  <View
                    style={{
                      position: 'absolute',
                      top: 45,
                      width: '100%',
                      justifyContent: 'flex-end',
                    }}>
                    <Text style={{ textAlign: 'center', fontWeight: 'bold', color: theme.color }}>
                      {item.count}
                    </Text>
                  </View>
                </View>
              ) : (
                <></>
              );
            })}
            {categories.length >= 12 ? (
              <></>
            ) : (
              <TouchableOpacity onPress={() => handleAddCategory()}>
                <View style={[styles.addItemCircle, { borderColor: theme.color }]}>
                  <Ionicons name={'add-outline'} size={35} color={theme.color} />
                </View>
              </TouchableOpacity>
            )}
          </View>
        </View>
        <BottomSheet scrollLimit={100} ref={bottomSheetRef}>
          <Category categoryID={categoryID} scrollTo={scrollTo!} />
        </BottomSheet>
      </View>
    </>
  );
};

export default Chart;
