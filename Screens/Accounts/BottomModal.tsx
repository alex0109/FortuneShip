import React, { useCallback, useEffect, useImperativeHandle } from 'react'
import { Dimensions, StyleSheet, Text, TextInput, View, Pressable } from 'react-native'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, { Extrapolate, interpolate, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'
import { useActions } from '../../hooks/useActions.js'
import { Cash, Target } from '../../store/types.js'

import customStyles from '../../styles/projectStyle.js'
import Down from '../../assets/images/remove.svg'
import Up from '../../assets/images/plus.svg'
import Trash from '../../assets/images/trash.svg'


const { height: SCREEN_HEIGHT } = Dimensions.get('window')

type BottomModalProps = {
    modalProps: Cash | Target;
}

export type BottomModalRefProps = {
    scrollTo: (destinition: number) => void;
    setActive: (active: boolean) => boolean;
}

const BottomModal = React.forwardRef<BottomModalRefProps, BottomModalProps>(( {modalProps}, ref ) => {

    let MAX_TRANSLATE_Y = -SCREEN_HEIGHT / 1.7
    const translationY = useSharedValue(0)
    const context = useSharedValue({ y: 0 })
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

    const countHandleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        if(modalProps?.specify === 'cash') {
            
        } else if(modalProps?.specify === 'target') {
            
        }
    }
    const titleHandleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {}

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

    useEffect(() => {
        if(modalProps === undefined || isActive.value === false) {
            scrollTo( 0 )
        } else {
            scrollTo( -SCREEN_HEIGHT / 3 )
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
                <Text style={[styles.modalTitle]}>{modalProps?.title}</Text>
                <View style={[styles.modalCountContainer]}>
                    <TextInput 
                    style={[styles.modalCountText]} 
                    defaultValue={`${modalProps?.count}`} 
                    onChangeText={() => countHandleChange}
                    keyboardType='numeric' 
                    placeholder='Your capital...'/>
                </View>
                <View style={[styles.modalButtonsContainer]}>
                    <Pressable>
                        <Trash width={60} height={60} fill='black'/>
                    </Pressable>
                    <Pressable>
                        <Up width={60} height={60} fill='green'/>
                    </Pressable>
                    <Pressable>
                        <Down width={60} height={60} fill='red'/>
                    </Pressable>
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
        height: '20%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        height: '15%'
    },
    modalCountText: {
        textAlign: 'center',
        fontSize: 20,
        color: customStyles.colors.white,
        borderBottomWidth: 1,
        borderBottomColor: customStyles.colors.white
    }
})

export default BottomModal
