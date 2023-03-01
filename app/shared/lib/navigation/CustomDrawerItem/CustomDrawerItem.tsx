/* eslint-disable react/jsx-key */
import { Picker } from '@react-native-picker/picker';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import React, { useState, useContext } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';

import themeContext from 'shared/lib/context/themeContext';

import Currency from '../../../assets/images/currency-bl.svg';
import LoginBl from '../../../assets/images/login-bl.svg';
import Logout from '../../../assets/images/logout-bl.svg';

import { styles } from './CustomDrawerItem.styles';
// import SignIn from 'pages/SignIn/components/SignIn/SignIn';
// import SignUp from 'pages/SignUp/components/SignUp/SignUp';

function CustomDrawerContent(props) {
  const [selectedValue, setSelectedValue] = useState('Option1');
  const currencies = [
    { option: 'Гривна - UAH', value: 'UAH' },
    { option: 'Доллар - USD', value: 'USD' },
    { option: 'Евро - EUR', value: 'EUR' },
  ];
  const theme = useContext<{ backgroundColor?: string; color?: string }>(themeContext);
  return (
    <DrawerContentScrollView {...props}>
      <View style={[styles.main, { backgroundColor: theme.backgroundColor }]}>
        <TouchableOpacity onPress={() => props.navigation.navigate('SignUpDrawer')}>
          <Logout width={30} height={30} />
          <Text>SignUp</Text>
        </TouchableOpacity>
      </View>
      <View style={[styles.main, { backgroundColor: theme.backgroundColor }]}>
        <TouchableOpacity onPress={() => props.navigation.navigate('SignInDrawer')}>
          <LoginBl width={30} height={30} />
          <Text>SignIn</Text>
        </TouchableOpacity>
      </View>
      <View style={[styles.main, { backgroundColor: theme.backgroundColor }]}>
        <Currency width={30} height={30} />
      </View>
      <Picker
        selectedValue={selectedValue}
        onValueChange={(itemValue) => setSelectedValue(itemValue)}>
        {currencies.map((currency) => (
          <Picker.Item key={Math.random(1000, 0)} label={currency.option} value={currency.value} />
        ))}
      </Picker>
    </DrawerContentScrollView>
  );
}

export default CustomDrawerContent;
