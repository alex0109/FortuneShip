import { createSlice } from '@reduxjs/toolkit';

import moment from 'moment';

import { makeid } from 'shared/lib/utils/generatorID';

import { getRandomColor } from './data';

import type { ICategory } from '../types/types';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState: ICategory[] = [
  {
    index: makeid(),
    title: 'Pets',
    count: 81,
    icon: 'ios-paw-outline',
    color: '#0E7FC0',
    percent: 0,
    history: [
      {
        date: moment().format('YYYY-05-27'),
        title: 'Pets',
        value: 1,
      },
      {
        date: moment().format('YYYY-MM-03'),
        title: 'Pets',
        value: 5,
      },
      {
        date: moment().format('YYYY-MM-15'),
        title: 'Pets',
        value: 80,
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
        title: 'Sport',
        value: 18,
      },
      {
        date: moment().format('YYYY-MM-07'),
        title: 'Sport',
        value: 18,
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
        title: 'Hammer',
        value: 36,
      },
      {
        date: moment().format('YYYY-MM-08'),
        title: 'Hammer',
        value: 7,
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
        title: 'Headset',
        value: 19,
      },
      {
        date: moment().format('YYYY-MM-10'),
        title: 'Headset',
        value: 2,
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
        title: 'Bicycle',
        value: 53,
      },
      {
        date: moment().format('YYYY-MM-12'),
        title: 'Bicycle',
        value: 10,
      },
      {
        date: moment().format('YYYY-MM-13'),
        title: 'Bicycle',
        value: 5,
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
        title: 'Bus',
        value: 12,
      },
      {
        date: moment().format('YYYY-MM-22'),
        title: 'Bus',
        value: 1,
      },
      {
        date: moment().format('YYYY-MM-23'),
        title: 'Bus',
        value: 1,
      },
      {
        date: moment().format('YYYY-MM-24'),
        title: 'Bus',
        value: 1,
      },
      {
        date: moment().format('YYYY-MM-26'),
        title: 'Bus',
        value: 1,
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
        history: [],
      });
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
    handleTopUpCategory: (state, action: PayloadAction<{ index: string; value: number }>) => {
      const categoryToChange = state.find((count) => count.index === action.payload.index);
      categoryToChange!.count += action.payload.value;
      categoryToChange!.history.push({
        date: moment().format('YYYY-MM-DD'),
        title: categoryToChange!.title,
        value: action.payload.value,
      });
      return state;
    },
  },
});

export const categoriesReducer = categoriesSlice.reducer;
export const categoriesActions = categoriesSlice.actions;
