import React, { FC, useContext } from 'react';
import { View, Text } from 'react-native';
import { ITarget } from '../../lib/types/interface';
import themeContext from '../../../../shared/lib/context/themeContext';
import { styles } from './AccountTargetBar.styles';

const TargetBar: FC<ITarget> = (target) => {
  const theme = useContext<{ backgroundColor?: string; color?: string }>(themeContext);

  return (
    <View style={[styles.contentContainer, { borderBottomColor: theme.color }]}>
      <View style={styles.contentItem}>
        <View>
          <Text style={[{ color: theme.color, paddingLeft: 10 }]}>
            {!target.title ? 'Head title' : target.title}
          </Text>
          <Text style={[styles.subTitle]}>${target.count}</Text>
        </View>
      </View>
    </View>
  );
};

export default TargetBar;
