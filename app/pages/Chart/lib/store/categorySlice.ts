import { createSlice } from '@reduxjs/toolkit';

import { makeid } from '../helpers/helpers';

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
        date: '2000-02-01T05:00:00.000Z',
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
        date: '2000-02-02T05:00:00.000Z',
        count: 23,
      },
      {
        date: '2000-02-03T05:00:00.000Z',
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
        date: '2000-02-03T05:00:00.000Z',
        count: 1,
      },
      {
        date: '2000-02-25T05:00:00.000Z',
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
        date: '2000-02-04T05:00:00.000Z',
        count: 18,
      },
      {
        date: '2000-02-07T05:00:00.000Z',
        count: 18,
      },
    ],
  },
  {
    index: makeid(),
    title: 'Transport',
    count: 43,
    icon: 'hammer-outline',
    color: '#8A46B0',
    percent: 0,
    history: [
      {
        date: '2000-02-06T05:00:00.000Z',
        count: 36,
      },
      {
        date: '2000-02-08T05:00:00.000Z',
        count: 7,
      },
    ],
  },
  {
    index: makeid(),
    title: 'Transport',
    count: 21,
    icon: 'headset-outline',
    color: '#0BD1C5',
    percent: 0,
    history: [
      {
        date: '2000-02-09T05:00:00.000Z',
        count: 19,
      },
      {
        date: '2000-02-10T05:00:00.000Z',
        count: 2,
      },
    ],
  },
  {
    index: makeid(),
    title: 'Transport',
    count: 68,
    icon: 'ios-bicycle-outline',
    color: '#0B6ED1',
    percent: 0,
    history: [
      {
        date: '2000-02-11T05:00:00.000Z',
        count: 53,
      },
      {
        date: '2000-02-12T05:00:00.000Z',
        count: 10,
      },
      {
        date: '2000-02-13T05:00:00.000Z',
        count: 5,
      },
    ],
  },
  {
    index: makeid(),
    title: 'Transport',
    count: 17,
    icon: 'bus-outline',
    color: '#E05311',
    percent: 0,
    history: [
      {
        date: '2000-02-21T05:00:00.000Z',
        count: 12,
      },
      {
        date: '2000-02-22T05:00:00.000Z',
        count: 1,
      },
      {
        date: '2000-02-23T05:00:00.000Z',
        count: 1,
      },
      {
        date: '2000-02-24T05:00:00.000Z',
        count: 1,
      },
      {
        date: '2000-02-26T05:00:00.000Z',
        count: 1,
      },
      {
        date: '2000-02-27T05:00:00.000Z',
        count: 1,
      },
    ],
  },
  {
    index: makeid(),
    title: 'Transport',
    count: 0,
    icon: 'git-commit-outline',
    color: '#0BBCD1',
    percent: 0,
    history: [],
  },
  {
    index: makeid(),
    title: 'Transport',
    count: 98,
    icon: 'gift-outline',
    color: '#09BD0F',
    percent: 0,
    history: [
      {
        date: '2000-02-25T05:00:00.000Z',
        count: 98,
      },
    ],
  },
];

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    handleAddCategory: (state, action: PayloadAction<ICategory>) => {
      state.push(action.payload);
    },
    handleChangeCountCategory: (state, action: PayloadAction<{ index: string; count: number }>) => {
      const itemToChange = state.find((item) => item.index === action.payload.index);
      itemToChange!.count = action.payload.count;
      return state;
    },
  },
});

export const categoriesReducer = categoriesSlice.reducer;
export const categoriesActions = categoriesSlice.actions;
