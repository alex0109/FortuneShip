import React, { FC, useContext } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/StackNavigator';

import themeContext from '../../config/themeContext';
import { colors } from '../../styles/local.style';
import { styles } from './auth.style';

type RegistrationScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'MainTab',
  'LoginDrawer'
>;

type RegistrationScreenProps = {
  navigation: RegistrationScreenNavigationProp;
};

const Registration: FC<RegistrationScreenProps> = ({ navigation }) => {
  const theme = useContext<{ backgroundColor?: string; color?: string }>(themeContext);

  return (
    <View style={[styles.registration, { backgroundColor: theme.backgroundColor }]}>
      <View style={[styles.registrationTitle]}>
        <Text style={[styles.title, { color: theme.color }]}>Registration</Text>
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
        <Pressable onPress={() => navigation.navigate('MainTab', { name: 'MainTab' })}>
          <Text style={[styles.h2Text, { color: theme.color }]}>Create account</Text>
        </Pressable>
        <Pressable onPress={() => navigation.navigate('LoginDrawer', { name: 'LoginDrawer' })}>
          <Text style={[styles.loginText, { color: theme.color }]}>Login</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Registration;
