import React, { FC, useContext } from 'react';
import { View, Text } from 'react-native';
import { ICash } from '../../lib/types/interface';

import themeContext from 'shared/lib/context/themeContext';
import { styles } from './AccountCashBar.styles';

const CashBar: FC<ICash> = (cash) => {
  const theme = useContext<{ backgroundColor?: string; color?: string }>(themeContext);

  return (
    <View style={[styles.contentContainer, { borderBottomColor: theme.color }]}>
      <View style={styles.contentItem}>
        <View>
          <Text style={[{ color: theme.color, paddingLeft: 10 }]}>
            {!cash.title ? 'Head title' : cash.title}
          </Text>
          <Text style={[styles.subTitle]}>${cash.count}</Text>
        </View>
      </View>
    </View>
  );
};

export default CashBar;
