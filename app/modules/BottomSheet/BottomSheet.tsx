import React, { forwardRef, useCallback, useContext, useImperativeHandle } from 'react';
import { Dimensions, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import themeContext from 'shared/lib/context/themeContext';

import { styles } from './BottomSheet.styles';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const MAX_TRANSLATE_Y = -SCREEN_HEIGHT + 50;

type BottomSheetProps = {
  children?: React.ReactNode;
};

export type BottomSheetRefProps = {
  scrollTo: (destination: number) => void;
  isActive: () => boolean;
};

const BottomSheet = forwardRef<BottomSheetRefProps, BottomSheetProps>(
  ({ children }, bottomSheetRef) => {
    const theme = useContext<{ backgroundColor?: string; color?: string }>(themeContext);

    const translateY = useSharedValue(0);
    const active = useSharedValue(false);

    const scrollTo = useCallback((destination: number) => {
      'worklet';
      active.value = destination !== 0;

      translateY.value = withSpring(destination, { damping: 50 });
    }, []);

    const isActive = useCallback(() => active.value, []);

    useImperativeHandle(bottomSheetRef, () => ({ scrollTo, isActive }), [scrollTo, isActive]);

    const context = useSharedValue({ y: 0 });
    const gesture = Gesture.Pan()
      .onStart(() => {
        context.value = { y: translateY.value };
      })
      .onUpdate((event) => {
        translateY.value = event.translationY + context.value.y;
        translateY.value = Math.max(translateY.value, MAX_TRANSLATE_Y);
      })
      .onEnd(() => {
        if (translateY.value > -SCREEN_HEIGHT / 1.5) {
          scrollTo(0);
        }
      });

    const rBottomSheetStyle = useAnimatedStyle(() => {
      const borderRadius = interpolate(
        translateY.value,
        [MAX_TRANSLATE_Y + 50, MAX_TRANSLATE_Y],
        [25, 5],
        Extrapolate.CLAMP
      );

      return {
        borderRadius,
        transform: [{ translateY: translateY.value }],
      };
    });

    return (
      <GestureDetector gesture={gesture}>
        <Animated.View
          style={[
            styles.bottomSheetContainer,
            rBottomSheetStyle,
            {
              backgroundColor: theme.backgroundColor,
              borderTopColor: theme.color,
            },
          ]}>
          <View style={styles.line} />
          {children}
        </Animated.View>
      </GestureDetector>
    );
  }
);

BottomSheet.displayName = 'BottomSheet';

export default BottomSheet;
