import React, { useContext } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';

import { colors } from 'shared/assets/styles/local.style';
import themeContext from 'shared/lib/context/themeContext';

import { styles } from './SignUp.styles';

import type { StackNavigationProp } from '@react-navigation/stack';
import type { FC } from 'react';
import type { RootStackParamList } from 'shared/lib/navigation/StackNavigator';

type SignUpScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ChartTab',
  'SignInDrawer'
>;

interface SignUpScreenProps {
  navigation: SignUpScreenNavigationProp;
}

const SignUp: FC<SignUpScreenProps> = ({ navigation }) => {
  const theme = useContext<{ backgroundColor?: string; color?: string }>(themeContext);

  return (
    <View style={[styles.registration, { backgroundColor: theme.backgroundColor }]}>
      <View style={[styles.registrationTitle]}>
        <Text style={[styles.title, { color: theme.color }]}>SignUp</Text>
      </View>
      <View style={[styles.registrationBox]}>
        <TextInput
          style={[
            styles.registrationBoxItem,
            { color: theme.color, borderBottomColor: theme.color },
          ]}
          placeholder='Name'
          placeholderTextColor={colors.gray}
        />
        <TextInput
          style={[
            styles.registrationBoxItem,
            { color: theme.color, borderBottomColor: theme.color },
          ]}
          placeholder='Email'
          placeholderTextColor={colors.gray}
        />
        <TextInput
          style={[
            styles.registrationBoxItem,
            { color: theme.color, borderBottomColor: theme.color },
          ]}
          placeholder='Password'
          placeholderTextColor={colors.gray}
        />
        <TextInput
          style={[
            styles.registrationBoxItem,
            { color: theme.color, borderBottomColor: theme.color },
          ]}
          placeholder='Confirm Password'
          placeholderTextColor={colors.gray}
        />
      </View>
      <View style={styles.registrationLinks}>
        <Pressable
          onPress={() => {
            navigation.navigate('ChartTab', { name: 'ChartTab' });
          }}>
          <Text style={[styles.h2Text, { color: theme.color }]}>Create account</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            navigation.navigate('SignInDrawer', { name: 'SignInDrawer' });
          }}>
          <Text style={[styles.loginText, { color: theme.color }]}>Login</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default SignUp;
