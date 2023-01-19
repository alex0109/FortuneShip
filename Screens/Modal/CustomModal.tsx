import { View, StyleSheet, Modal, TouchableOpacity, Dimensions } from 'react-native';
import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  forwardRef,
  useImperativeHandle,
  useState,
} from 'react';

import customStyles from '../../styles/local.styles.js';

type ModalProps = {
  children: ReactNode;
  visible: boolean;
};

export type PopupRefProps = {
  popupVisible: boolean;
  setPopupVisible: Dispatch<SetStateAction<boolean>>;
};

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const { width: SCREEN_WIDTH } = Dimensions.get('window');

const CustomModal = forwardRef<PopupRefProps, ModalProps>(({ children }, refPopup) => {
  const [popupVisible, setPopupVisible] = useState(false);

  useImperativeHandle(refPopup, () => ({ setPopupVisible, popupVisible }), [
    setPopupVisible,
    popupVisible,
  ]);

  return (
    <Modal animationType='fade' visible={popupVisible} transparent={true}>
      <TouchableOpacity style={styles.modalContainer} onPressIn={() => setPopupVisible(false)}>
        <View style={styles.modal}>{children}</View>
      </TouchableOpacity>
    </Modal>
  );
});

export default CustomModal;

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modal: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: SCREEN_HEIGHT / 3,
    width: SCREEN_WIDTH / 1.5,
    backgroundColor: customStyles.colors.blackBar,
    borderRadius: 20,
    padding: 15,
  },
});
