import Ionicons from '@expo/vector-icons/Ionicons';

import { Easing, runTiming, useFont, useValue } from '@shopify/react-native-skia';
import React, { useCallback, useContext, useRef } from 'react';
import { TextInput, View, PixelRatio, Text, TouchableOpacity } from 'react-native';

import themeContext from 'shared/lib/context/themeContext';

import { useActions } from 'shared/lib/hooks/useActions';

import { useTypedSelector } from 'shared/lib/hooks/useTypedSelector';

import TargetDonut from '../TargetDonut/TargetDonut';
import TargetModal from '../TargetModal/TargetModal';

import { styles } from './TargetBottomSheetContent.styles';

import type { ITarget } from '../../lib/types/interfaces';
import type { FC } from 'react';
import type { ModalRefProps } from 'shared/ui/Modal/Modal';

const radius = PixelRatio.roundToNearestPixel(90);
const STROKE_WIDTH = 9;

interface TargetBottomSheetContentProps {
  targetID: string;
  scrollTo: (destination: number) => void;
}
const TargetBottomSheetContent: FC<TargetBottomSheetContentProps> = ({ scrollTo, targetID }) => {
  const theme = useContext<{ backgroundColor?: string; color?: string }>(themeContext);

  const {
    handleDeleteTarget,
    handleChangeTarget,
    handleChangeTargetValue,
    handleChangeTargetTitle,
  } = useActions();
  const { target } = useTypedSelector((state) => state);

  const findModalPropByID = (index: string): ITarget => {
    const item: ITarget | undefined = target.find((item: ITarget) => item.index === index);

    return item ? { ...item } : { index: '0', title: '', value: 0, target: 0 };
  };

  const targetElement = findModalPropByID(targetID);

  const targetPercentage = targetElement.value / targetElement.target;
  const animationState = useValue(0);

  (function () {
    animationState.current = 0;
    runTiming(animationState, targetPercentage, {
      duration: 1250,
      easing: Easing.inOut(Easing.cubic),
    });
  })();

  const refTargetModal = useRef<ModalRefProps>(null);

  const setModalVisible = useCallback((modalVisible: boolean) => {
    const setModalVisible = refTargetModal.current?.setModalVisible(modalVisible);
    if (setModalVisible) {
      refTargetModal.current?.setModalVisible(modalVisible);
    }
  }, []);

  const modalVisible = refTargetModal.current?.modalVisible;

  const changeTitleHandler = (index: string, newTitle: string): void => {
    handleChangeTargetTitle({ index: index, title: newTitle });
  };

  const targetChangeHandler = (index: string, newTarget: string): void => {
    handleChangeTarget({ index: index, target: +newTarget });
  };

  const targetValueChangeHandler = (index: string, newTargetValue: string): void => {
    handleChangeTargetValue({ index: index, value: +newTargetValue });
  };

  const removeTargetHandler = (index: string): void => {
    scrollTo(0);
    handleDeleteTarget({ index: index });
  };

  const font = useFont(require('shared/assets/fonts/Assistant/Assistant-Light.ttf'), 50);

  if (!font) {
    return <View />;
  }

  return (
    <View style={[styles.container, { backgroundColor: 'green' }]}>
      <View style={[styles.header, { backgroundColor: 'green' }]}>
        <TextInput
          style={[styles.title, { color: theme.backgroundColor }]}
          defaultValue={targetElement.title}
          onChangeText={(enteredText) => {
            changeTitleHandler(targetElement.index, enteredText);
          }}
          placeholder='Your title...'
          placeholderTextColor={theme.backgroundColor}
        />
        <View style={styles.subTitleContainer}>
          <TextInput
            style={[styles.subTitle, { color: theme.backgroundColor }]}
            defaultValue={targetElement.value.toString()}
            onChangeText={(enteredText) => {
              targetValueChangeHandler(targetElement.index, enteredText);
            }}
            keyboardType='numeric'
            placeholder='Your count...'
            placeholderTextColor={theme.backgroundColor}
          />
          <Text style={[styles.subTitle, { color: theme.backgroundColor }]}>/</Text>
          <TextInput
            style={[styles.subTitle, { color: theme.backgroundColor }]}
            defaultValue={targetElement.target.toString()}
            onChangeText={(enteredText) => {
              targetChangeHandler(targetElement.index, enteredText);
            }}
            keyboardType='numeric'
            placeholder='Your count...'
            placeholderTextColor={theme.backgroundColor}
          />
        </View>
      </View>
      <View style={[styles.content, { backgroundColor: theme.backgroundColor }]}>
        <View style={[styles.belt]}>
          <TouchableOpacity onPress={() => removeTargetHandler(targetID)}>
            <Ionicons name='trash-outline' size={35} color={theme.color} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name='file-tray-full-outline' size={35} color={theme.color} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Ionicons name='add-outline' size={35} color={theme.color} />
          </TouchableOpacity>
        </View>
        <View style={styles.donutContainer}>
          <View style={styles.donutChartContainer}>
            <TargetDonut
              backgroundColor='white'
              radius={radius}
              strokeWidth={STROKE_WIDTH}
              percentageComplete={animationState}
              targetPercentage={targetPercentage}
              font={font}
            />
          </View>
          <View style={styles.completeResultContainer}>
            <Text style={[styles.completeResultText, { color: theme.color }]}>
              {targetElement.value} / {targetElement.target}
            </Text>
          </View>
        </View>
        <TargetModal
          targetElement={targetElement}
          refModal={refTargetModal}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
      </View>
    </View>
  );
};

export default TargetBottomSheetContent;
