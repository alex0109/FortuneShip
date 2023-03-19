import { mix } from '@shopify/react-native-skia';

import type { IPoint } from '../types/types';
import type { SkiaMutableValue } from '@shopify/react-native-skia';
import type { SharedValue } from 'react-native-reanimated';

export function moveBallInBezierCurve(
  points: IPoint[],
  progress: SharedValue<number>,
  x: SkiaMutableValue<number>,
  y: SkiaMutableValue<number>
) {
  //Calculate the coefficients based on where the ball currently is in the animation
  const cx = 3 * (points[1].x - points[0].x);
  const bx = 3 * (points[2].x - points[1].x) - cx;
  const ax = points[3].x - points[0].x - cx - bx;

  const cy = 3 * (points[1].y - points[0].y);
  const by = 3 * (points[2].y - points[1].y) - cy;
  const ay = points[3].y - points[0].y - cy - by;

  const t = progress.value;

  //Calculate new X & Y positions of ball
  const xt: number = ax * (t * t * t) + bx * (t * t) + cx * t + points[0].x;
  const yt: number = ay * (t * t * t) + by * (t * t) + cy * t + points[0].y;

  if (progress.value > 1) {
    progress.value = 1;
  }

  //We draw the ball to the canvas in the new location
  x.current = mix(progress.value, x.current, xt);
  y.current = mix(progress.value, y.current, yt);
}

////////////////////////////////////////////////

// const ballAnimatedValue = useRef(new Animated.Value(0)).current;

// export const move = () => {
//   Animated.timing(ballAnimatedValue, {
//     toValue: 1,
//     duration: 500,
//     useNativeDriver: true,
//   }).start();
// };

// export const positionTransform = (position: number) => {
//   const xVal = ballAnimatedValue.interpolate({
//     inputRange: [0, 1],
//     outputRange: [0, 0],
//   });

//   const yVal = ballAnimatedValue.interpolate({
//     inputRange: [0, 1],
//     outputRange: [0, 0],
//   });

//   const result = { transform: [{ translateX: xVal }, { translateY: yVal }] };

//   if (position === 0) {
//     // result.transform[0].translateX = 110;
//     result.transform[0].translateX = ballAnimatedValue.interpolate({
//       inputRange: [0, 1],
//       outputRange: [0, 110],
//     });
//     // result.transform[1].translateY = 5;
//     result.transform[1].translateY = ballAnimatedValue.interpolate({
//       inputRange: [0, 1],
//       outputRange: [0, 5],
//     });
//   }
//   if (position === 1) {
//     result.transform[0].translateX = ballAnimatedValue.interpolate({
//       inputRange: [0, 1],
//       outputRange: [0, 190],
//     });
//     result.transform[1].translateY = ballAnimatedValue.interpolate({
//       inputRange: [0, 1],
//       outputRange: [0, 5],
//     });
//   }
//   if (position === 2) {
//     result.transform[0].translateX = ballAnimatedValue.interpolate({
//       inputRange: [0, 1],
//       outputRange: [0, 260],
//     });
//     result.transform[1].translateY = ballAnimatedValue.interpolate({
//       inputRange: [0, 1],
//       outputRange: [0, 30],
//     });
//   }
//   if (position === 3) {
//     result.transform[0].translateX = ballAnimatedValue.interpolate({
//       inputRange: [0, 1],
//       outputRange: [0, 295],
//     });
//     result.transform[1].translateY = ballAnimatedValue.interpolate({
//       inputRange: [0, 1],
//       outputRange: [0, 100],
//     });
//   }
//   if (position === 4) {
//     result.transform[0].translateX = ballAnimatedValue.interpolate({
//       inputRange: [0, 1],
//       outputRange: [0, 295],
//     });
//     result.transform[1].translateY = ballAnimatedValue.interpolate({
//       inputRange: [0, 1],
//       outputRange: [0, 185],
//     });
//   }
//   if (position === 5) {
//     result.transform[0].translateX = ballAnimatedValue.interpolate({
//       inputRange: [0, 1],
//       outputRange: [0, 260],
//     });
//     result.transform[1].translateY = ballAnimatedValue.interpolate({
//       inputRange: [0, 1],
//       outputRange: [0, 260],
//     });
//   }
//   if (position === 6) {
//     result.transform[0].translateX = ballAnimatedValue.interpolate({
//       inputRange: [0, 1],
//       outputRange: [0, 190],
//     });
//     result.transform[1].translateY = ballAnimatedValue.interpolate({
//       inputRange: [0, 1],
//       outputRange: [0, 295],
//     });
//   }
//   if (position === 7) {
//     result.transform[0].translateX = ballAnimatedValue.interpolate({
//       inputRange: [0, 1],
//       outputRange: [0, 110],
//     });
//     result.transform[1].translateY = ballAnimatedValue.interpolate({
//       inputRange: [0, 1],
//       outputRange: [0, 295],
//     });
//   }
//   if (position === 8) {
//     result.transform[0].translateX = ballAnimatedValue.interpolate({
//       inputRange: [0, 1],
//       outputRange: [0, 40],
//     });
//     result.transform[1].translateY = ballAnimatedValue.interpolate({
//       inputRange: [0, 1],
//       outputRange: [0, 260],
//     });
//   }
//   if (position === 9) {
//     result.transform[0].translateX = ballAnimatedValue.interpolate({
//       inputRange: [0, 1],
//       outputRange: [0, 5],
//     });
//     result.transform[1].translateY = ballAnimatedValue.interpolate({
//       inputRange: [0, 1],
//       outputRange: [0, 185],
//     });
//   }
//   if (position === 10) {
//     result.transform[0].translateX = ballAnimatedValue.interpolate({
//       inputRange: [0, 1],
//       outputRange: [0, 5],
//     });
//     result.transform[1].translateY = ballAnimatedValue.interpolate({
//       inputRange: [0, 1],
//       outputRange: [0, 100],
//     });
//   }
//   if (position === 11) {
//     result.transform[0].translateX = ballAnimatedValue.interpolate({
//       inputRange: [0, 1],
//       outputRange: [0, 40],
//     });
//     result.transform[1].translateY = ballAnimatedValue.interpolate({
//       inputRange: [0, 1],
//       outputRange: [0, 30],
//     });
//   }

//   return result;
// };
