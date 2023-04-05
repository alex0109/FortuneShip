/* eslint-disable no-unused-vars */
import { useCashState } from 'pages/Accounts/lib/store/cash.zus';
import { useTargetState } from 'pages/Accounts/lib/store/target.zus';
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

import Ionicons from 'react-native-vector-icons/Ionicons';

import { colors } from 'shared/assets/styles/local.style';

import themeContext from 'shared/lib/context/themeContext';

import AccountModal from '../AccountModal/AccountModal';

import { styles } from './AccountBottomPopup.styles';

import type { ICash, IModalProp, ITarget } from '../../lib/types/interface';
import type { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import type { ModalRefProps } from 'shared/ui/Modal/Modal';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

interface BottomPopupProps {
  modalPropID: string;
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
  ({ modalPropID }, refPopup) => {
    const { cash, handleDeleteCashCount, handleChangeCashTitle, handleChangeCashCount } =
      useCashState();
    const { targets, handleDeleteTargetCount, handleChangeTargetTitle, handleChangeTargetCount } =
      useTargetState();

    const theme = useContext<{ backgroundColor?: string; color?: string }>(themeContext);

    const findModalPropByID = (index: string): IModalProp => {
      let item: ICash | ITarget | undefined;
      const modalPropType = index?.split('_')[0];

      if (modalPropType == '1') {
        item = targets.find((item: ICash | ITarget) => item.index === index);
      }
      if (modalPropType == '0') {
        item = cash.find((item: ICash | ITarget) => item.index === index);
      }
      if (item == undefined) {
        return {
          title: '',
          count: 0,
          index: '0',
          type: '0',
        };
      }

      return { ...item, type: modalPropType };
    };

    const modalProps = findModalPropByID(modalPropID);

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

    const titleHandleChange = (index: string, newTitle: string): void => {
      if (modalProps?.type === '0') {
        handleChangeCashTitle(index, newTitle);
      } else if (modalProps?.type === '1') {
        handleChangeTargetTitle(index, newTitle);
      }
    };

    const countChangeHandler = (index: string, newCount: string): void => {
      if (modalProps?.type === '0') {
        handleChangeCashCount(index, +newCount);
      } else if (modalProps?.type === '1') {
        handleChangeTargetCount(index, +newCount);
      }
    };

    const removeCountHandler = (index: string): void => {
      if (modalProps?.type === '0') {
        scrollTo(0);
        handleDeleteCashCount(index);
      } else if (modalProps?.type === '1') {
        scrollTo(0);
        handleDeleteTargetCount(index);
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
                  countChangeHandler(modalProps.index, nativeEvent.text);
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
                  <Ionicons name='trash-outline' size={45} color={theme.color} />
                </Pressable>
                <Pressable
                  onPress={() => {
                    setModalVisible(true);
                  }}>
                  <Ionicons name='ios-remove-circle-outline' size={45} color={theme.color} />
                </Pressable>
                <Pressable
                  onPress={() => {
                    setModalVisible(true);
                  }}>
                  <Ionicons name='add-outline' size={45} color={theme.color} />
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
