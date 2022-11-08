import React from 'react'

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, Alert } from 'react-native'

import projectStyle from '../../styles/projectStyle'

export default function Funds() {

    

    return (
        <React.Fragment>

            <View style={styles.title}>
                <Text style={[styles.mainText, styles.h1Text]}>
                    Free Funds
                </Text>
            </View>
            <View style={styles.content}>
                <View style={styles.contentItem}>
                    <Text style={[styles.mainText, styles.h2Text]}>Credit card 1</Text>
                    <Text style={[styles.mainText, styles.subTitle]}>$158</Text>
                </View>
                <View style={styles.contentItem}>
                    <Text style={[styles.mainText, styles.h2Text]}>Credit card 2</Text>
                    <Text style={[styles.mainText, styles.subTitle]}>$6831</Text>
                </View>
                <View style={styles.contentItem}>
                    <Text style={[styles.mainText, styles.h2Text]}>Cash</Text>
                    <Text style={[styles.mainText, styles.subTitle]}>$666</Text>
                </View>
            </View>

        </React.Fragment>
    )
}

const styles = StyleSheet.create({
    title: {
        flex: 1,
        backgroundColor: projectStyle.color.blackMain,
        alignItems: 'stretch',
        justifyContent: 'flex-start',
        paddingLeft: 35,
        marginTop: 30,
        marginBottom: 30 
    },
    content: {
        flex: 11,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    contentItem: {
        height: 50,
        width: '80%',
        marginBottom: 30,
        paddingLeft: 30,
        borderBottomWidth: 0.3,
        borderStyle: 'solid',
        borderBottomColor: projectStyle.color.gray
    },
    mainText: {
        color: projectStyle.color.white,
        fontFamily: 'Assistant'
    },
    h1Text: {
        fontSize: 27,
        fontWeight: '800'
    },
    h2Text: {
        fontSize: 20,
        fontWeight: '400'
    },
    subTitle: {
        paddingLeft: 10,
        color: projectStyle.color.success
    }
})