/* eslint-disable no-unused-vars */
import React, { forwardRef, useCallback, useContext, useImperativeHandle, useRef } from 'react';
import { Dimensions, TextInput, View, Pressable } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import MinusBl from 'shared/assets/images/minus-bl.svg';
import Minus from 'shared/assets/images/minus-wh.svg';
import PlusBl from 'shared/assets/images/plus-bl.svg';
import Plus from 'shared/assets/images/plus-wh.svg';
import TrashBl from 'shared/assets/images/trash-bl.svg';
import Trash from 'shared/assets/images/trash-wh.svg';

import { colors } from 'shared/assets/styles/local.style';

import themeContext from 'shared/lib/context/themeContext';
import { useTypedSelector } from 'shared/lib/hooks/useTypedSelector';

import AccountModal from '../AccountModal/AccountModal';

import { styles } from './AccountBottomPopup.styles';

import type { CashState, ICash, ITarget, TargetState } from '../../lib/types/interface';
import type { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import type { ModalRefProps } from 'shared/ui/Modal/Modal';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

interface BottomPopupProps {
  modalPropID: number | undefined;
  removeCashAccount: ActionCreatorWithPayload<{ index: number }, 'cash/removeCashAccount'>;
  updateTitleCashAccount: ActionCreatorWithPayload<
    { index: number; title: string },
    'cash/updateTitleCashAccount'
  >;
  updateCountCashAccount: ActionCreatorWithPayload<
    { index: number; count: number },
    'cash/updateCountCashAccount'
  >;
  removeTargetAccount: ActionCreatorWithPayload<{ index: number }, 'targets/removeTargetAccount'>;
  updateTitleTargetAccount: ActionCreatorWithPayload<
    { index: number; title: string },
    'targets/updateTitleTargetAccount'
  >;
  updateCountTargetAccount: ActionCreatorWithPayload<
    { index: number; count: number },
    'targets/updateCountTargetAccount'
  >;
}

export interface BottomPopupRefProps {
  scrollTo: (destination: number) => void;
  setActive: (arg0: boolean) => boolean;
}

const BottomPopup = forwardRef<BottomPopupRefProps, BottomPopupProps>(
  (
    {
      modalPropID,
      removeCashAccount,
      updateTitleCashAccount,
      updateCountCashAccount,
      removeTargetAccount,
      updateTitleTargetAccount,
      updateCountTargetAccount,
    },
    refPopup
  ) => {
    const { cash, targets }: { cash: CashState; targets: TargetState } = useTypedSelector(
      (state) => state
    );
    const theme = useContext<{ backgroundColor?: string; color?: string }>(themeContext);

    const findModalPropByID = (index: number): ICash | ITarget => {
      let item: ICash | ITarget | undefined;

      item = cash.find((item: ICash | ITarget) => item.index === index);

      if (item === undefined) {
        item = targets.find((item: ICash | ITarget) => item.index === index);
      }

      if (item === undefined) {
        return (item = {
          title: '',
          count: 0,
          index: 0,
          specify: 'cash',
        });
      }

      return item;
    };

    const modalProps = findModalPropByID(modalPropID!);

    const translationY = useSharedValue(0);
    const context = useSharedValue({ y: 0 });
    const isActive = useSharedValue(false);
    const MAX_TRANSLATE_Y = -SCREEN_HEIGHT / 1.5;

    const refModal = useRef<ModalRefProps>(null);

    const setModalVisible = useCallback((modalVisible: boolean) => {
      const setModalVisible = refModal.current?.setModalVisible(modalVisible);
      if (setModalVisible) {
        refModal.current?.setModalVisible(modalVisible);
      }
    }, []);

    const modalVisible = refModal.current?.modalVisible;

    const scrollTo = useCallback((destinition: number): void => {
      'worklet';

      if (destinition === 0) {
        isActive.value = false;
      } else {
        isActive.value = true;
      }

      translationY.value = withSpring(destinition);
    }, []);

    const setActive = useCallback((): boolean => isActive.value, []);

    const countHandleChange = (index: number, newCount: any): void => {
      if (modalProps?.specify === 'cash') {
        updateCountCashAccount({ index, count: +newCount });
      } else if (modalProps?.specify === 'target') {
        updateCountTargetAccount({ index, count: +newCount });
      }
    };

    const titleHandleChange = (index: number, newTitle: string): void => {
      if (modalProps?.specify === 'cash') {
        updateTitleCashAccount({ index, title: newTitle });
      } else if (modalProps?.specify === 'target') {
        updateTitleTargetAccount({ index, title: newTitle });
      }
    };

    const removeCountHandler = (index: number): void => {
      if (modalProps?.specify === 'cash') {
        scrollTo(0);
        removeCashAccount({ index });
      } else if (modalProps?.specify === 'target') {
        scrollTo(0);
        removeTargetAccount({ index });
      }
    };

    useImperativeHandle(refPopup, () => ({ scrollTo, setActive }), [scrollTo, setActive]);

    const gesture = Gesture.Pan()
      .onStart(() => {
        context.value = { y: translationY.value };
      })
      .onUpdate((event) => {
        translationY.value = event.translationY + context.value.y;
        translationY.value = Math.max(translationY.value, MAX_TRANSLATE_Y);
        if (translationY.value > -SCREEN_HEIGHT / 1) {
          scrollTo(MAX_TRANSLATE_Y);
        }
      })
      .onEnd(() => {
        if (translationY.value > -SCREEN_HEIGHT / 2) {
          scrollTo(0);
        }
      });

    const rBottomModalStyle = useAnimatedStyle(() => {
      const borderRadius = interpolate(
        translationY.value,
        [MAX_TRANSLATE_Y + 50, MAX_TRANSLATE_Y],
        [25, 5],
        Extrapolate.CLAMP
      );

      return {
        borderRadius,
        transform: [{ translateY: translationY.value }],
      };
    });

    return (
      <React.Fragment>
        <GestureDetector gesture={gesture}>
          <Animated.View
            style={[
              styles.modalContainer,
              rBottomModalStyle,
              { backgroundColor: theme.backgroundColor },
            ]}>
            <View style={[styles.modalCountContainer]}>
              <TextInput
                style={[styles.modalTitle, { color: theme.color }]}
                defaultValue={modalProps.title}
                onFocus={() => {
                  scrollTo(MAX_TRANSLATE_Y);
                }}
                onSubmitEditing={({ nativeEvent }) => {
                  titleHandleChange(modalProps.index, nativeEvent.text);
                }}
                placeholder='Your title...'
                placeholderTextColor={colors.gray}
              />
              <TextInput
                style={[
                  styles.modalCountText,
                  { color: theme.color, borderBottomColor: theme.color },
                ]}
                defaultValue={`${modalProps.count}`}
                onFocus={() => {
                  scrollTo(MAX_TRANSLATE_Y);
                }}
                onSubmitEditing={({ nativeEvent }) => {
                  countHandleChange(modalProps.index, nativeEvent.text);
                }}
                keyboardType='numeric'
                placeholder='Your capital...'
                placeholderTextColor={colors.gray}
              />
              <View style={[styles.modalButtonsContainer]}>
                <Pressable
                  onPress={() => {
                    removeCountHandler(modalProps.index);
                  }}>
                  {theme.backgroundColor == colors.blackMain ? (
                    <Trash width={60} height={60} />
                  ) : (
                    <TrashBl width={60} height={60} />
                  )}
                </Pressable>
                <Pressable
                  onPress={() => {
                    setModalVisible(true);
                  }}>
                  {theme.backgroundColor == colors.blackMain ? (
                    <Plus width={60} height={60} />
                  ) : (
                    <PlusBl width={60} height={60} />
                  )}
                </Pressable>
                <Pressable>
                  {theme.backgroundColor == colors.blackMain ? (
                    <Minus width={60} height={60} />
                  ) : (
                    <MinusBl width={60} height={60} />
                  )}
                </Pressable>
              </View>
            </View>
            <AccountModal
              modalProps={modalProps}
              refModal={refModal}
              modalVisible={modalVisible}
              setModalVisible={setModalVisible}
            />
          </Animated.View>
        </GestureDetector>
      </React.Fragment>
    );
  }
);

BottomPopup.displayName = 'BottomPopup';

export default BottomPopup;
