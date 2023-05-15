import BottomSheet from 'modules/BottomSheet/BottomSheet';
import React, { useCallback, useContext, useRef, useState } from 'react';
import { Dimensions, ScrollView } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import themeContext from 'shared/lib/context/themeContext';

import AccountBSContent from '../AccountBSContent/AccountBSContent';
import AccountsCashList from '../AccountsCashList/AccountsCashList';
import AccountsTargetList from '../AccountsTargetList/AccountsTargetList';

import type { BottomSheetRefProps } from 'app/modules/BottomSheet/BottomSheet';

import type { FC } from 'react';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const Accounts: FC = () => {
  const theme = useContext<{ backgroundColor?: string; color?: string }>(themeContext);
  const [accountID, setAccountID] = useState<string>('');
  const bottomSheetRef = useRef<BottomSheetRefProps>(null);
  const scrollTo = bottomSheetRef.current?.scrollTo;

  const handleBtmShtOpen = useCallback((index: string) => {
    setAccountID(index);
    const isActive = bottomSheetRef?.current?.isActive();
    if (isActive) {
      bottomSheetRef?.current?.scrollTo(0);
    } else {
      bottomSheetRef?.current?.scrollTo(-SCREEN_HEIGHT / 1.8);
    }
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ScrollView style={[{ backgroundColor: theme.backgroundColor }]} alwaysBounceVertical={false}>
        <AccountsCashList handleModalOpen={handleBtmShtOpen} />
        <AccountsTargetList handleModalOpen={handleBtmShtOpen} />
      </ScrollView>
      <BottomSheet ref={bottomSheetRef}>
        <AccountBSContent scrollTo={scrollTo} accountID={accountID} />
      </BottomSheet>
    </GestureHandlerRootView>
  );
};

export default Accounts;
