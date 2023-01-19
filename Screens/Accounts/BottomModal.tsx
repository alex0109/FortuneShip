import React, { forwardRef, useCallback, useImperativeHandle, useRef, useState } from 'react';
import {
  Dimensions,
  StyleSheet,
  TextInput,
  Text,
  View,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import CustomModal, { PopupRefProps } from '../Modal/CustomModal';

import customStyles from '../../styles/local.styles.js';
import Down from '../../assets/images/remove.svg';
import Up from '../../assets/images/plus.svg';
import Trash from '../../assets/images/trash.svg';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { ICash, ITarget } from '../../store/types';

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

    const findModalPropByID = (index: number): ICash | ITarget => {
      let item: ICash | ITarget;

      item = cash.find((item) => item.index === index)!;

      if (item === undefined) {
        item = targets.find((item) => item.index === index)!;
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

    const removeModalHandler = (index: number): void => {
      if (modalProps?.specify === 'cash') {
        removeCashAccount({ index: index });
        scrollTo(0);
      } else if (modalProps?.specify === 'target') {
        removeTargetAccount({ index: index });
        scrollTo(0);
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
          <Animated.View style={[styles.bottomModalContainer, rBottomModalStyle]}>
            <View style={[styles.modalCountContainer]}>
              <TextInput
                style={[styles.modalTitle]}
                defaultValue={modalProps.title}
                onFocus={() => scrollTo(MAX_TRANSLATE_Y)}
                onSubmitEditing={({ nativeEvent }) =>
                  titleHandleChange(modalProps.index, nativeEvent.text)
                }
                placeholder='Your title...'
                placeholderTextColor={customStyles.colors.gray}
              />
              <TextInput
                style={[styles.modalCountText]}
                defaultValue={`${modalProps.count}`}
                onFocus={() => scrollTo(MAX_TRANSLATE_Y)}
                onSubmitEditing={({ nativeEvent }) =>
                  countHandleChange(modalProps.index, nativeEvent.text)
                }
                keyboardType='numeric'
                placeholder='Your capital...'
                placeholderTextColor={customStyles.colors.gray}
              />
              <View style={[styles.modalButtonsContainer]}>
                <Pressable onPress={() => removeModalHandler(modalProps.index)}>
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
              <Text style={[styles.popupTitle]}>How much you want to add?</Text>
              <View style={[styles.popupContent]}>
                <TextInput
                  style={[styles.modalCountText]}
                  placeholder='Your number...'
                  placeholderTextColor={customStyles.colors.gray}
                  keyboardType='numeric'
                  defaultValue={`${addedCount}`}
                  onChangeText={(input) => setAddedCount(Number(input))}
                />
              </View>
              <View style={[styles.popupButtonContainer]}>
                <TouchableOpacity onPress={() => setPopupVisible(false)}>
                  <Text style={[styles.popupButton]}>Back</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => addCountHandler(modalProps.index, modalProps.count)}
                >
                  <Text style={[styles.popupButton]}>Add</Text>
                </TouchableOpacity>
              </View>
            </CustomModal>
          </Animated.View>
        </GestureDetector>
      </React.Fragment>
    );
  }
);

const styles = StyleSheet.create({
  bottomModalContainer: {
    height: SCREEN_HEIGHT,
    width: '100%',
    backgroundColor: customStyles.colors.blackBar,
    position: 'absolute',
    top: SCREEN_HEIGHT,
    borderRadius: 25,
    padding: 15,
  },
  modalTitle: {
    justifyContent: 'center',
    textAlign: 'center',
    width: '100%',
    fontSize: 28,
    color: customStyles.colors.white,
    fontWeight: 'bold',
  },
  modalCountContainer: {
    height: '40%',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    width: '100%',
  },
  modalCountText: {
    textAlign: 'center',
    minWidth: '40%',
    marginBottom: 25,
    fontSize: 20,
    color: customStyles.colors.white,
    borderBottomWidth: 1,
    borderBottomColor: customStyles.colors.white,
  },
  popupButtonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  popupTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: customStyles.colors.white,
  },
  popupContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  popupButton: {
    fontSize: 16,
    color: customStyles.colors.white,
  },
});

export default BottomModal;
