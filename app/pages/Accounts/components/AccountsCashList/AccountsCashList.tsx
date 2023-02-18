/* eslint-disable no-unused-vars */
import { cashExample } from 'pages/Accounts/lib/store/mockData';
import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, Pressable } from 'react-native';

import PlusBl from 'shared/assets/images/plus-bl.svg';
import Plus from 'shared/assets/images/plus-wh.svg';

import { colors } from 'shared/assets/styles/local.style';
import themeContext from 'shared/lib/context/themeContext';
import { useActions } from 'shared/lib/hooks/useActions';
import { useTypedSelector } from 'shared/lib/hooks/useTypedSelector';

import AccountCashBar from '../AccountCashBar/AccountCashBar';

import { styles } from './AccountsCashList.styles';

import type { ICash } from 'pages/Accounts/lib/types/interface';
import type { FC } from 'react';

interface AccountsCashListProps {
  handleModalOpen: (index: number) => void;
}

const AccountsCashList: FC<AccountsCashListProps> = ({ handleModalOpen }) => {
  const { addCashAccount } = useActions();
  const { cash } = useTypedSelector((state) => state);
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
          <Pressable onPress={() => addCashAccount(cashExample)}>
            {theme.backgroundColor == colors.blackMain ? (
              <Plus width={40} height={40} />
            ) : (
              <PlusBl width={40} height={40} />
            )}
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
            <Pressable onPress={() => addCashAccount(cashExample)}>
              {theme.backgroundColor == colors.blackMain ? (
                <Plus width={40} height={40} />
              ) : (
                <PlusBl width={40} height={40} />
              )}
            </Pressable>
          </View>
        </View>
      )}
    </>
  );
};

export default AccountsCashList;
