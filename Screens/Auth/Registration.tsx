import React from 'react'
import { View, Text, TextInput, Button, Pressable, StyleSheet } from 'react-native'
import { color } from 'react-native-reanimated'

import colors from '../../styles/projectStyle'


const Registration = ({navigation} :{navigation:any}) => {
  return (
    <View style={styles.registration}>
        <View style={styles.registrationTitle}>
            <Text style={[styles.mainText, styles.title]}>Registration</Text>
        </View>
        <View style={styles.registrationBox}>
            <TextInput style={[styles.mainText, styles.registrationBoxItem ]} placeholder='Name' placeholderTextColor={colors.colors.gray}/>
            <TextInput style={[styles.mainText, styles.registrationBoxItem ]} placeholder='Email' placeholderTextColor={colors.colors.gray}/>
            <TextInput style={[styles.mainText, styles.registrationBoxItem ]} placeholder='Password' placeholderTextColor={colors.colors.gray}/>
            <TextInput style={[styles.mainText, styles.registrationBoxItem ]} placeholder='Confirm Password' placeholderTextColor={colors.colors.gray}/>
        </View>
        <View style={styles.registrationLinks}>
            <Pressable onPress={() => navigation.navigate("Main tab")}>
                <Text style={[styles.mainText, styles.h2Text]}>Create account</Text>
            </Pressable>
            <Pressable onPress={() => navigation.navigate("Login drawer")}>
                <Text style={[styles.mainText, styles.loginText]}>Login</Text>
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
        backgroundColor: colors.colors.blackMain
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
        tintColor:  colors.colors.gray,
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: colors.colors.white

    },
    registrationLinks: {
        flex: 1
    },
    mainText: {
        color: colors.colors.white,
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

export default Registration