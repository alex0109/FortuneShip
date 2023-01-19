import React, { FC } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/StackNavigator';

import colors from '../../styles/local.styles';

type RegistrationScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'MainTab',
  'LoginDrawer'
>;

type RegistrationScreenProps = {
  navigation: RegistrationScreenNavigationProp;
};

const Registration: FC<RegistrationScreenProps> = ({ navigation }) => {
  return (
    <View style={styles.registration}>
      <View style={styles.registrationTitle}>
        <Text style={[styles.mainText, styles.title]}>Registration</Text>
      </View>
      <View style={styles.registrationBox}>
        <TextInput
          style={[styles.mainText, styles.registrationBoxItem]}
          placeholder='Name'
          placeholderTextColor={colors.colors.gray}
        />
        <TextInput
          style={[styles.mainText, styles.registrationBoxItem]}
          placeholder='Email'
          placeholderTextColor={colors.colors.gray}
        />
        <TextInput
          style={[styles.mainText, styles.registrationBoxItem]}
          placeholder='Password'
          placeholderTextColor={colors.colors.gray}
        />
        <TextInput
          style={[styles.mainText, styles.registrationBoxItem]}
          placeholder='Confirm Password'
          placeholderTextColor={colors.colors.gray}
        />
      </View>
      <View style={styles.registrationLinks}>
        <Pressable onPress={() => navigation.navigate('MainTab', { name: 'MainTab' })}>
          <Text style={[styles.mainText, styles.h2Text]}>Create account</Text>
        </Pressable>
        <Pressable onPress={() => navigation.navigate('LoginDrawer', { name: 'LoginDrawer' })}>
          <Text style={[styles.mainText, styles.loginText]}>Login</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Registration;

const styles = StyleSheet.create({
  registration: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.colors.blackMain,
  },
  registrationTitle: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  registrationBox: {
    flex: 1,
    width: '40%',
    justifyContent: 'center',
  },
  registrationBoxItem: {
    fontSize: 18,
    tintColor: colors.colors.gray,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.colors.white,
  },
  registrationLinks: {
    flex: 1,
  },
  mainText: {
    color: colors.colors.white,
    fontFamily: 'Assistant',
  },
  title: {
    fontSize: 35,
    fontWeight: '800',
  },
  h2Text: {
    fontSize: 20,
    marginBottom: 30,
    fontWeight: '400',
    textAlign: 'center',
  },
  loginText: {
    fontSize: 16,
    textAlign: 'center',
  },
});
