import { createSlice } from '@reduxjs/toolkit';

import moment from 'moment';

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
        date: moment().format('YYYY-MM-01'),
        count: 2,
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
        date: moment().format('YYYY-MM-02'),
        count: 23,
      },
      {
        date: moment().format('YYYY-MM-03'),
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
        date: moment().format('YYYY-MM-03'),
        count: 1,
      },
      {
        date: moment().format('YYYY-MM-15'),
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
        date: moment().format('YYYY-MM-04'),
        count: 18,
      },
      {
        date: moment().format('YYYY-MM-07'),
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
        date: moment().format('YYYY-MM-06'),
        count: 36,
      },
      {
        date: moment().format('YYYY-MM-08'),
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
        date: moment().format('YYYY-MM-09'),
        count: 19,
      },
      {
        date: moment().format('YYYY-MM-10'),
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
        date: moment().format('YYYY-MM-11'),
        count: 53,
      },
      {
        date: moment().format('YYYY-MM-12'),
        count: 10,
      },
      {
        date: moment().format('YYYY-MM-13'),
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
        date: moment().format('YYYY-MM-21'),
        count: 12,
      },
      {
        date: moment().format('YYYY-MM-22'),
        count: 1,
      },
      {
        date: moment().format('YYYY-MM-23'),
        count: 1,
      },
      {
        date: moment().format('YYYY-MM-24'),
        count: 1,
      },
      {
        date: moment().format('YYYY-MM-26'),
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
        date: moment().format('YYYY-MM-25'),
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
        count: 0,
        icon: 'flask',
        color: getRandomColor(),
        percent: 0,
        history: [
          {
            date: moment().format('YYYY-MM-DD'),
            count: 1,
          },
        ],
      });
      return state;
    },
    handleDeleteCategory: (state, action: PayloadAction<{ index: string }>) =>
      state.filter((item) => item.index !== action.payload.index),
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
    handleTopUpCategory: (state, action: PayloadAction<{ index: string; count: number }>) => {
      const categoryToChange = state.find((count) => count.index === action.payload.index);
      categoryToChange!.count += action.payload.count;
      categoryToChange!.history.push({
        date: moment().format('YYYY-MM-DD'),
        count: action.payload.count,
      });
      return state;
    },
  },
});

export const categoriesReducer = categoriesSlice.reducer;
export const categoriesActions = categoriesSlice.actions;
