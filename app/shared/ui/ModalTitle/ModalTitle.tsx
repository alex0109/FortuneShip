import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import themeContext from 'shared/lib/context/themeContext';

import type { FC, ReactNode } from 'react';

interface ModalTitleProps {
  children: ReactNode;
}

const ModalTitle: FC<ModalTitleProps> = ({ children }) => {
  const theme = useContext<{ backgroundColor?: string; color?: string }>(themeContext);
  return (
    <View>
      <Text style={[styles.title, { color: theme.color }]}>{children}</Text>
    </View>
  );
};

export default ModalTitle;

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    textAlign: 'center',
  },
});
