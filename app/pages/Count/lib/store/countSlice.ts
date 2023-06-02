import { createSlice } from '@reduxjs/toolkit';

import moment from 'moment';
import { makeid } from 'shared/lib/utils/generatorID';

import type { ICount } from '../types/interfaces';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState: ICount[] = [];

export const countSlice = createSlice({
  name: 'count',
  initialState,
  reducers: {
    handleAddCount: (state, action: PayloadAction<{ title: string }>) => {
      state.push({
        index: makeid(),
        title: action.payload.title,
        value: 0,
        history: [
          {
            date: moment().format('YYYY-MM-DD'),
            title: action.payload.title,
            value: 0,
          },
        ],
      });
    },
    handleDeleteCount: (state, action: PayloadAction<{ index: string }>) =>
      state.filter((item) => item.index !== action.payload.index),

    handleChangeCountTitle: (state, action: PayloadAction<{ index: string; title: string }>) => {
      const countToChange = state.find((count) => count.index === action.payload.index);
      countToChange!.title = action.payload.title;
      return state;
    },
    handleChangeCount: (state, action: PayloadAction<{ index: string; value: number }>) => {
      const countToChange = state.find((count) => count.index === action.payload.index);
      countToChange!.value = action.payload.value;
      return state;
    },
    handleTopUpCount: (state, action: PayloadAction<{ index: string; value: number }>) => {
      const countToChange = state.find((count) => count.index === action.payload.index);
      countToChange!.value = countToChange!.value + action.payload.value;
      countToChange!.history.push({
        date: moment().format('YYYY-MM-DD'),
        title: countToChange!.title,
        value: action.payload.value,
      });
      return state;
    },
    handleDecreaseCount: (state, action: PayloadAction<{ index: string; value: number }>) => {
      const countToChange = state.find((count) => count.index === action.payload.index);
      if (countToChange!.value !== 0 && countToChange!.value >= action.payload.value) {
        countToChange!.value = countToChange!.value - action.payload.value;
        return state;
      }
      return state;
    },
  },
});

export const countReducers = countSlice.reducer;
export const countActions = countSlice.actions;
