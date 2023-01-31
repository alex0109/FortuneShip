import { View, Modal, TouchableOpacity } from 'react-native';
import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  forwardRef,
  useImperativeHandle,
  useState,
  useContext,
} from 'react';

import themeContext from '../../lib/context/themeContext';

import { styles } from './Modal.styles';

type ModalProps = {
  children: ReactNode;
  visible: boolean;
};

export type PopupRefProps = {
  popupVisible: boolean;
  setPopupVisible: Dispatch<SetStateAction<boolean>>;
};

const CustomModal = forwardRef<PopupRefProps, ModalProps>(({ children }, refPopup) => {
  const [popupVisible, setPopupVisible] = useState(false);
  const theme = useContext<{ backgroundColor?: string; color?: string }>(themeContext);

  useImperativeHandle(refPopup, () => ({ setPopupVisible, popupVisible }), [
    setPopupVisible,
    popupVisible,
  ]);

  return (
    <Modal animationType='fade' visible={popupVisible} transparent={true}>
      <TouchableOpacity style={styles.modalContainer} onPressIn={() => setPopupVisible(false)}>
        <View style={[styles.modal, { backgroundColor: theme.backgroundColor }]}>{children}</View>
      </TouchableOpacity>
    </Modal>
  );
});

export default CustomModal;
