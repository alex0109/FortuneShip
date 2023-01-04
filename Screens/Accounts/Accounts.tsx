import React, { useCallback, useRef, useState } from 'react'
import { StyleSheet, View, Text, ScrollView, Pressable, TouchableOpacity, TextInput } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import CashAccount from './CashAccount'
import TargetAccount from './TargetAccount'
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { Cash, Target } from '../../store/types';

import customStyles from '../../styles/projectStyle'
import Plus from '../../assets/images/plus.svg' 
import BottomModal, { BottomModalRefProps } from './BottomModal';

export default function Accounts() {

    const { addCashAccount, addTargetAccount } = useActions()
    const { cash, targets } = useTypedSelector(state => state)

    const cashExample: Cash = {
        index: Math.random() * 1000 - 1,
        title: 'Redux toolkit top',
        count: 2000,
        specify: 'cash'
    }

    const targetExample: Target = {
        index: Math.random() * 1000 - 1,
        title: 'Redux toolkit top',
        count: 2000,
        specify: 'target'
    }

    const ref = useRef<BottomModalRefProps>(null)
    const [modalProps, setModalProps] = useState<Cash | Target>(cash[0])

    const handleModalOpen = useCallback(<T extends Cash | Target>(item: T) => {

        if(item !== undefined){
            setModalProps({...item});
            console.log(item);
        }

        let setActive = ref?.current?.setActive(true);
        if(setActive) {
            ref?.current?.scrollTo(0)
            ref?.current?.setActive(false)
        } else {
            ref?.current?.scrollTo(-200)
            ref?.current?.setActive(true)
        }

    }, [])

    return (
        <GestureHandlerRootView style={{flex: 1}}>
            <ScrollView style={styles.funds}>
                <View style={styles.title}>
                    <Text style={[styles.mainText, styles.h1Text]}>
                        Available Funds
                    </Text>
                    <TextInput placeholder='Tetx'/>
                </View>
                {cash.length == 0 ? 
                    <View style={styles.noFundMessage}>
                        <Text style={[styles.mainText, styles.h2Text]}>
                            At the moment you have no funds...
                        </Text>
                        <Pressable onPress={() => addCashAccount(cashExample)}>
                            <Plus width={30} height={30} fill="white"/>
                        </Pressable>
                    </View> 
                    : 
                    <View style={styles.scroll}>
                        <View style={styles.content}>
                            {cash.map(item => 
                                <TouchableOpacity key={item.index} onPress={() => handleModalOpen(item)}>
                                    <CashAccount key={item.index} {...item}/>
                                </TouchableOpacity>
                            )}
                            <Pressable onPress={() => addCashAccount(cashExample)}>
                                <Plus width={30} height={30} fill='white'/>
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
                        <Pressable onPress={() => addTargetAccount(targetExample)}>
                            <Plus width={30} height={30} fill="white"/>
                        </Pressable>
                    </View> 
                    : 
                    <View style={styles.scroll}>
                        <View style={styles.content}>
                    
                            {targets.map(item => 
                                <TouchableOpacity key={item.index} onPress={() => handleModalOpen(item)}>
                                   <TargetAccount key={item.index} {...item}/> 
                                </TouchableOpacity>
                            )}
                            <Pressable onPress={() => addTargetAccount(targetExample)}>
                                <Plus width={30} height={30} fill='white'/>
                            </Pressable>
                        </View>
                    </View>
                }
            </ScrollView>
            <BottomModal modalProps={modalProps} ref={ref}/>
        </GestureHandlerRootView>
    )
}

const styles = StyleSheet.create({
    button: {
        height: 50,
        borderRadius: 25,
        aspectRatio: 1,
        backgroundColor: 'white',
        opacity: 0.6,
    },
    funds: {
        backgroundColor: customStyles.colors.blackMain
    },
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
        color: customStyles.colors.white,
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