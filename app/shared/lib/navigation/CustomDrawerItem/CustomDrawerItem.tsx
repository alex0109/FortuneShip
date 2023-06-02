/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import Ionicons from '@expo/vector-icons/Ionicons';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity, Text, View, Image } from 'react-native';
import i18n from 'shared/config/i18n/i18n';

import themeContext from 'shared/lib/context/themeContext';

// import SignIn from 'pages/SignIn/components/SignIn/SignIn';
// import SignUp from 'pages/SignUp/components/SignUp/SignUp';

const CustomDrawerContent = (props) => {
  const theme = useContext<{ backgroundColor?: string; color?: string }>(themeContext);
  const {t, i18n} = useTranslation();
  return (
    <View style={{ flex: 1, padding: 0, marginTop: 0 }}>
      <DrawerContentScrollView {...props}>
        <View
          style={{
            padding: 20,
            backgroundColor: theme.backgroundColor,
            borderBottomWidth: 1,
            borderBottomColor: theme.color,
          }}>
          <Image
            source={require('../../../assets/images/user-profile.jpg')}
            style={{ height: 80, width: 80, borderRadius: 40, marginBottom: 10 }}
          />
          <Text
            style={{
              color: theme.color,
              fontSize: 18,
              fontFamily: 'Assistant',
              marginBottom: 5,
            }}>
            {i18n.t('John Doe')}
          </Text>
        </View>
        <View style={{ flex: 1, paddingTop: 10 }}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View
        style={{
          padding: 20,
          borderTopWidth: 1,
          borderTopColor: theme.color,
          backgroundColor: theme.backgroundColor,
        }}>
        <TouchableOpacity onPress={() => {}} style={{ paddingVertical: 15 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name='share-social-outline' size={22} color={theme.color} />
            <Text
              style={{
                fontSize: 15,
                fontFamily: 'Assistant',
                marginLeft: 5,
                color: theme.color,
              }}>
              {i18n.t('Tell a Friend')}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {i18n.language === 'en'? i18n.changeLanguage('uk')! : i18n.changeLanguage('en')!}} style={{ paddingVertical: 15 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name='language-outline' size={22} color={theme.color} />
            <Text
              style={{
                fontSize: 15,
                fontFamily: 'Assistant',
                marginLeft: 5,
                color: theme.color,
              }}>
              {i18n.t('Language')}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}} style={{ paddingVertical: 15 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name='exit-outline' size={22} color={theme.color} />
            <Text
              style={{
                fontSize: 15,
                fontFamily: 'Assistant',
                marginLeft: 5,
                color: theme.color,
              }}>
              {i18n.t('Sign Out')}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomDrawerContent;
