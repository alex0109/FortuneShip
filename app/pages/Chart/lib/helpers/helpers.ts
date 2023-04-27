import { Dimensions } from 'react-native';

import { type SharedValue } from 'react-native-reanimated';

import type { ICategory, IPoint } from '../types/types';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export function getCoordinatesForIndex(index: number, length: number) {
  const radius = (SCREEN_WIDTH * 0.8) / 2;
  const angleBetweenItems = 360 / length;
  const angle = angleBetweenItems * index;
  const x = Math.round(radius * Math.cos((angle * Math.PI) / 180));
  const y = Math.round(radius * Math.sin((angle * Math.PI) / -180));
  return { x, y };
}

export function getPercantageForCategory(categories: ICategory[]) {
  const totalCount = categories.map((item) => item.count).reduce((a, b) => a + b, 0);

  const output = categories.map((item) => ({ ...item, percent: item.count / totalCount }));

  return output;
}

export function moveBallInBezierCurve(points: IPoint[], progress: SharedValue<number>) {
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
  // x.current = mix(progress.value, x.current, xt);
  // y.current = mix(progress.value, y.current, yt);
  return { x: xt, y: yt };
}

export function makeid() {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < 24) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}
