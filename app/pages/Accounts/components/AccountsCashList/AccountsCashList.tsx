/* eslint-disable no-unused-vars */
import { useCashState } from 'pages/Accounts/lib/store/cash.zus';
import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, Pressable } from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

import themeContext from 'shared/lib/context/themeContext';

import AccountCashBar from '../AccountCashBar/AccountCashBar';

import { styles } from './AccountsCashList.styles';

import type { ICash } from 'pages/Accounts/lib/types/interface';
import type { FC } from 'react';

interface AccountsCashListProps {
  handleModalOpen: (index: string) => void;
}

const AccountsCashList: FC<AccountsCashListProps> = ({ handleModalOpen }) => {
  const { cash, handleAddCashCount } = useCashState();
  const theme = useContext<{ backgroundColor?: string; color?: string }>(themeContext);

  return (
    <>
      <View style={[styles.accountsTitle, { color: theme.color }]}>
        <Text style={[styles.h1Text, { color: theme.color }]}>Available Funds</Text>
      </View>
      {cash.length == 0 ? (
        <View style={styles.accountsNoFundMessage}>
          <Text style={[styles.h2Text, { color: theme.color }]}>
            At the moment you have no funds...
          </Text>
          <Pressable onPress={() => handleAddCashCount('New count', 0)}>
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
            <Pressable onPress={() => handleAddCashCount('New count', 0)}>
              <Ionicons name='add-outline' size={35} color={theme.color} />
            </Pressable>
          </View>
        </View>
      )}
    </>
  );
};

export default AccountsCashList;
