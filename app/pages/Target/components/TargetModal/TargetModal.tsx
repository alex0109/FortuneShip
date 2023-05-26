/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { colors } from 'shared/assets/styles/local.style';
import themeContext from 'shared/lib/context/themeContext';

import { useActions } from 'shared/lib/hooks/useActions';
import CustomModal from 'shared/ui/Modal/Modal';

import ModalTitle from 'shared/ui/ModalTitle/ModalTitle';

import { styles } from './TargetModal.styles';

import type { ITarget } from 'pages/Target/lib/types/interfaces';

import type { FC, RefObject } from 'react';
import type { ModalRefProps } from 'shared/ui/Modal/Modal';

interface TargetModalProps {
  targetElement: ITarget;
  refModal: RefObject<ModalRefProps>;
  modalVisible: boolean | undefined;
  setModalVisible: (arg0: boolean) => void;
}

const TargetModal: FC<TargetModalProps> = ({
  targetElement,
  refModal,
  modalVisible,
  setModalVisible,
}) => {
  const { handleTopUpTargetValue } = useActions();

  const [addedValue, setAddedValue] = useState<number>(0);

  const theme = useContext<{ backgroundColor?: string; color?: string }>(themeContext);

  const addValueHandler = (index: string): void => {
    handleTopUpTargetValue({ index: index, value: addedValue });
    setAddedValue(0);
    setModalVisible(false);
  };

  return (
    <CustomModal ref={refModal} visible={modalVisible || false}>
      <ModalTitle>How much you want to addasfsafsa?</ModalTitle>
      <View style={[styles.modalPopUpContent]}>
        <TextInput
          style={[styles.modalCountText, { color: theme.color, borderBottomColor: theme.color }]}
          placeholder='Your number...'
          placeholderTextColor={colors.gray}
          keyboardType='numeric'
          onChangeText={(input) => {
            setAddedValue(Number(input));
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
            addValueHandler(targetElement.index);
          }}>
          <Text style={[styles.modalPopUpButton, { color: theme.color }]}>Add</Text>
        </TouchableOpacity>
      </View>
    </CustomModal>
  );
};

export default TargetModal;
