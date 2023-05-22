import React, { useContext, useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

import { colors } from 'shared/assets/styles/local.style';
import themeContext from 'shared/lib/context/themeContext';
import { useActions } from 'shared/lib/hooks/useActions';
import CustomModal from 'shared/ui/Modal/Modal';

import ModalTitle from 'shared/ui/ModalTitle/ModalTitle';

import { styles } from './CategoryModal.styles';

import type { FC, RefObject } from 'react';
import type { ModalRefProps } from 'shared/ui/Modal/Modal';

interface CategoryModal {
  categoryID: string;
  refCategoryModal: RefObject<ModalRefProps>;
  modalVisible: boolean | undefined;
  setModalVisible: (arg0: boolean) => void;
}

const CategoryModal: FC<CategoryModal> = ({
  categoryID,
  refCategoryModal,
  modalVisible,
  setModalVisible,
}) => {
  const { handleTopUpCategory } = useActions();

  const [addedCount, setAddedCount] = useState<number>(0);

  const theme = useContext<{ backgroundColor?: string; color?: string }>(themeContext);

  const addCountHandler = (index: string, count: number): void => {
    if (count > 0) {
      handleTopUpCategory({ index: index, count: count });
      setAddedCount(0);
    }
    setModalVisible(false);
  };
  return (
    <CustomModal ref={refCategoryModal} visible={modalVisible || false}>
      <ModalTitle>Your consumption</ModalTitle>
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
            addCountHandler(categoryID, addedCount);
          }}>
          <Text style={[styles.modalPopUpButton, { color: theme.color }]}>Add</Text>
        </TouchableOpacity>
      </View>
    </CustomModal>
  );
};

export default CategoryModal;
