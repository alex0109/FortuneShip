import React, { useContext } from 'react';
import { View, Text, StatusBar, StyleSheet } from 'react-native';

import themeContext from 'shared/lib/context/themeContext';

import type { FC, ReactNode } from 'react';

interface TitleProps {
  children: ReactNode;
}

const Title: FC<TitleProps> = ({ children }) => {
  const theme = useContext<{ backgroundColor?: string; color?: string }>(themeContext);

  return (
    <View style={[styles.container]}>
      <StatusBar />
      <Text
        style={[
          styles.title,
          {
            color: theme.color,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

export default Title;

const styles = StyleSheet.create({
  container: {
    paddingLeft: 25,
    marginTop: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 27,
    fontFamily: 'AssistantBold',
  },
});
