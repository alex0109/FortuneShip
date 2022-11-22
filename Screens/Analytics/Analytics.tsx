import React from 'react'

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, Alert } from 'react-native'

import colors from '../../styles/projectStyle'

export default function Analytics() {

    

    return (
        <View style={styles.main}>
            <Text style={styles.mainText}>Analytics 3</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        backgroundColor: colors.colors.blackMain,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 10
    },
    mainText: {
        color: colors.colors.white,
        fontFamily: 'Assistant'
    },
    testText: {
        color: colors.colors.white,
        fontFamily: 'Assistant',
        fontWeight: '900'
    }
})