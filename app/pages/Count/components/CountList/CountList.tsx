/* eslint-disable no-unused-vars */
import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, Pressable } from 'react-native';

import themeContext from 'shared/lib/context/themeContext';

import { useActions } from 'shared/lib/hooks/useActions';

import { useTypedSelector } from 'shared/lib/hooks/useTypedSelector';

import Title from 'shared/ui/Title/Title';

import CountBar from '../CountBar/CountBar';

import { styles } from './CountList.styles';

import type { ICount } from '../../lib/types/interfaces';
import type { FC } from 'react';

interface CountListProps {
  handleModalOpen: (index: string) => void;
}

const CountList: FC<CountListProps> = ({ handleModalOpen }) => {
  const { handleAddCount } = useActions();
  const { count } = useTypedSelector((state) => state);
  const theme = useContext<{ backgroundColor?: string; color?: string }>(themeContext);

  return (
    <>
      <Title>Counts</Title>

      {count.length == 0 ? (
        <View style={styles.accountsNoFundMessage}>
          <Text style={[styles.h2Text, { color: theme.color }]}>
            At the moment you have no funds...
          </Text>
          <Pressable onPress={() => handleAddCount({ title: 'New count' })}>
            <Ionicons name='add-outline' size={35} color={theme.color} />
          </Pressable>
        </View>
      ) : (
        <View style={styles.accountsScroll}>
          <View style={styles.accountsContent}>
            {count.map((item: ICount) => (
              <TouchableOpacity
                key={item.index}
                onPress={() => {
                  handleModalOpen(item.index);
                }}>
                <CountBar key={item.index} {...item} />
              </TouchableOpacity>
            ))}
            {count.length < 5 ? (
              <Pressable onPress={() => handleAddCount({ title: 'New count' })}>
                <Ionicons name='add-outline' size={35} color={theme.color} />
              </Pressable>
            ) : (
              <></>
            )}
          </View>
        </View>
      )}
    </>
  );
};

export default CountList;
