import { createSlice } from '@reduxjs/toolkit';

import { makeid } from '../helpers/helpers';

import { getRandomColor } from './data';

import type { ICategory } from '../types/types';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState: ICategory[] = [
  {
    index: makeid(),
    title: 'Architecture',
    count: 21,
    icon: 'ios-cafe-outline',
    color: '#E09B11',
    percent: 0,
    history: [
      {
        date: '2023-04-01',
        count: 21,
      },
    ],
  },
  {
    index: makeid(),
    title: 'Games',
    count: 54,
    icon: 'ios-game-controller-outline',
    color: '#CCD50F',
    percent: 0,
    history: [
      {
        date: '2023-04-02',
        count: 23,
      },
      {
        date: '2023-04-03',
        count: 31,
      },
    ],
  },
  {
    index: makeid(),
    title: 'Pets',
    count: 81,
    icon: 'ios-paw-outline',
    color: '#0E7FC0',
    percent: 0,
    history: [
      {
        date: '2023-04-03',
        count: 1,
      },
      {
        date: '2023-04-25',
        count: 80,
      },
    ],
  },
  {
    index: makeid(),
    title: 'Sport',
    count: 36,
    icon: 'ios-basketball-outline',
    color: '#C92AAE',
    percent: 0,
    history: [
      {
        date: '2023-04-04',
        count: 18,
      },
      {
        date: '2023-04-07',
        count: 18,
      },
    ],
  },
  {
    index: makeid(),
    title: 'Hammer',
    count: 43,
    icon: 'hammer-outline',
    color: '#8A46B0',
    percent: 0,
    history: [
      {
        date: '2023-04-06',
        count: 36,
      },
      {
        date: '2023-04-08',
        count: 7,
      },
    ],
  },
  {
    index: makeid(),
    title: 'Headset',
    count: 21,
    icon: 'headset-outline',
    color: '#0BD1C5',
    percent: 0,
    history: [
      {
        date: '2023-04-09T00:00:00Z',
        count: 19,
      },
      {
        date: '2023-04-10T00:00:00Z',
        count: 2,
      },
    ],
  },
  {
    index: makeid(),
    title: 'Bicycle',
    count: 68,
    icon: 'ios-bicycle-outline',
    color: '#0B6ED1',
    percent: 0,
    history: [
      {
        date: '2023-04-11T00:00:00Z',
        count: 53,
      },
      {
        date: '2023-04-12T00:00:00Z',
        count: 10,
      },
      {
        date: '2023-04-13T00:00:00Z',
        count: 5,
      },
    ],
  },
  {
    index: makeid(),
    title: 'Bus',
    count: 17,
    icon: 'bus-outline',
    color: '#E05311',
    percent: 0,
    history: [
      {
        date: '2023-04-21T00:00:00Z',
        count: 12,
      },
      {
        date: '2023-04-22T00:00:00Z',
        count: 1,
      },
      {
        date: '2023-04-23T00:00:00Z',
        count: 1,
      },
      {
        date: '2023-04-24T00:00:00Z',
        count: 1,
      },
      {
        date: '2023-04-26T00:00:00Z',
        count: 1,
      },
      {
        date: '2023-04-27T00:00:00Z',
        count: 1,
      },
    ],
  },
  {
    index: makeid(),
    title: 'Git',
    count: 0,
    icon: 'git-commit-outline',
    color: '#0BBCD1',
    percent: 0,
    history: [],
  },
  {
    index: makeid(),
    title: 'Gift',
    count: 98,
    icon: 'gift-outline',
    color: '#09BD0F',
    percent: 0,
    history: [
      {
        date: '2023-04-25T00:00:00Z',
        count: 98,
      },
    ],
  },
];

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    handleAddCategory: (state) => {
      state.push({
        index: makeid(),
        title: 'Tests',
        count: 100,
        icon: 'flask',
        color: getRandomColor(),
        percent: 0,
        history: [
          {
            date: '2000-02-01T05:00:00.000Z',
            count: 1,
          },
        ],
      });
      return state;
    },
    handleChangeCountCategory: (state, action: PayloadAction<{ index: string; count: number }>) => {
      const categoryToChange = state.find((item) => item.index === action.payload.index);
      categoryToChange!.count = action.payload.count;
      return state;
    },
    handleChangeCategoryTitle: (state, action: PayloadAction<{ index: string; title: string }>) => {
      const categoryToChange = state.find((count) => count.index === action.payload.index);
      categoryToChange!.title = action.payload.title;
      return state;
    },
  },
});

export const categoriesReducer = categoriesSlice.reducer;
export const categoriesActions = categoriesSlice.actions;
