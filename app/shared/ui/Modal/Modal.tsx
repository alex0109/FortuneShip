import React, {
  forwardRef,
  useImperativeHandle,
  useState,
  useContext,
} from 'react';
import { View, Modal, TouchableOpacity } from 'react-native';

import themeContext from '../../lib/context/themeContext';

import { styles } from './Modal.styles';

import type {
  Dispatch,
  ReactNode,
  SetStateAction} from 'react';

interface ModalProps {
  children: ReactNode;
  visible: boolean;
}

export interface PopupRefProps {
  popupVisible: boolean;
  setPopupVisible: Dispatch<SetStateAction<boolean>>;
}

const CustomModal = forwardRef<PopupRefProps, ModalProps>(({ children }, refPopup) => {
  const [popupVisible, setPopupVisible] = useState(false);
  const theme = useContext<{ backgroundColor?: string; color?: string }>(themeContext);

  useImperativeHandle(refPopup, () => ({ setPopupVisible, popupVisible }), [
    setPopupVisible,
    popupVisible,
  ]);

  return (
    <Modal animationType='fade' visible={popupVisible} transparent={true}>
      <TouchableOpacity style={styles.modalContainer} onPressIn={() => { setPopupVisible(false); }}>
        <View style={[styles.modal, { backgroundColor: theme.backgroundColor }]}>{children}</View>
      </TouchableOpacity>
    </Modal>
  );
});

export default CustomModal;
