import React, { useCallback, useContext, useRef, useState } from 'react';
import { Dimensions, ScrollView } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import themeContext from 'shared/lib/context/themeContext';

import BottomModal from '../AccountBottomModal/AccountBottomPopup';

import AccountsCashList from '../AccountsCashList/AccountsCashList';
import AccountsTargetList from '../AccountsTargetList/AccountsTargetList';

import type { BottomPopupRefProps } from '../AccountBottomModal/AccountBottomPopup';

import type { FC } from 'react';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const Accounts: FC = () => {
  const theme = useContext<{ backgroundColor?: string; color?: string }>(themeContext);
  const refPopup = useRef<BottomPopupRefProps>(null);
  const [modalPropID, setModalPropID] = useState<string>();

  const handleModalOpen = useCallback((index: string) => {
    setModalPropID(index);

    const setActive = refPopup?.current?.setActive(true);
    if (setActive) {
      refPopup?.current?.scrollTo(0);
      refPopup?.current?.setActive(false);
    } else {
      refPopup?.current?.scrollTo(-SCREEN_HEIGHT / 1.5);
      refPopup?.current?.setActive(true);
    }
  }, []);

  return (
    <>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ScrollView style={[{ backgroundColor: theme.backgroundColor }]}>
          <AccountsCashList handleModalOpen={handleModalOpen} />
          <AccountsTargetList handleModalOpen={handleModalOpen} />
        </ScrollView>
        <BottomModal modalPropID={modalPropID} ref={refPopup} />
      </GestureHandlerRootView>
    </>
  );
};

export default Accounts;
