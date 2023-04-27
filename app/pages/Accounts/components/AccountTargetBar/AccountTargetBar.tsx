import React, { useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-navigation';

import CrossBl from 'shared/assets/images/cross-bl.svg';
import Cross from 'shared/assets/images/cross-wh.svg';

import { colors } from 'shared/assets/styles/local.style';
import themeContext from 'shared/lib/context/themeContext';

import { useActions } from 'shared/lib/hooks/useActions';

import { styles } from './AccountTargetBar.styles';

import type { ITarget } from '../../lib/types/interfaces';

import type { FC } from 'react';

const AccountTargetBar: FC<ITarget> = (target) => {
  const { handleDeleteTargetCount } = useActions();

  const theme = useContext<{ backgroundColor?: string; color?: string }>(themeContext);

  const onRightSwipe = () => (
    <View
      style={{
        justifyContent: 'center',
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
        backgroundColor: colors.red,
        height: 50,
      }}>
      <TouchableOpacity onPress={() => handleDeleteTargetCount({ index: target.index })}>
        {theme.backgroundColor == colors.blackMain ? (
          <CrossBl width={30} height={30} />
        ) : (
          <Cross width={30} height={30} />
        )}
      </TouchableOpacity>
    </View>
  );

  return (
    <Swipeable renderRightActions={onRightSwipe}>
      <SafeAreaView style={[styles.contentContainer, { borderBottomColor: theme.color }]}>
        <View style={styles.contentItem}>
          <View>
            <Text style={[{ color: theme.color, paddingLeft: 10 }]}>
              {!target.title ? 'Head title' : target.title}
            </Text>
            <Text style={[styles.subTitle]}>${target.count}</Text>
          </View>
        </View>
      </SafeAreaView>
    </Swipeable>
  );
};

export default AccountTargetBar;
