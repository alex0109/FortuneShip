import { createSlice } from '@reduxjs/toolkit';

import moment from 'moment';
import { makeid } from 'shared/lib/utils/generatorID';

import type { ITarget } from '../types/interfaces';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState: ITarget[] = [
  {
    index: makeid(),
    title: 'Chevrolet',
    value: 10000,
    target: 50000,
    history: [
      {
        date: moment().format('YYYY-MM-21'),
        value: 5000,
      },
      {
        date: moment().format('YYYY-MM-26'),
        value: 5000,
      },
    ],
  },
  {
    index: makeid(),
    title: 'Flat',
    value: 412,
    target: 532124,
    history: [
      {
        date: moment().format('YYYY-MM-14'),
        value: 412,
      },
    ],
  },
  {
    index: makeid(),
    title: 'Air jordan 1 Retro',
    value: 183,
    target: 500,
    history: [
      {
        date: moment().format('YYYY-MM-19'),
        value: 183,
      },
    ],
  },
];

export const targetSlice = createSlice({
  name: 'target',
  initialState,
  reducers: {
    handleAddTarget: (state, action: PayloadAction<{ title: string; target: number }>) => {
      state.push({
        index: makeid(),
        title: action.payload.title,
        value: 0,
        target: action.payload.target,
        history: [],
      });
    },
    handleDeleteTarget: (state, action: PayloadAction<{ index: string }>) =>
      state.filter((item) => item.index !== action.payload.index),
    handleChangeTargetTitle: (state, action: PayloadAction<{ index: string; title: string }>) => {
      const targetToChange = state.find((target) => target.index === action.payload.index);
      targetToChange!.title = action.payload.title;
      return state;
    },
    handleChangeTarget: (state, action: PayloadAction<{ index: string; target: number }>) => {
      const targetToChange = state.find((count) => count.index === action.payload.index);
      targetToChange!.target = action.payload.target;
      return state;
    },
    handleChangeTargetValue: (state, action: PayloadAction<{ index: string; value: number }>) => {
      const targetToChange = state.find((count) => count.index === action.payload.index);
      targetToChange!.value = action.payload.value;
      return state;
    },
    handleTopUpTargetValue: (state, action: PayloadAction<{ index: string; value: number }>) => {
      const targetToChange = state.find((count) => count.index === action.payload.index);
      targetToChange!.value = targetToChange!.value + action.payload.value;
      targetToChange!.history.push({
        date: moment().format('YYYY-MM-DD'),
        value: action.payload.value,
      });
      return state;
    },
    handleDecreaseTargetValue: (state, action: PayloadAction<{ index: string; value: number }>) => {
      const targetToChange = state.find((target) => target.index === action.payload.index);
      if (targetToChange!.value !== 0 && targetToChange!.value >= action.payload.value) {
        targetToChange!.value = targetToChange!.value - action.payload.value;
        return state;
      }
      return state;
    },
  },
});

export const targetReducers = targetSlice.reducer;
export const targetActions = targetSlice.actions;
