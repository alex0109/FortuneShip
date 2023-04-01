import React, { useContext } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

import themeContext from 'shared/lib/context/themeContext';

import { styles } from './Category.styles';

import type { FC } from 'react';

const Category: FC = () => {
  const theme = useContext<{ backgroundColor?: string; color?: string }>(themeContext);

  return (
    <ScrollView style={[styles.container]}>
      <View style={[styles.header]}>
        <Text style={[styles.title, { color: theme.backgroundColor }]}>Category</Text>
        <Text style={[styles.title, { color: theme.backgroundColor }]}>589$</Text>
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
          <Text style={[styles.title, { color: theme.color }]}>Category</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default Category;
