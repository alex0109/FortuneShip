import React, { FC, useCallback, useContext, useRef, useState } from 'react';
import { View, Text, ScrollView, Pressable, TouchableOpacity } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import CashAccount from '../AccountCashBar/AccountCashBar';
import TargetAccount from '../AccountTargetBar/AccountTargetBar';
import { useActions } from 'shared/lib/hooks/useActions';
import { useTypedSelector } from 'shared/lib/hooks/useTypedSelector';
import themeContext from 'shared/lib/context/themeContext';

import { styles } from './Accounts.styles';
import Plus from 'shared/assets/images/plus.svg';
import BottomModal, { BottomModalRefProps } from '../AccountBottomModal/AccountBottomModal';
import { cashExample, targetExample } from '../../lib/store/mockData';

const Accounts: FC = () => {
  const {
    addCashAccount,
    addTargetAccount,
    removeCashAccount,
    removeTargetAccount,
    updateTitleCashAccount,
    updateCountCashAccount,
    updateTitleTargetAccount,
    updateCountTargetAccount,
  } = useActions();
  const { cash, targets } = useTypedSelector((state) => state);
  const theme = useContext<{ backgroundColor?: string; color?: string }>(themeContext);
  const refModal = useRef<BottomModalRefProps>(null);
  const [modalPropID, setModalPropID] = useState<number>(cash[0].index);

  const handleModalOpen = useCallback((index: number) => {
    if (index !== undefined) {
      setModalPropID(index);
      console.log(index);
    }

    let setActive = refModal?.current?.setActive(true);
    if (setActive) {
      refModal?.current?.scrollTo(0);
      refModal?.current?.setActive(false);
    } else {
      refModal?.current?.scrollTo(-200);
      refModal?.current?.setActive(true);
    }
  }, []);

  return (
    <>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ScrollView style={[{ backgroundColor: theme.backgroundColor }]}>
          <View style={[styles.accountsTitle, { color: theme.color }]}>
            <Text style={[styles.h1Text, { color: theme.color }]}>Available Funds</Text>
          </View>
          {cash.length == 0 ? (
            <View style={styles.accountsNoFundMessage}>
              <Text style={[styles.h2Text, { color: theme.color }]}>
                At the moment you have no funds...
              </Text>
              <Pressable onPress={() => addCashAccount(cashExample)}>
                <Plus width={30} height={30} fill={theme.color} />
              </Pressable>
            </View>
          ) : (
            <View style={styles.accountsScroll}>
              <View style={styles.accountsContent}>
                {cash.map((item) => (
                  <TouchableOpacity key={item.index} onPress={() => handleModalOpen(item.index)}>
                    <CashAccount key={item.index} {...item} />
                  </TouchableOpacity>
                ))}
                <Pressable onPress={() => addCashAccount(cashExample)}>
                  <Plus width={30} height={30} fill={theme.color} />
                </Pressable>
              </View>
            </View>
          )}

          <View style={[styles.accountsTitle, { color: theme.color }]}>
            <Text style={[styles.h1Text, { color: theme.color }]}>Targets</Text>
          </View>
          {targets.length == 0 ? (
            <View style={styles.accountsNoFundMessage}>
              <Text style={[styles.h2Text, { color: theme.color }]}>
                At the moment you have no targets...
              </Text>
              <Pressable onPress={() => addTargetAccount(targetExample)}>
                <Plus width={30} height={30} fill={theme.color} />
              </Pressable>
            </View>
          ) : (
            <View style={styles.accountsScroll}>
              <View style={styles.accountsContent}>
                {targets.map((item) => (
                  <TouchableOpacity key={item.index} onPress={() => handleModalOpen(item.index)}>
                    <TargetAccount key={item.index} {...item} />
                  </TouchableOpacity>
                ))}
                <Pressable onPress={() => addTargetAccount(targetExample)}>
                  <Plus width={30} height={30} fill={theme.color} />
                </Pressable>
              </View>
            </View>
          )}
        </ScrollView>
        <BottomModal
          modalPropID={modalPropID}
          removeCashAccount={removeCashAccount}
          removeTargetAccount={removeTargetAccount}
          updateTitleCashAccount={updateTitleCashAccount}
          updateCountCashAccount={updateCountCashAccount}
          updateTitleTargetAccount={updateTitleTargetAccount}
          updateCountTargetAccount={updateCountTargetAccount}
          ref={refModal}
        />
      </GestureHandlerRootView>
    </>
  );
};

export default Accounts;
