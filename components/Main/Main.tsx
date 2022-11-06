import React from 'react'

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, Alert } from 'react-native'
import { useFonts } from 'expo-font';

import projectStyle from '../../styles/projectStyle'

export default function Footer() {

    const [loaded] = useFonts({
        Assistant: require('../../assets/fonts/Assistant-Regular.ttf')
    });
    
    if (!loaded) {
        return null;
    }

    const createTwoButtonAlert = () =>
    Alert.alert(
      "Alert Title",
      "My Alert Msg",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ]
    );

    return (
        <View style={styles.main}>
            <Text style={styles.mainText}>Worlsdfsdfd</Text>
            <Text style={styles.testText}>Worlsdfsdfd</Text>
            <StatusBar style="auto" />
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