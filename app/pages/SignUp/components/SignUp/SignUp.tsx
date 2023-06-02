import React, { useContext } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { View, Text, TextInput, Pressable, TouchableOpacity } from 'react-native';

import { colors } from 'shared/assets/styles/local.style';
import i18n from 'shared/config/i18n/i18n';
import themeContext from 'shared/lib/context/themeContext';

import { styles } from './SignUp.styles';

import type { StackNavigationProp } from '@react-navigation/stack';
import type { IRegistrationFields } from 'pages/SignUp/lib/types/IFormFields';
import type { FC } from 'react';
import type { SubmitHandler } from 'react-hook-form';
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

  const {
    register,
    control,
    reset,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<IRegistrationFields>({
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<IRegistrationFields> = (data) => {
    navigation.navigate('ChartTab', { name: '' });
    reset();
    console.log(data);
  };

  return (
    <View style={[styles.registration, { backgroundColor: theme.backgroundColor }]}>
      <View style={[styles.registrationTitle]}>
        <Text style={[styles.title, { color: theme.color }]}>{i18n.t('SignUp')}</Text>
      </View>
      <View style={[styles.registrationBox]}>
        <Controller
          name='username'
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[
                styles.registrationBoxItem,
                { color: theme.color, borderBottomColor: theme.color },
              ]}
              {...register('username', {
                required: i18n.t('This field is required!')!,
                minLength: {
                  value: 5,
                  message: i18n.t('Your name is too short!'),
                },
              })}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder={i18n.t('Username')!}
              placeholderTextColor={colors.gray}
            />
          )}
        />
        {errors.username && <Text style={[{ color: colors.red }]}>{errors.username.message}</Text>}
        <Controller
          name='email'
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[
                styles.registrationBoxItem,
                { color: theme.color, borderBottomColor: theme.color },
              ]}
              {...register('email', {
                required: i18n.t('This field is required!')!,
                pattern: {
                  value:
                    // eslint-disable-next-line no-useless-escape
                    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: i18n.t('Its not an email!'),
                },
              })}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder={i18n.t('Email')!}
              placeholderTextColor={colors.gray}
            />
          )}
        />
        {errors.email && <Text style={[{ color: colors.red }]}>{errors.email.message}</Text>}
        <Controller
          name='password'
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[
                styles.registrationBoxItem,
                { color: theme.color, borderBottomColor: theme.color },
              ]}
              {...register('password', {
                required: i18n.t('This field is required!')!,
                minLength: {
                  value: 5,
                  message: i18n.t('Your password is too short!'),
                },
              })}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              secureTextEntry
              placeholder={i18n.t('Password')!}
              placeholderTextColor={colors.gray}
            />
          )}
        />
        {errors.password && <Text style={[{ color: colors.red }]}>{errors.password.message}</Text>}
        <Controller
          name='confpass'
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[
                styles.registrationBoxItem,
                { color: theme.color, borderBottomColor: theme.color },
              ]}
              {...register('confpass', {
                required: i18n.t('This field is required!')!,
                validate: (value) => {
                  const { password } = getValues();
                  return password === value || i18n.t('Passwords should match!')!;
                },
              })}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              secureTextEntry
              placeholder={i18n.t('Confirm Password')!}
              placeholderTextColor={colors.gray}
            />
          )}
        />
        {errors.confpass && <Text style={[{ color: colors.red }]}>{errors.confpass.message}</Text>}
      </View>
      <View style={styles.registrationLinks}>
        <TouchableOpacity onPress={handleSubmit(onSubmit)}>
          <Text style={[styles.authButton, { color: theme.color }]}>{i18n.t('Create account')}</Text>
        </TouchableOpacity>
        <Pressable
          onPress={() => {
            navigation.navigate('SignInStack', { name: 'SignInStack' });
          }}>
          <Text style={[styles.authButton, { color: theme.color }]}>{i18n.t('Login')}</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default SignUp;
