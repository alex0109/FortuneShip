import React, { useContext } from 'react';

import { useForm, Controller } from 'react-hook-form';

import { View, Text, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import { colors } from 'shared/assets/styles/local.style';
import i18n from 'shared/config/i18n/i18n';
import themeContext from 'shared/lib/context/themeContext';

import { styles } from './SignIn.styles';

import type { StackNavigationProp } from '@react-navigation/stack';
import type { ILoginFields } from 'pages/SignIn/lib/types/IFormFields';
import type { FC } from 'react';
import type { SubmitHandler } from 'react-hook-form';
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
    register,
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginFields>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<ILoginFields> = (data) => {
    navigation.navigate('ChartStack', { name: '' });
    reset();
    console.log(data);
  };
  return (
    <View style={[styles.registration, { backgroundColor: theme.backgroundColor }]}>
      <View style={[styles.registrationTitle]}>
        <Text style={[styles.title, { color: theme.color }]}>{i18n.t('SignIn')}</Text>
      </View>
      <SafeAreaView style={[styles.registrationBox]}>
        <Controller
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
          name='email'
        />
        {errors.email && <Text style={[{ color: colors.red }]}>{errors.email.message}</Text>}

        <Controller
          control={control}
          rules={{
            required: i18n.t('This field is required!')!,
            minLength: {
              value: 8,
              message: i18n.t('Your password is too short!'),
            },
            maxLength: {
              value: 10,
              message: i18n.t('Your password is too long!'),
            },
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
              placeholder={i18n.t('Password')!}
              secureTextEntry
              placeholderTextColor={colors.gray}
            />
          )}
          name='password'
        />
        {errors.password && <Text style={[{ color: colors.red }]}>{errors.password.message}</Text>}
      </SafeAreaView>
      <View style={styles.registrationLinks}>
        <TouchableOpacity onPress={handleSubmit(onSubmit)}>
          <Text style={[styles.authButton, { color: theme.color }]}>{i18n.t('Login')}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSubmit(onSubmit)}>
          <Text style={[styles.authButton, { color: '#ff4d4d' }]}>{i18n.t('Login with Google')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('SignUpDrawer', { name: '' });
          }}>
          <Text style={[styles.authButton, { color: theme.color }]}>{i18n.t('Create account')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignIn;
