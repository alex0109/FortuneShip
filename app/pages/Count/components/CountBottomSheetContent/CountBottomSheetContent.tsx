import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useCallback, useContext, useRef } from 'react';
import { TextInput, View, TouchableOpacity } from 'react-native';

import themeContext from 'shared/lib/context/themeContext';

import { useActions } from 'shared/lib/hooks/useActions';

import { useTypedSelector } from 'shared/lib/hooks/useTypedSelector';

import CountModal from '../CountModal/CountModal';

import { styles } from './CountBottomSheetContent.styles';

import type { ICount } from '../../lib/types/interfaces';
import type { FC } from 'react';
import type { ModalRefProps } from 'shared/ui/Modal/Modal';

interface CountBottomSheetContentProps {
  countID: string;
  scrollTo: (destination: number) => void;
}
const CountBottomSheetContent: FC<CountBottomSheetContentProps> = ({ scrollTo, countID }) => {
  const { handleDeleteCount, handleChangeCountTitle, handleChangeCount } = useActions();
  const { count } = useTypedSelector((state) => state);

  const theme = useContext<{ backgroundColor?: string; color?: string }>(themeContext);

  const findModalPropByID = (index: string): ICount => {
    const item: ICount | undefined = count.find((item: ICount) => item.index === index);

    if (item == undefined) {
      return {
        title: '',
        value: 0,
        index: '0',
        history: [],
      };
    }

    return { ...item };
  };

  const countElement = findModalPropByID(countID);

  const refModal = useRef<ModalRefProps>(null);

  const setModalVisible = useCallback((modalVisible: boolean) => {
    const setModalVisible = refModal.current?.setModalVisible(modalVisible);
    if (setModalVisible) {
      refModal.current?.setModalVisible(modalVisible);
    }
  }, []);

  const modalVisible = refModal.current?.modalVisible;

  const changeTitleHandler = (index: string, newTitle: string): void => {
    handleChangeCountTitle({ index: index, title: newTitle });
  };

  const countChangeHandler = (index: string, newValue: string): void => {
    handleChangeCount({ index: index, value: +newValue });
  };

  const removeCountHandler = (index: string): void => {
    scrollTo(0);
    handleDeleteCount({ index: index });
  };

  return (
    <View style={[styles.container, { backgroundColor: 'green' }]}>
      <View style={[styles.header, { backgroundColor: 'green' }]}>
        <TextInput
          style={[styles.title, { color: theme.backgroundColor }]}
          defaultValue={countElement.title}
          onChangeText={(enteredText) => {
            changeTitleHandler(countElement.index, enteredText);
          }}
          placeholder='Your title...'
          placeholderTextColor={theme.backgroundColor}
        />
        <TextInput
          style={[styles.subTitle, { color: theme.backgroundColor }]}
          defaultValue={countElement.value.toString()}
          onChangeText={(enteredText) => {
            countChangeHandler(countElement.index, enteredText);
          }}
          keyboardType='numeric'
          placeholder='Your count...'
          placeholderTextColor={theme.backgroundColor}
        />
      </View>
      <View style={[styles.content, { backgroundColor: theme.backgroundColor }]}>
        <View style={[styles.belt]}>
          <TouchableOpacity onPress={() => removeCountHandler(countID)}>
            <Ionicons name='trash-outline' size={35} color={theme.color} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name='file-tray-full-outline' size={35} color={theme.color} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Ionicons name='add-outline' size={35} color={theme.color} />
          </TouchableOpacity>
        </View>
        <CountModal
          countElement={countElement}
          refModal={refModal}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
      </View>
    </View>
  );
};

export default CountBottomSheetContent;
