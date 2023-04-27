/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, Pressable } from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

import themeContext from 'shared/lib/context/themeContext';

import { useActions } from 'shared/lib/hooks/useActions';

import { useTypedSelector } from 'shared/lib/hooks/useTypedSelector';

import AccountCashBar from '../AccountCashBar/AccountCashBar';

import { styles } from './AccountsCashList.styles';

import type { ICash } from 'pages/Accounts/lib/types/interfaces';
import type { FC } from 'react';

interface AccountsCashListProps {
  handleModalOpen: (index: string) => void;
}

const AccountsCashList: FC<AccountsCashListProps> = ({ handleModalOpen }) => {
  const { handleAddCashCount } = useActions();
  const { cash } = useTypedSelector((state) => state);
  const theme = useContext<{ backgroundColor?: string; color?: string }>(themeContext);

  return (
    <>
      <View style={[styles.accountsTitle, { backgroundColor: theme.backgroundColor }]}>
        <Text style={[styles.h1Text, { color: theme.color }]}>Available Funds</Text>
      </View>
      {cash.length == 0 ? (
        <View style={styles.accountsNoFundMessage}>
          <Text style={[styles.h2Text, { color: theme.color }]}>
            At the moment you have no funds...
          </Text>
          <Pressable onPress={() => handleAddCashCount({ title: 'New title', count: 0 })}>
            <Ionicons name='add-outline' size={35} color={theme.color} />
          </Pressable>
        </View>
      ) : (
        <View style={styles.accountsScroll}>
          <View style={styles.accountsContent}>
            {cash.map((item: ICash) => (
              <TouchableOpacity
                key={item.index}
                onPress={() => {
                  handleModalOpen(item.index);
                }}>
                <AccountCashBar key={item.index} {...item} />
              </TouchableOpacity>
            ))}
            <Pressable onPress={() => handleAddCashCount({ title: 'New title', count: 0 })}>
              <Ionicons name='add-outline' size={35} color={theme.color} />
            </Pressable>
          </View>
        </View>
      )}
    </>
  );
};

export default AccountsCashList;
