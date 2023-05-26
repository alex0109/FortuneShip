import Ionicons from '@expo/vector-icons/Ionicons';

import React, { useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { Swipeable } from 'react-native-gesture-handler';

import { SafeAreaView } from 'react-navigation';
import { colors } from 'shared/assets/styles/local.style';
import themeContext from 'shared/lib/context/themeContext';

import { useActions } from 'shared/lib/hooks/useActions';

import { styles } from './TargetBar.styles';

import type { ITarget } from '../../lib/types/interfaces';

import type { FC } from 'react';

const TargetBar: FC<ITarget> = (target) => {
  const { handleDeleteTarget } = useActions();

  const theme = useContext<{ backgroundColor?: string; color?: string }>(themeContext);

  const onRightSwipe = () => (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
        backgroundColor: colors.red,
        height: 50,
      }}>
      <TouchableOpacity onPress={() => handleDeleteTarget({ index: target.index })}>
        <Ionicons name='md-close-outline' size={35} color={theme.color} />
      </TouchableOpacity>
    </View>
  );

  return (
    <Swipeable renderRightActions={onRightSwipe}>
      <SafeAreaView style={[styles.contentContainer, { borderBottomColor: theme.color }]}>
        <View style={styles.contentItem}>
          <Text style={[styles.title, { color: theme.color }]}>{target.title}</Text>
          <Text style={[styles.subTitle]}>${target.value}</Text>
        </View>
      </SafeAreaView>
    </Swipeable>
  );
};

export default TargetBar;
