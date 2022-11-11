import React from 'react'
import { View, Text, Pressable, StyleSheet } from 'react-native'

import Remove from '../../assets/images/remove.svg' 
import Target from '../../assets/images/target.svg' 

import projectStyle from '../../styles/projectStyle'

const Freetarget = ({...props}) => {
  return (
    <View style={styles.contentItem}>
        <View style={styles.leftItemContent}>
            <Target width={30} height={30} fill="white"/>
            <View>
                <Text style={[styles.mainText]}>{props.title}</Text>
                <Text style={[styles.mainText, styles.subTitle]}>${props.cash}</Text>
            </View>
        </View>
        <Pressable onPress={() => props.removeTarget(props.id)}>
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
        borderBottomColor: projectStyle.color.gray
    },
    leftItemContent: {
        flexDirection: 'row'
    },
    mainText: {
        color: projectStyle.color.white,
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
        color: projectStyle.color.success
    }
})

export default Freetarget