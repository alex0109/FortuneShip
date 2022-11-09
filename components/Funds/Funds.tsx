import React, { useState } from 'react'
import { StyleSheet, View, Text, ScrollView, Pressable } from 'react-native'

import projectStyle from '../../styles/projectStyle'
import Plus from '../../assets/images/plus.svg' 
import Remove from '../../assets/images/remove.svg' 

export default function Funds() {

    const [funds, setFund] = useState([
        {id: 1, title: "Credit Card", cash: 380},
        {id: 2, title: "Credit Card 2", cash: 4252},
        {id: 3, title: "Cash", cash: 3280}
    ])

    const addFund = () => {
        setFund([...funds, {id: Math.random() * 1000, title: "New Fund", cash: 0}])
    }

    const removeFund = (id: number) => {
        setFund(funds.filter(item => item.id !== id))
    }

    return (
        <React.Fragment>
            <ScrollView style={styles.scroll}>
                <View style={styles.title}>
                    <Text style={[styles.mainText, styles.h1Text]}>
                        Available Funds
                    </Text>
                </View>
                <View style={styles.content}>
                    
                    {funds.map(item => 
                        <>
                            <View style={styles.contentItem} key={item.id}>
                                <Text style={[styles.mainText, styles.h2Text]}>{item.title}</Text>
                                <Text style={[styles.mainText, styles.subTitle]}>${item.cash}</Text>
                            </View>
                            <Pressable onPress={() => removeFund(item.id)}>
                                <Remove width={30} height={30} fill="red"/>
                            </Pressable>
                        </>
                        
                    )}
                    <Pressable onPress={() => addFund()}>
                        <Plus width={30} height={30} fill="white"/>
                    </Pressable>
                </View>
            </ScrollView>
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
    scroll: {
        marginBottom: 0
    },
    content: {
        flex: 11,
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginBottom: 30
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