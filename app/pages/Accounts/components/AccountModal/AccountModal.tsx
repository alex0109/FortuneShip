/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { colors } from 'shared/assets/styles/local.style';
import themeContext from 'shared/lib/context/themeContext';

import { useActions } from 'shared/lib/hooks/useActions';
import CustomModal from 'shared/ui/Modal/Modal';

import ModalTitle from 'shared/ui/ModalTitle/ModalTitle';

import { styles } from './AccountModal.styles';

import type { IModalProp } from '../../lib/types/interfaces';
import type { FC, RefObject } from 'react';
import type { ModalRefProps } from 'shared/ui/Modal/Modal';

interface AccountModalProps {
  modalProps: IModalProp;
  refModal: RefObject<ModalRefProps>;
  modalVisible: boolean | undefined;
  setModalVisible: (arg0: boolean) => void;
}

const AccountModal: FC<AccountModalProps> = ({
  modalProps,
  refModal,
  modalVisible,
  setModalVisible,
}) => {
  const { handleChangeCashCount, handleChangeTargetCount } = useActions();

  const [addedCount, setAddedCount] = useState<number>(0);

  const theme = useContext<{ backgroundColor?: string; color?: string }>(themeContext);

  const addCountHandler = (index: string, count: number): void => {
    if (modalProps?.type === '0') {
      handleChangeCashCount({ index: index, count: count + addedCount });
      setAddedCount(0);
      setModalVisible(false);
    } else if (modalProps?.type === '1') {
      handleChangeTargetCount({ index: index, count: count + addedCount });
      setAddedCount(0);
      setModalVisible(false);
    }
  };

  return (
    <CustomModal ref={refModal} visible={modalVisible || false}>
      <ModalTitle>How much you want to add?</ModalTitle>
      <View style={[styles.modalPopUpContent]}>
        <TextInput
          style={[styles.modalCountText, { color: theme.color, borderBottomColor: theme.color }]}
          placeholder='Your number...'
          placeholderTextColor={colors.gray}
          keyboardType='numeric'
          onChangeText={(input) => {
            setAddedCount(Number(input));
          }}
        />
      </View>
      <View style={[styles.modalPopUpButtonContainer]}>
        <TouchableOpacity
          onPress={() => {
            setModalVisible(false);
          }}>
          <Text style={[styles.modalPopUpButton, { color: theme.color }]}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            addCountHandler(modalProps.index, modalProps.count);
          }}>
          <Text style={[styles.modalPopUpButton, { color: theme.color }]}>Add</Text>
        </TouchableOpacity>
      </View>
    </CustomModal>
  );
};

AccountModal.displayName = 'AccountModal';

export default AccountModal;
