import React, { useState } from 'react'
import { StyleSheet, View, Text, ScrollView, Pressable } from 'react-native'

import projectStyle from '../../styles/projectStyle'

import FreeFund from './FreeFund'
import FreeTarget from './FreeTarget'

import Plus from '../../assets/images/plus.svg' 

interface INewFundRow {
    id: number,
    title: string,
    cash: number
}

interface INewFundRows extends Array<INewFundRow>{}


export default function Funds() {

    const [funds, setFunds] = useState<INewFundRows>([
        {id: 1, title: "Credit Card", cash: 380},
        {id: 2, title: "Credit Card 2", cash: 4252},
        {id: 3, title: "Cash", cash: 3280}
    ])

    const [targets, setTargets] = useState<INewFundRows>([
        {id: 1, title: "On new car", cash: 2356}
    ])

    const addFund = (): void => {
        setFunds([...funds, {id: Math.random() * 1000, title: "New Fund", cash: 0}])
    }

    const addTarget = (): void => {
        setTargets([...targets, {id: Math.random() * 1000, title: "New Target", cash: 0}])
    }

    const removeFund = (id: number): void => {
        setFunds(funds.filter(item => item.id !== id))
    }

    const removeTarget = (id: number): void => {
        setTargets(targets.filter(item => item.id !== id))
    }

    return (
        <React.Fragment>
            <ScrollView>
                <View style={styles.title}>
                    <Text style={[styles.mainText, styles.h1Text]}>
                        Available Funds
                    </Text>
                </View>
                {funds.length == 0 ? 
                    <View style={styles.noFundMessage}>
                        <Text style={[styles.mainText, styles.h2Text]}>
                            At the moment you have no funds...
                        </Text>
                        <Pressable onPress={() => addFund()}>
                            <Plus width={25} height={25} fill="white"/>
                        </Pressable>
                    </View> 
                    : 
                    <View style={styles.scroll}>
                        <View style={styles.content}>
                    
                            {funds.map(item => 
                                <FreeFund key={item.id} {...item} removeFund={removeFund}/>
                            )}
                            <Pressable onPress={() => addFund()}>
                                <Plus width={30} height={30} fill="white"/>
                            </Pressable>
                        </View>
                    </View>
                }
                <View style={styles.title}>
                    <Text style={[styles.mainText, styles.h1Text]}>
                        Targets
                    </Text>
                </View>
                {targets.length == 0 ? 
                    <View style={styles.noFundMessage}>
                        <Text style={[styles.mainText, styles.h2Text]}>
                            At the moment you have no targets...
                        </Text>
                        <Pressable onPress={() => addTarget()}>
                            <Plus width={25} height={25} fill="white"/>
                        </Pressable>
                    </View> 
                    : 
                    <View style={styles.scroll}>
                        <View style={styles.content}>
                    
                            {targets.map(item => 
                                <FreeTarget key={item.id} {...item} removeTarget={removeTarget}/>
                            )}
                            <Pressable onPress={() => addTarget()}>
                                <Plus width={30} height={30} fill="white"/>
                            </Pressable>
                        </View>
                    </View>
                }
            </ScrollView>
        </React.Fragment>
    )
}

const styles = StyleSheet.create({
    title: {
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'flex-start',
        paddingLeft: 35,
        marginTop: 30,
        marginBottom: 30
    },
    noFundMessage: {
        flex: 10,
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 10
    },
    scroll: {
        flex: 10
    },
    content: {
        flex: 11,
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginBottom: 30
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
        marginBottom: 30,
        fontWeight: '400'
    },
})