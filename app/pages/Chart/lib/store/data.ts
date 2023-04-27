import { makeid } from '../helpers/helpers';

import type { ICategory } from '../types/types';

export const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export const mockCat: ICategory = {
  index: makeid(),
  title: 'Tests',
  count: 1,
  icon: 'flask',
  color: getRandomColor(),
  percent: 0,
  history: [
    {
      date: '2000-02-01T05:00:00.000Z',
      count: 1,
    },
  ],
};
