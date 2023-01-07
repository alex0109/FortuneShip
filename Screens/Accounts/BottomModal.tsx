import React, { useCallback, useEffect, useImperativeHandle } from 'react'
import { Dimensions, StyleSheet, TextInput, View, Pressable, Keyboard } from 'react-native'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, { Extrapolate, interpolate, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'
import { Cash, Target } from '../../store/types.js'

import customStyles from '../../styles/projectStyle.js'
import Down from '../../assets/images/remove.svg'
import Up from '../../assets/images/plus.svg'
import Trash from '../../assets/images/trash.svg'
import { ActionCreatorWithPayload } from '@reduxjs/toolkit'


const { height: SCREEN_HEIGHT } = Dimensions.get('window')

type BottomModalProps = {
    modalProps: Cash | Target;
    removeCashAccount: ActionCreatorWithPayload<{ index: number; }, "cash/removeCashAccount">;
    updateTitleCashAccount: ActionCreatorWithPayload<{ index: number; title: string; }, "cash/updateTitleCashAccount">;
    updateCountCashAccount: ActionCreatorWithPayload<{ index: number; count: number; }, "cash/updateCountCashAccount">;
    removeTargetAccount: ActionCreatorWithPayload<{ index: number; }, "targets/removeTargetAccount">;
    updateTitleTargetAccount: ActionCreatorWithPayload<{ index: number; title: string; }, "targets/updateTitleTargetAccount">,
    updateCountTargetAccount: ActionCreatorWithPayload<{ index: number; count: number; }, "targets/updateCountTargetAccount">,
}

export type BottomModalRefProps = {
    scrollTo: (destinition: number) => void;
    setActive: (active: boolean) => boolean;
}

const BottomModal = React.forwardRef<BottomModalRefProps, BottomModalProps>(
    ({
        modalProps, 
        removeCashAccount, 
        updateTitleCashAccount,
        updateCountCashAccount,
        removeTargetAccount, 
        updateTitleTargetAccount,
        updateCountTargetAccount
    }, ref ) => {

    let MAX_TRANSLATE_Y = -SCREEN_HEIGHT / 1.7;
    const translationY = useSharedValue(0);
    const context = useSharedValue({ y: 0 });
    let isActive = useSharedValue(false);

    const scrollTo = useCallback(( destinition: number ): void => {
        'worklet';

        if(destinition === 0) {
            isActive.value = false
        } else {
            isActive.value = true
        }

        translationY.value = withSpring(destinition);
    }, [])

    const setActive = useCallback((): boolean => {
        return isActive.value;
    }, [])

    const countHandleChange = (index: number, newCount: any): void => {
        newCount = Number(newCount)
        if(modalProps?.specify === 'cash') {
            updateCountCashAccount({index: index, count: newCount})
        } else if(modalProps?.specify === 'target') {
            updateCountTargetAccount({index: index, count: newCount})
        }
    }
    const titleHandleChange = (index: number, newTitle: string): void => {
        if(modalProps?.specify === 'cash') {
            updateTitleCashAccount({index: index, title: newTitle})
        } else if(modalProps?.specify === 'target') {
            updateTitleTargetAccount({index: index, title: newTitle})
        }
    }

    const removeModalHandler = (index: number) => {
        if(modalProps?.specify === 'cash') {
            removeCashAccount({index: index})
            scrollTo(0)
        } else if(modalProps?.specify === 'target') {
            removeTargetAccount({index: index})
            scrollTo(0)
        }
    }

    useImperativeHandle(ref, () => ({ scrollTo, setActive }), [scrollTo, setActive])

    const gesture = Gesture.Pan()
    .onStart(() => {
        context.value = { y: translationY.value };
    })
    .onUpdate((event) => {
        translationY.value = event.translationY + context.value.y;
        translationY.value = Math.max(translationY.value, MAX_TRANSLATE_Y)
    })
    .onEnd(() => {
        if(translationY.value > -SCREEN_HEIGHT / 3) {
            scrollTo(0)
        }
    })

    const rBottomModalStyle = useAnimatedStyle(() => {

        const borderRadius = interpolate(
            translationY.value, 
            [MAX_TRANSLATE_Y + 50, MAX_TRANSLATE_Y], 
            [25, 5],
            Extrapolate.CLAMP
        )

        return {
            borderRadius,
            transform: [{translateY: translationY.value}]
        }
    })

  return (
    <React.Fragment>
        <GestureDetector gesture={gesture}>
            <Animated.View style={[styles.bottomModalContainer, rBottomModalStyle]}>
                <View style={[styles.modalCountContainer]}>
                    <TextInput 
                        style={[styles.modalTitle]}
                        defaultValue={!modalProps.title ? 'Head title' : modalProps.title}
                        onFocus={() => scrollTo(MAX_TRANSLATE_Y)}
                        onChangeText={(input) => titleHandleChange(modalProps.index, input)}
                        placeholder='Your title...'
                        placeholderTextColor={customStyles.colors.gray}/>
                    <TextInput 
                        style={[styles.modalCountText]} 
                        defaultValue={`${modalProps.count}`} 
                        onFocus={() => scrollTo(MAX_TRANSLATE_Y)}
                        onChangeText={(input) => countHandleChange(modalProps.index, input)}
                        keyboardType='numeric' 
                        placeholder='Your capital...'
                        placeholderTextColor={customStyles.colors.gray}/>
                    <View style={[styles.modalButtonsContainer]}>
                        <Pressable onPress={() => removeModalHandler(modalProps.index)}>
                            <Trash width={60} height={60} fill='black'/>
                        </Pressable>
                        <Pressable>
                            <Up width={60} height={60} fill='green'/>
                        </Pressable>
                        <Pressable>
                            <Down width={60} height={60} fill='red'/>
                        </Pressable>
                    </View>
                </View>
            </Animated.View>
        </GestureDetector>
    </React.Fragment>
  )
});

const styles = StyleSheet.create({
    bottomModalContainer: {
        height: SCREEN_HEIGHT,
        width: '100%',
        backgroundColor: customStyles.colors.blackBar,
        position: 'absolute',
        top: SCREEN_HEIGHT,
        borderRadius: 25,
        padding: 15
    },
    modalTitle: {
        justifyContent: 'center',
        textAlign: 'center',
        fontSize: 28,
        color: customStyles.colors.white,
        fontWeight: 'bold'
    },
    modalCountContainer: {
        height: '40%',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    modalButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        width: '100%'
    },
    modalCountText: {
        textAlign: 'center',
        marginBottom: 25,
        fontSize: 20,
        color: customStyles.colors.white,
        borderBottomWidth: 1,
        borderBottomColor: customStyles.colors.white
    }
})

export default BottomModal
