/* eslint-disable no-unused-vars */
import { useTargetState } from 'pages/Accounts/lib/store/target.zus';
import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, Pressable } from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

import themeContext from 'shared/lib/context/themeContext';

import AccountTargetBar from '../AccountTargetBar/AccountTargetBar';

import { styles } from './AccountsTargetList.styles';

import type { ITarget } from 'pages/Accounts/lib/types/interface';
import type { FC } from 'react';

interface AccountsTargetListProps {
  handleModalOpen: (index: string) => void;
}

const AccountsTargetList: FC<AccountsTargetListProps> = ({ handleModalOpen }) => {
  const { targets, handleAddTargetCount } = useTargetState();
  const theme = useContext<{ backgroundColor?: string; color?: string }>(themeContext);

  return (
    <>
      <View style={[styles.accountsTitle, { color: theme.color }]}>
        <Text style={[styles.h1Text, { color: theme.color }]}>Targets</Text>
      </View>
      {targets.length == 0 ? (
        <View style={styles.accountsNoFundMessage}>
          <Text style={[styles.h2Text, { color: theme.color }]}>
            At the moment you have no targets...
          </Text>
          <Pressable onPress={() => handleAddTargetCount('New target', 0)}>
            <Ionicons name='add-outline' size={35} color={theme.color} />
          </Pressable>
        </View>
      ) : (
        <View style={styles.accountsScroll}>
          <View style={styles.accountsContent}>
            {targets.map((item: ITarget) => (
              <TouchableOpacity
                key={item.index}
                onPress={() => {
                  handleModalOpen(item.index);
                }}>
                <AccountTargetBar key={item.index} {...item} />
              </TouchableOpacity>
            ))}
            <Pressable onPress={() => handleAddTargetCount('New target', 0)}>
              <Ionicons name='add-outline' size={35} color={theme.color} />
            </Pressable>
          </View>
        </View>
      )}
    </>
  );
};

export default AccountsTargetList;
