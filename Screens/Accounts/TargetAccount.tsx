import React from 'react'
import { View, Text, Pressable, StyleSheet } from 'react-native'
import { Target } from '../../store/types'

import customStyles from '../../styles/projectStyle'
import Remove from '../../assets/images/remove.svg' 
import TargetIcon from '../../assets/images/target.svg' 

export default function TargetAccount(target: Target) {
  return (
    <View style={styles.contentItem}>
        <View style={styles.leftItemContent}>
            <TargetIcon width={30} height={30} fill="white"/>
            <View>
                <Text style={[styles.mainText]}>{target.title}</Text>
                <Text style={[styles.mainText, styles.subTitle]}>${target.count}</Text>
            </View>
        </View>
        <Pressable style={[styles.rightContentItem]}>
            <Remove width={25} height={25} fill="red"/>
        </Pressable>
    </View>
  ) 
}

const styles = StyleSheet.create({
    contentItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 50,
        width: '80%',
        marginBottom: 30,
        borderBottomWidth: 0.3,
        borderStyle: 'solid',
        borderBottomColor: customStyles.colors.gray
    },
    leftItemContent: {
        flexDirection: 'row',
        width: '90%'
    },
    rightContentItem: {
        width: '10%'
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