import React, { FC, useCallback, useRef, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, Pressable, TouchableOpacity } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import CashAccount from './AccountBars/CashBar';
import TargetAccount from './AccountBars/TargetBar';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { ICash, ITarget } from '../../store/types';

import customStyles from '../../styles/local.styles';
import Plus from '../../assets/images/plus.svg';
import BottomModal, { BottomModalRefProps } from './BottomModal';

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

  const refModal = useRef<BottomModalRefProps>(null);
  const [modalPropID, setModalPropID] = useState<number>(cash[0].index);

  const cashExample: ICash = {
    index: Math.random() * 10000 - 1,
    title: 'Count',
    count: 0,
    specify: 'cash',
  };

  const targetExample: ITarget = {
    index: Math.random() * 10000 - 1,
    title: 'Target',
    count: 0,
    specify: 'target',
  };

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
        <ScrollView style={styles.funds}>
          <View style={styles.title}>
            <Text style={[styles.mainText, styles.h1Text]}>Available Funds</Text>
          </View>
          {cash.length == 0 ? (
            <View style={styles.noFundMessage}>
              <Text style={[styles.mainText, styles.h2Text]}>
                At the moment you have no funds...
              </Text>
              <Pressable onPress={() => addCashAccount(cashExample)}>
                <Plus width={30} height={30} fill='white' />
              </Pressable>
            </View>
          ) : (
            <View style={styles.scroll}>
              <View style={styles.content}>
                {cash.map((item) => (
                  <TouchableOpacity key={item.index} onPress={() => handleModalOpen(item.index)}>
                    <CashAccount key={item.index} {...item} />
                  </TouchableOpacity>
                ))}
                <Pressable onPress={() => addCashAccount(cashExample)}>
                  <Plus width={30} height={30} fill='white' />
                </Pressable>
              </View>
            </View>
          )}

          <View style={styles.title}>
            <Text style={[styles.mainText, styles.h1Text]}>Targets</Text>
          </View>
          {targets.length == 0 ? (
            <View style={styles.noFundMessage}>
              <Text style={[styles.mainText, styles.h2Text]}>
                At the moment you have no targets...
              </Text>
              <Pressable onPress={() => addTargetAccount(targetExample)}>
                <Plus width={30} height={30} fill='white' />
              </Pressable>
            </View>
          ) : (
            <View style={styles.scroll}>
              <View style={styles.content}>
                {targets.map((item) => (
                  <TouchableOpacity key={item.index} onPress={() => handleModalOpen(item.index)}>
                    <TargetAccount key={item.index} {...item} />
                  </TouchableOpacity>
                ))}
                <Pressable onPress={() => addTargetAccount(targetExample)}>
                  <Plus width={30} height={30} fill='white' />
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

const styles = StyleSheet.create({
  button: {
    height: 50,
    borderRadius: 25,
    aspectRatio: 1,
    backgroundColor: 'white',
    opacity: 0.6,
  },
  funds: {
    backgroundColor: customStyles.colors.blackMain,
  },
  title: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    paddingLeft: 35,
    marginTop: 30,
    marginBottom: 30,
  },
  noFundMessage: {
    flex: 10,
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 10,
  },
  scroll: {
    flex: 10,
  },
  content: {
    flex: 11,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 30,
  },
  mainText: {
    color: customStyles.colors.white,
    fontFamily: 'Assistant',
  },
  h1Text: {
    fontSize: 27,
    fontWeight: '800',
  },
  h2Text: {
    fontSize: 20,
    marginBottom: 30,
    fontWeight: '400',
  },
});
