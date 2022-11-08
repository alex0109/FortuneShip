import React from 'react'

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, Alert } from 'react-native'

import projectStyle from '../../styles/projectStyle'

export default function Analytics() {

    

    return (
        <View style={styles.main}>
            <Text style={styles.mainText}>Analytics 3</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        backgroundColor: projectStyle.color.blackMain,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 10
    },
    mainText: {
        color: projectStyle.color.white,
        fontFamily: 'Assistant'
    },
    testText: {
        color: projectStyle.color.white,
        fontFamily: 'Assistant',
        fontWeight: '900'
    }
})