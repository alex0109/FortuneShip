import React from 'react'

import { StyleSheet, View, Text, Button } from 'react-native'

import customStyles from '../../styles/projectStyle'

//need to fix navigation safety
export default function Main({navigation}: {navigation: any}) {

    return (
        <View style={styles.main}>
            <Text style={styles.mainText}>Main 2</Text>
            <Button onPress={() => navigation.navigate("Funds tab")} title="Go to Funds Screen." />
        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        backgroundColor: customStyles.colors.blackMain,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 10
    },
    mainText: {
        color: customStyles.colors.white,
        fontFamily: 'Assistant'
    },
    testText: {
        color: customStyles.colors.white,
        fontFamily: 'Assistant',
        fontWeight: '900'
    }
})