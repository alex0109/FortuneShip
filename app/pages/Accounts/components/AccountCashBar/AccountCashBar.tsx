import { useCashState } from 'pages/Accounts/lib/store/cash.zus';
import React, { useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { Swipeable } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { SafeAreaView } from 'react-navigation';
import { colors } from 'shared/assets/styles/local.style';
import themeContext from 'shared/lib/context/themeContext';

import { styles } from './AccountCashBar.styles';

import type { ICash } from '../../lib/types/interface';

import type { FC } from 'react';

const AccountCashBar: FC<ICash> = (cash) => {
  const { handleDeleteCashCount } = useCashState();

  const theme = useContext<{ backgroundColor?: string; color?: string }>(themeContext);

  const onRightSwipe = () => (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
        backgroundColor: colors.red,
        height: 50,
      }}>
      <TouchableOpacity onPress={() => handleDeleteCashCount(cash.index)}>
        <Ionicons name='md-close-outline' size={35} color={theme.color} />
      </TouchableOpacity>
    </View>
  );

  return (
    <Swipeable renderRightActions={onRightSwipe}>
      <SafeAreaView style={[styles.contentContainer, { borderBottomColor: theme.color }]}>
        <View style={styles.contentItem}>
          <Text style={[styles.title, { color: theme.color }]}>{cash.title}</Text>
          <Text style={[styles.subTitle]}>${cash.count}</Text>
        </View>
      </SafeAreaView>
    </Swipeable>
  );
};

export default AccountCashBar;
