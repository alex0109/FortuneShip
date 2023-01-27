import React, { FC, useCallback, useContext, useRef, useState } from 'react';
import { View, Text, ScrollView, Pressable, TouchableOpacity } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import CashAccount from './AccountBars/CashBar';
import TargetAccount from './AccountBars/TargetBar';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import themeContext from '../../config/themeContext';

import { ICash, ITarget } from '../../store/types';
import { styles } from './account.style';
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
  const theme = useContext<{ backgroundColor?: string; color?: string }>(themeContext);
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

// const styles = StyleSheet.create({
//   button: {
//     height: 50,
//     borderRadius: 25,
//     aspectRatio: 1,
//     backgroundColor: 'white',
//     opacity: 0.6,
//   },
//   funds: {
//     backgroundColor: colors.blackMain,
//   },
//   title: {
//     flex: 1,
//     alignItems: 'stretch',
//     justifyContent: 'flex-start',
//     paddingLeft: 35,
//     marginTop: 30,
//     marginBottom: 30,
//   },
//   noFundMessage: {
//     flex: 10,
//     alignItems: 'center',
//     justifyContent: 'flex-start',
//     padding: 10,
//   },
//   scroll: {
//     flex: 10,
//   },
//   content: {
//     flex: 11,
//     alignItems: 'center',
//     justifyContent: 'flex-start',
//     marginBottom: 30,
//   },
//   mainText: {
//     color: colors.white,
//     fontFamily: 'Assistant',
//   },
//   h1Text: {
//     fontSize: 27,
//     fontWeight: '800',
//   },
//   h2Text: {
//     fontSize: 20,
//     marginBottom: 30,
//     fontWeight: '400',
//   },
// });
