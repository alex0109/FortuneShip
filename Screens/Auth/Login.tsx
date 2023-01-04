import React from 'react'
import { View, Text, TextInput, Button, Pressable, StyleSheet } from 'react-native'

import customStyles from '../../styles/projectStyle'

const Login = ({navigation} :{navigation:any}) => {
  return (
    <View style={styles.registration}>
        <View style={styles.registrationTitle}>
            <Text style={[styles.mainText, styles.title]}>Login</Text>
        </View>
        <View style={styles.registrationBox}>
            <TextInput style={[styles.mainText, styles.registrationBoxItem ]} placeholder='Email' placeholderTextColor={customStyles.colors.gray}/>
            <TextInput style={[styles.mainText, styles.registrationBoxItem ]} placeholder='Password' placeholderTextColor={customStyles.colors.gray}/>
        </View>
        <View style={styles.registrationLinks}>
            <Pressable onPress={() => navigation.navigate("Main tab")}>
                <Text style={[styles.mainText, styles.h2Text]}>Login</Text>
            </Pressable>
            <Pressable onPress={() => navigation.navigate("Registration drawer")}>
                <Text style={[styles.mainText, styles.loginText]}>Create account</Text>
            </Pressable>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
  registration: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: customStyles.colors.blackMain
  },
  registrationTitle: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center'
  },
  registrationBox: {
      flex: 1,
      width: '40%',
      justifyContent: 'center'
  },
  registrationBoxItem: {
      fontSize: 18,
      tintColor:  customStyles.colors.gray,
      marginBottom: 15,
      borderBottomWidth: 1,
      borderBottomColor: customStyles.colors.white

  },
  registrationLinks: {
      flex: 1
  },
  mainText: {
      color: customStyles.colors.white,
      fontFamily: 'Assistant'
  },
  title: {
      fontSize: 35,
      fontWeight: '800'
  },
  h2Text: {
      fontSize: 20,
      marginBottom: 30,
      fontWeight: '400',
      textAlign: 'center'
  },
  loginText: {
      fontSize: 16,
      textAlign: 'center'
  }
})

export default Login