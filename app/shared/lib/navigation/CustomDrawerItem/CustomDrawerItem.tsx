/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import React, { useContext } from 'react';
import { TouchableOpacity, Text, View, Image, ImageBackground } from 'react-native';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import themeContext from 'shared/lib/context/themeContext';

// import SignIn from 'pages/SignIn/components/SignIn/SignIn';
// import SignUp from 'pages/SignUp/components/SignUp/SignUp';

const CustomDrawerContent = (props) => {
  const theme = useContext<{ backgroundColor?: string; color?: string }>(themeContext);

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
            John Doe
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
              Tell a Friend
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
              Sign Out
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomDrawerContent;
