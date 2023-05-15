import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useCallback, useContext, useRef } from 'react';
import { Dimensions, TextInput, View, Pressable } from 'react-native';

import { colors } from 'shared/assets/styles/local.style';

import themeContext from 'shared/lib/context/themeContext';

import { useActions } from 'shared/lib/hooks/useActions';

import { useTypedSelector } from 'shared/lib/hooks/useTypedSelector';

import AccountModal from '../AccountModal/AccountModal';

import { styles } from './AccountBSContent.styles';

import type { ICash, IModalProp, ITarget } from '../../lib/types/interfaces';
import type { FC } from 'react';
import type { ModalRefProps } from 'shared/ui/Modal/Modal';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

interface BottomPopupProps {
  accountID: string;
  scrollTo: ((destination: number) => void) | undefined;
}
const AccountBSContent: FC<BottomPopupProps> = ({ scrollTo, accountID }) => {
  const {
    handleDeleteCashCount,
    handleChangeCashTitle,
    handleChangeCashCount,
    handleDeleteTargetCount,
    handleChangeTargetTitle,
    handleChangeTargetCount,
  } = useActions();
  const { cash, target } = useTypedSelector((state) => state);

  const theme = useContext<{ backgroundColor?: string; color?: string }>(themeContext);

  const findModalPropByID = (index: string): IModalProp => {
    let item: ICash | ITarget | undefined;
    const modalPropType = index?.split('_')[0];

    if (modalPropType == '1') {
      item = target.find((item: ITarget) => item.index === index);
    }
    if (modalPropType == '0') {
      item = cash.find((item: ICash) => item.index === index);
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

  const modalProps = findModalPropByID(accountID);

  const MAX_TRANSLATE_Y = -SCREEN_HEIGHT / 1.5;

  const refModal = useRef<ModalRefProps>(null);

  const setModalVisible = useCallback((modalVisible: boolean) => {
    const setModalVisible = refModal.current?.setModalVisible(modalVisible);
    if (setModalVisible) {
      refModal.current?.setModalVisible(modalVisible);
    }
  }, []);

  const modalVisible = refModal.current?.modalVisible;

  const titleHandleChange = (index: string, newTitle: string): void => {
    if (modalProps?.type === '0') {
      handleChangeCashTitle({ index: index, title: newTitle });
    } else if (modalProps?.type === '1') {
      handleChangeTargetTitle({ index: index, title: newTitle });
    }
  };

  const countChangeHandler = (index: string, newCount: string): void => {
    if (modalProps?.type === '0') {
      handleChangeCashCount({ index: index, count: +newCount });
    } else if (modalProps?.type === '1') {
      handleChangeTargetCount({ index: index, count: +newCount });
    }
  };

  const removeCountHandler = (index: string): void => {
    if (modalProps?.type === '0') {
      scrollTo(0);
      handleDeleteCashCount({ index: index });
    } else if (modalProps?.type === '1') {
      scrollTo(0);
      handleDeleteTargetCount({ index: index });
    }
  };

  return (
    <>
      <View style={[styles.modalCountContainer]}>
        <TextInput
          style={[styles.modalTitle, { color: theme.color }]}
          defaultValue={modalProps.title}
          onFocus={() => {
            scrollTo(MAX_TRANSLATE_Y);
          }}
          onChangeText={(enteredText) => {
            titleHandleChange(modalProps.index, enteredText);
          }}
          placeholder='Your title...'
          placeholderTextColor={colors.gray}
        />
        <TextInput
          style={[styles.modalCountText, { color: theme.color, borderBottomColor: theme.color }]}
          defaultValue={`${modalProps.count}`}
          onFocus={() => {
            scrollTo(MAX_TRANSLATE_Y);
          }}
          onChangeText={(enteredText) => {
            countChangeHandler(modalProps.index, enteredText);
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
    </>
  );
};

export default AccountBSContent;
