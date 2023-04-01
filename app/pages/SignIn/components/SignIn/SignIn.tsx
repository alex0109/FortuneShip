import React, { useContext } from 'react';

import { useForm, Controller } from 'react-hook-form';

import { View, Text, TextInput, Pressable, Button, Alert, StyleSheet } from 'react-native';

import { colors } from 'shared/assets/styles/local.style';
import themeContext from 'shared/lib/context/themeContext';

import { styles } from './SignIn.styles';

import type { StackNavigationProp } from '@react-navigation/stack';
import type { FC } from 'react';
import type { RootStackParamList } from 'shared/lib/navigation/StackNavigator';

type SignInScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ChartTab',
  'SignUpDrawer'
>;

interface SignInScreenProps {
  navigation: SignInScreenNavigationProp;
}

const SignIn: FC<SignInScreenProps> = ({ navigation }) => {
  const theme = useContext<{ backgroundColor?: string; color?: string }>(themeContext);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data) => console.log(data);
  return (
    <View style={[styles.registration, { backgroundColor: theme.backgroundColor }]}>
      <View style={[styles.registrationTitle]}>
        <Text style={[styles.title, { color: theme.color }]}>SignIn</Text>
      </View>
      <View style={[styles.registrationBox]}>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[
                styles.registrationBoxItem,
                { color: theme.color, borderBottomColor: theme.color },
              ]}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder='Email'
              placeholderTextColor={colors.gray}
            />
          )}
          name='email'
        />
        {errors.email && <Text>This is required.</Text>}

        <Controller
          control={control}
          rules={{
            required: true,
            minLength: 8,
            maxLength: 60,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[
                styles.registrationBoxItem,
                { color: theme.color, borderBottomColor: theme.color },
              ]}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder='Password'
              secureTextEntry
              placeholderTextColor={colors.gray}
            />
          )}
          name='password'
        />
        {errors.password && <Text>This is required.</Text>}
      </View>
      <View style={styles.registrationLinks}>
        <Button
          title='Login'
          onPress={handleSubmit(onSubmit)}
          style={[styles.h2Text, { backgroundColor: theme.color }]}
        />
        <Button
          title='Login with Google'
          onPress={() => {
            navigation.navigate('SignUpDrawer', { name: 'SignUpDrawer' });
          }}
          color={'#ff4d4d'}
        />
        <Button
          title='Create account'
          onPress={() => {
            navigation.navigate('SignUpDrawer', { name: 'SignUpDrawer' });
          }}
        />
      </View>
    </View>
  );
};

export default SignIn;
