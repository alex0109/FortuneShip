import React, { useContext } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';

import { colors } from 'shared/assets/styles/local.style';
import themeContext from 'shared/lib/context/themeContext';



import { styles } from './SignIn.styles';

import type { StackNavigationProp } from '@react-navigation/stack';
import type { FC} from 'react';
import type { RootStackParamList } from 'shared/lib/navigation/StackNavigator';

type SignInScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ChartTab',
  'RegistrationDrawer'
>;

interface SignInScreenProps {
  navigation: SignInScreenNavigationProp;
}

const SignIn: FC<SignInScreenProps> = ({ navigation }) => {
  const theme = useContext<{ backgroundColor?: string; color?: string }>(themeContext);

  return (
    <View style={[styles.registration, { backgroundColor: theme.backgroundColor }]}>
      <View style={[styles.registrationTitle]}>
        <Text style={[styles.title, { color: theme.color }]}>SignIn</Text>
      </View>
      <View style={[styles.registrationBox]}>
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
      </View>
      <View style={styles.registrationLinks}>
        <Pressable onPress={() => { navigation.navigate('ChartTab', { name: 'ChartTab' }); }}>
          <Text style={[styles.h2Text, { color: theme.color }]}>Login</Text>
        </Pressable>
        <Pressable onPress={() => { navigation.navigate('SignUpDrawer', { name: 'SignUpDrawer' }); }}>
          <Text style={[styles.loginText, { color: theme.color }]}>Create account</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default SignIn;
