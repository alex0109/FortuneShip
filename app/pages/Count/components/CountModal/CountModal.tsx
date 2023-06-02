/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { colors } from 'shared/assets/styles/local.style';
import i18n from 'shared/config/i18n/i18n';
import themeContext from 'shared/lib/context/themeContext';

import { useActions } from 'shared/lib/hooks/useActions';
import CustomModal from 'shared/ui/Modal/Modal';

import ModalTitle from 'shared/ui/ModalTitle/ModalTitle';

import { styles } from './CountModal.styles';

import type { ICount } from 'pages/Count/lib/types/interfaces';
import type { FC, RefObject } from 'react';
import type { ModalRefProps } from 'shared/ui/Modal/Modal';

interface CountModalProps {
  countElement: ICount;
  refModal: RefObject<ModalRefProps>;
  modalVisible: boolean | undefined;
  setModalVisible: (arg0: boolean) => void;
}

const CountModal: FC<CountModalProps> = ({
  countElement,
  refModal,
  modalVisible,
  setModalVisible,
}) => {
  const { handleTopUpCount } = useActions();

  const [addedCount, setAddedCount] = useState<number>(0);

  const theme = useContext<{ backgroundColor?: string; color?: string }>(themeContext);

  const addCountHandler = (index: string): void => {
    handleTopUpCount({ index: index, value: addedCount });
    setAddedCount(0);
    setModalVisible(false);
  };

  return (
    <CustomModal ref={refModal} visible={modalVisible || false}>
      <ModalTitle>How much you want to add?</ModalTitle>
      <View style={[styles.modalPopUpContent]}>
        <TextInput
          style={[styles.modalCountText, { color: theme.color, borderBottomColor: theme.color }]}
          placeholder={i18n.t('Your number...')!}
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
          <Text style={[styles.modalPopUpButton, { color: theme.color }]}>{i18n.t('Back')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            addCountHandler(countElement.index);
          }}>
          <Text style={[styles.modalPopUpButton, { color: theme.color }]}>{i18n.t('Add')}</Text>
        </TouchableOpacity>
      </View>
    </CustomModal>
  );
};

export default CountModal;
