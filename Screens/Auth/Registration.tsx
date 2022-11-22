import React from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'
import { color } from 'react-native-reanimated'

import colors from '../../styles/projectStyle'


const Registration = () => {
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
        justifyContent: 'center'
    },
    registrationBoxItem: {
        fontSize: 20,
        tintColor:  colors.colors.white,
        marginBottom: 15
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
        fontWeight: '400'
    },
})

export default Registration