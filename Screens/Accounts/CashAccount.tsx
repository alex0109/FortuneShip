import React from 'react'
import { View, Text, Pressable, StyleSheet } from 'react-native'
import { Cash } from '../../store/types'

import customStyles from '../../styles/projectStyle'
import Remove from '../../assets/images/remove.svg' 
import Money from '../../assets/images/money2.svg' 


export default function CashAccount(cash: Cash) {
  return (
    <View style={styles.contentContainer}>
        <View style={styles.contentItem}>
            <Money width={30} height={30} fill="white"/>
            <View>
                <Text style={[styles.mainText]}>{cash.title}</Text>
                <Text style={[styles.mainText, styles.subTitle]}>${cash.count}</Text>
            </View>
        </View>
    </View>
  ) 
}

const styles = StyleSheet.create({
    contentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        width: '80%',
        marginBottom: 30,
        borderBottomWidth: 0.3,
        borderStyle: 'solid',
        borderBottomColor: customStyles.colors.gray
    },
    contentItem: {
        flexDirection: 'row',
        width: '100%'
    },
    mainText: {
        color: customStyles.colors.white,
        fontFamily: 'Assistant',
        paddingLeft: 10
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
        color: customStyles.colors.success
    }
})
