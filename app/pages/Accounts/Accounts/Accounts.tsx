import BottomSheet from 'modules/BottomSheet/BottomSheet';
import CountBottomSheetContent from 'pages/Count/components/CountBottomSheetContent/CountBottomSheetContent';
import CountList from 'pages/Count/components/CountList/CountList';
import React, { useCallback, useContext, useRef, useState } from 'react';
import { Dimensions, ScrollView } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import themeContext from 'shared/lib/context/themeContext';

import TargetBottomSheetContent from '../../Target/components/TargetBottomSheetContent/TargetBottomSheetContent';
import TargetList from '../../Target/components/TargetList/TargetList';

import type { BottomSheetRefProps } from 'app/modules/BottomSheet/BottomSheet';

import type { FC } from 'react';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const Accounts: FC = () => {
  const theme = useContext<{ backgroundColor?: string; color?: string }>(themeContext);
  const [accountID, setAccountID] = useState<string>('');
  const countBottomSheetRef = useRef<BottomSheetRefProps>(null);
  const targetBottomSheetRef = useRef<BottomSheetRefProps>(null);

  const countScrollTo = countBottomSheetRef.current?.scrollTo;
  const targetScrollTo = targetBottomSheetRef.current?.scrollTo;

  const handleOpenCountBottomSheet = useCallback((index: string) => {
    setAccountID(index);
    const isActive = countBottomSheetRef?.current?.isActive();
    if (isActive) {
      countBottomSheetRef?.current?.scrollTo(0);
    } else {
      countBottomSheetRef?.current?.scrollTo(-SCREEN_HEIGHT / 1.8);
    }
  }, []);

  const handleOpenTargetBottomSheet = useCallback((index: string) => {
    setAccountID(index);
    const isActive = targetBottomSheetRef?.current?.isActive();
    if (isActive) {
      targetBottomSheetRef?.current?.scrollTo(0);
    } else {
      targetBottomSheetRef?.current?.scrollTo(-SCREEN_HEIGHT / 1.8);
    }
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ScrollView style={[{ backgroundColor: theme.backgroundColor }]} alwaysBounceVertical={false}>
        <CountList handleModalOpen={handleOpenCountBottomSheet} />
        <TargetList handleModalOpen={handleOpenTargetBottomSheet} />
      </ScrollView>
      <BottomSheet scrollLimit={SCREEN_HEIGHT / 3} ref={countBottomSheetRef}>
        <CountBottomSheetContent scrollTo={countScrollTo!} countID={accountID} />
      </BottomSheet>
      <BottomSheet scrollLimit={SCREEN_HEIGHT / 6} ref={targetBottomSheetRef}>
        <TargetBottomSheetContent scrollTo={targetScrollTo!} targetID={accountID} />
      </BottomSheet>
    </GestureHandlerRootView>
  );
};

export default Accounts;
