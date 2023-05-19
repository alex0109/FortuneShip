import Ionicons from '@expo/vector-icons/Ionicons';
import { colorsArray, iconsArray } from 'pages/Chart/lib/store/propertires';

import React, { useContext, useEffect } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

import themeContext from 'shared/lib/context/themeContext';

import { useActions } from 'shared/lib/hooks/useActions';

import { useTypedSelector } from 'shared/lib/hooks/useTypedSelector';

import { styles } from './Category.styles';

import type { ICategory } from 'pages/Chart/lib/types/types';
import type { FC } from 'react';

interface CategoryProps {
  categoryID: string;
}

const Category: FC<CategoryProps> = ({ categoryID }) => {
  const theme = useContext<{ backgroundColor?: string; color?: string }>(themeContext);
  const { handleChangeCountCategory, handleChangeCategoryTitle } = useActions();
  const { categories } = useTypedSelector((state) => state);

  const findModalPropByID = (index: string): ICategory => {
    const item: ICategory | undefined = categories.find((item: ICategory) => item.index === index);

    if (item == undefined) {
      return {
        index: '0',
        title: 'Tests',
        count: 0,
        icon: 'flask',
        color: '#fff',
        percent: 0,
        history: [],
      };
    }

    return { ...item };
  };

  const category = findModalPropByID(categoryID);

  return (
    <ScrollView style={[styles.container, { backgroundColor: category?.color, flex: 1 }]}>
      <View style={[styles.header, { backgroundColor: category?.color }]}>
        <TextInput
          style={[styles.title, { color: theme.backgroundColor }]}
          defaultValue={category?.title}
          onChangeText={(enteredText) => {
            handleChangeCategoryTitle({ index: category?.index, title: enteredText });
          }}
          placeholder='Your title...'
          placeholderTextColor={theme.backgroundColor}
        />
        <TextInput
          style={[styles.title, { color: theme.backgroundColor }]}
          defaultValue={category?.count.toString()}
          onChangeText={(enteredText) => {
            handleChangeCountCategory({ index: category?.index, count: +enteredText });
          }}
          keyboardType='numeric'
          placeholder='Your count...'
          placeholderTextColor={theme.backgroundColor}
        />
      </View>
      <View style={[styles.content, { backgroundColor: theme.backgroundColor }]}>
        <View style={[styles.belt]}>
          <TouchableOpacity>
            <Ionicons name='trash-outline' size={35} color={theme.color} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name='file-tray-full-outline' size={35} color={theme.color} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name='add-outline' size={35} color={theme.color} />
          </TouchableOpacity>
        </View>
        <View style={[styles.edit]}>
          <Text style={[styles.title, { color: theme.color }]}>Icons</Text>
          <View style={[styles.materialContainer]}>
            {iconsArray.map((name) => (
              <TouchableOpacity key={Math.random()} style={[styles.iconItem]}>
                <Ionicons name={name} size={50} color={theme.color} />
              </TouchableOpacity>
            ))}
          </View>
          <Text style={[styles.title, { color: theme.color }]}>Colors</Text>
          <View style={[styles.materialContainer]}>
            {colorsArray.map((color) => (
              <TouchableOpacity
                key={Math.random()}
                style={[styles.iconItem, { backgroundColor: color, borderRadius: 50 }]}
              />
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Category;
