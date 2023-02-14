import React, { forwardRef, useImperativeHandle, useState, useContext } from 'react';
import { View, Modal, TouchableOpacity } from 'react-native';

import themeContext from '../../lib/context/themeContext';

import { styles } from './Modal.styles';

import type { Dispatch, ReactNode, SetStateAction } from 'react';

interface ModalProps {
  children: ReactNode;
  visible: boolean;
}

export interface ModalRefProps {
  modalVisible: boolean;
  setModalVisible: Dispatch<SetStateAction<boolean>>;
}

const CustomModal = forwardRef<ModalRefProps, ModalProps>(({ children }, refModal) => {
  const [modalVisible, setModalVisible] = useState(false);
  const theme = useContext<{ backgroundColor?: string; color?: string }>(themeContext);

  useImperativeHandle(refModal, () => ({ setModalVisible, modalVisible }), [
    setModalVisible,
    modalVisible,
  ]);

  return (
    <Modal animationType='fade' visible={modalVisible} transparent={true}>
      <TouchableOpacity
        style={styles.modalContainer}
        onPressIn={() => {
          setModalVisible(false);
        }}>
        <View style={[styles.modal, { backgroundColor: theme.backgroundColor }]}>{children}</View>
      </TouchableOpacity>
    </Modal>
  );
});

CustomModal.displayName = 'CustomModal';

export default CustomModal;
