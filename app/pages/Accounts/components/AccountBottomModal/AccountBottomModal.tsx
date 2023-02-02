import React, {
  forwardRef,
  useCallback,
  useContext,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { Dimensions, TextInput, Text, View, Pressable, TouchableOpacity } from 'react-native';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import CustomModal, { PopupRefProps } from 'shared/ui/Modal/Modal';

import { colors } from 'shared/assets/styles/local.style';
import Down from 'shared/assets/images/remove.svg';
import Up from 'shared/assets/images/plus.svg';
import Trash from 'shared/assets/images/trash.svg';

import { useTypedSelector } from 'shared/lib/hooks/useTypedSelector';
import { ICash, ITarget } from '../../lib/types/interface';
import themeContext from 'shared/lib/context/themeContext';
import { styles } from './AccountBottomModal.styles';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

type BottomModalProps = {
  modalPropID: number;
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
};

export type BottomModalRefProps = {
  scrollTo: (destinition: number) => void;
  setActive: (active: boolean) => boolean;
};

const BottomModal = forwardRef<BottomModalRefProps, BottomModalProps>(
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
    refModal
  ) => {
    const { cash, targets } = useTypedSelector((state) => state);
    const [addedCount, setAddedCount] = useState<number>(0);
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

    const modalProps = findModalPropByID(modalPropID);

    const translationY = useSharedValue(0);
    const context = useSharedValue({ y: 0 });
    let isActive = useSharedValue(false);
    let MAX_TRANSLATE_Y = -SCREEN_HEIGHT / 1.7;

    const refPopup = useRef<PopupRefProps>(null);
    const setPopupVisible = useCallback((popupVisible: boolean) => {
      let setPopupVisible = refPopup.current?.setPopupVisible(popupVisible);
      if (setPopupVisible) {
        refPopup.current?.setPopupVisible(popupVisible);
      }
    }, []);
    const popupVisible = refPopup.current?.popupVisible;

    const scrollTo = useCallback((destinition: number): void => {
      'worklet';

      if (destinition === 0) {
        isActive.value = false;
      } else {
        isActive.value = true;
      }

      translationY.value = withSpring(destinition);
    }, []);

    const setActive = useCallback((): boolean => {
      return isActive.value;
    }, []);

    const countHandleChange = (index: number, newCount: any): void => {
      if (modalProps?.specify === 'cash') {
        updateCountCashAccount({ index: index, count: +newCount });
        console.log();
      } else if (modalProps?.specify === 'target') {
        updateCountTargetAccount({ index: index, count: +newCount });
      }
    };

    const titleHandleChange = (index: number, newTitle: string): void => {
      if (modalProps?.specify === 'cash') {
        updateTitleCashAccount({ index: index, title: newTitle });
      } else if (modalProps?.specify === 'target') {
        updateTitleTargetAccount({ index: index, title: newTitle });
      }
    };

    const removeCountHandler = (index: number): void => {
      if (modalProps?.specify === 'cash') {
        scrollTo(0);
        removeCashAccount({ index: index });
      } else if (modalProps?.specify === 'target') {
        scrollTo(0);
        removeTargetAccount({ index: index });
      }
    };

    const addCountHandler = (index: number, count: number): void => {
      if (modalProps?.specify === 'cash') {
        updateCountCashAccount({ index: index, count: count + addedCount });
        setAddedCount(0);
        setPopupVisible(false);
      } else if (modalProps?.specify === 'target') {
        updateCountTargetAccount({ index: index, count: count + addedCount });
        setAddedCount(0);
        setPopupVisible(false);
      }
    };

    useImperativeHandle(refModal, () => ({ scrollTo, setActive }), [scrollTo, setActive]);

    const gesture = Gesture.Pan()
      .onStart(() => {
        context.value = { y: translationY.value };
      })
      .onUpdate((event) => {
        translationY.value = event.translationY + context.value.y;
        translationY.value = Math.max(translationY.value, MAX_TRANSLATE_Y);
        if (translationY.value > -SCREEN_HEIGHT / 2) {
          scrollTo(MAX_TRANSLATE_Y);
        }
      })
      .onEnd(() => {
        if (translationY.value > -SCREEN_HEIGHT / 3) {
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
              { backgroundColor: theme.backgroundColor, borderTopColor: theme.color },
            ]}>
            <View style={[styles.modalCountContainer]}>
              <TextInput
                style={[styles.modalTitle, { color: theme.color }]}
                defaultValue={modalProps.title}
                onFocus={() => scrollTo(MAX_TRANSLATE_Y)}
                onSubmitEditing={({ nativeEvent }) =>
                  titleHandleChange(modalProps.index, nativeEvent.text)
                }
                placeholder='Your title...'
                placeholderTextColor={colors.gray}
              />
              <TextInput
                style={[
                  styles.modalCountText,
                  { color: theme.color, borderBottomColor: theme.color },
                ]}
                defaultValue={`${modalProps.count}`}
                onFocus={() => scrollTo(MAX_TRANSLATE_Y)}
                onSubmitEditing={({ nativeEvent }) =>
                  countHandleChange(modalProps.index, nativeEvent.text)
                }
                keyboardType='numeric'
                placeholder='Your capital...'
                placeholderTextColor={colors.gray}
              />
              <View style={[styles.modalButtonsContainer]}>
                <Pressable onPress={() => removeCountHandler(modalProps.index)}>
                  <Trash width={60} height={60} fill='black' />
                </Pressable>
                <Pressable onPress={() => setPopupVisible(true)}>
                  <Up width={60} height={60} fill='green' />
                </Pressable>
                <Pressable>
                  <Down width={60} height={60} fill='red' />
                </Pressable>
              </View>
            </View>
            <CustomModal ref={refPopup} visible={popupVisible ? popupVisible : false}>
              <Text style={[styles.modalPopUpTitle, { color: theme.color }]}>
                How much you want to add?
              </Text>
              <View style={[styles.modalPopUpContent]}>
                <TextInput
                  style={[
                    styles.modalCountText,
                    { color: theme.color, borderBottomColor: theme.color },
                  ]}
                  placeholder='Your number...'
                  placeholderTextColor={colors.gray}
                  keyboardType='numeric'
                  defaultValue={`${addedCount}`}
                  onChangeText={(input) => setAddedCount(Number(input))}
                />
              </View>
              <View style={[styles.modalPopUpButtonContainer]}>
                <TouchableOpacity onPress={() => setPopupVisible(false)}>
                  <Text style={[styles.modalPopUpButton, { color: theme.color }]}>Back</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => addCountHandler(modalProps.index, modalProps.count)}>
                  <Text style={[styles.modalPopUpButton, { color: theme.color }]}>Add</Text>
                </TouchableOpacity>
              </View>
            </CustomModal>
          </Animated.View>
        </GestureDetector>
      </React.Fragment>
    );
  }
);

export default BottomModal;
