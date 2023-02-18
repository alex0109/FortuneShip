import React, { useCallback, useContext, useRef, useState } from 'react';
import { ScrollView } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import themeContext from 'shared/lib/context/themeContext';
import { useActions } from 'shared/lib/hooks/useActions';

import { useTypedSelector } from 'shared/lib/hooks/useTypedSelector';

import BottomModal from '../AccountBottomModal/AccountBottomPopup';

import AccountsCashList from '../AccountsCashList/AccountsCashList';
import AccountsTargetList from '../AccountsTargetList/AccountsTargetList';

import type { BottomPopupRefProps } from '../AccountBottomModal/AccountBottomPopup';

import type { FC } from 'react';

const Accounts: FC = () => {
  const {
    removeCashAccount,
    removeTargetAccount,
    updateTitleCashAccount,
    updateCountCashAccount,
    updateTitleTargetAccount,
    updateCountTargetAccount,
  } = useActions();
  const { cash } = useTypedSelector((state) => state);
  const theme = useContext<{ backgroundColor?: string; color?: string }>(themeContext);
  const refPopup = useRef<BottomPopupRefProps>(null);
  const [modalPropID, setModalPropID] = useState<number>(cash[0].index);

  const handleModalOpen = useCallback((index: number) => {
    if (index !== undefined) {
      setModalPropID(index);
    }

    const setActive = refPopup?.current?.setActive(true);
    if (setActive) {
      refPopup?.current?.scrollTo(0);
      refPopup?.current?.setActive(false);
    } else {
      refPopup?.current?.scrollTo(-200);
      refPopup?.current?.setActive(true);
    }
  }, []);

  return (
    <>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ScrollView style={[{ backgroundColor: theme.backgroundColor }]}>
          <AccountsCashList
            removeCashAccount={removeCashAccount}
            handleModalOpen={handleModalOpen}
          />
          <AccountsTargetList handleModalOpen={handleModalOpen} />
        </ScrollView>
        <BottomModal
          modalPropID={modalPropID}
          removeCashAccount={removeCashAccount}
          removeTargetAccount={removeTargetAccount}
          updateTitleCashAccount={updateTitleCashAccount}
          updateCountCashAccount={updateCountCashAccount}
          updateTitleTargetAccount={updateTitleTargetAccount}
          updateCountTargetAccount={updateCountTargetAccount}
          ref={refPopup}
        />
      </GestureHandlerRootView>
    </>
  );
};

export default Accounts;
