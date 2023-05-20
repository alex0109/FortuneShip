import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import CustomModal from 'shared/ui/Modal/Modal';

import type { FC, RefObject } from 'react';
import type { ModalRefProps } from 'shared/ui/Modal/Modal';

interface CategoryModal {
  refCategoryModal: RefObject<ModalRefProps>;
}

const CategoryModal: FC<CategoryModal> = ({ refCategoryModal }) => {
  const a;
  return (
    <CustomModal ref={refCategoryModal}>
      <View>
        <Text>CategoryModal</Text>
      </View>
    </CustomModal>
  );
};

export default CategoryModal;

const styles = StyleSheet.create({});
