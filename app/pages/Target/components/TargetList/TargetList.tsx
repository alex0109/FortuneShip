/* eslint-disable no-unused-vars */

import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, Pressable } from 'react-native';

import i18n from 'shared/config/i18n/i18n';
import themeContext from 'shared/lib/context/themeContext';

import { useActions } from 'shared/lib/hooks/useActions';

import { useTypedSelector } from 'shared/lib/hooks/useTypedSelector';

import Title from 'shared/ui/Title/Title';

import TargetBar from '../TargetBar/TargetBar';

import { styles } from './TargetList.styles';

import type { ITarget } from 'pages/Target/lib/types/interfaces';
import type { FC } from 'react';

interface TargetListProps {
  handleModalOpen: (index: string) => void;
}

const TargetList: FC<TargetListProps> = ({ handleModalOpen }) => {
  const { handleAddTarget } = useActions();
  const { target } = useTypedSelector((state) => state);
  const theme = useContext<{ backgroundColor?: string; color?: string }>(themeContext);

  return (
    <>
      <Title>{i18n.t('Targets')}</Title>
      {target.length == 0 ? (
        <View style={styles.accountsNoFundMessage}>
          <Text style={[styles.h2Text, { color: theme.color }]}>
            {i18n.t('At the moment you have no targets...')}
          </Text>
          <Pressable onPress={() => handleAddTarget({ title: i18n.t('New target'), target: 0 })}>
            <Ionicons name='add-outline' size={35} color={theme.color} />
          </Pressable>
        </View>
      ) : (
        <View style={styles.accountsScroll}>
          <View style={styles.accountsContent}>
            {target.map((item: ITarget) => (
              <TouchableOpacity
                key={item.index}
                onPress={() => {
                  handleModalOpen(item.index);
                }}>
                <TargetBar key={item.index} {...item} />
              </TouchableOpacity>
            ))}
            {target.length < 5 ? (
              <Pressable onPress={() => handleAddTarget({ title: i18n.t('New target'), target: 0 })}>
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

export default TargetList;
