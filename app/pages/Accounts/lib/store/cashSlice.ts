import { createSlice } from '@reduxjs/toolkit';

import type { ICash } from '../types/interfaces';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState: ICash[] = [];

export const cashSlice = createSlice({
  name: 'cash',
  initialState,
  reducers: {
    handleAddCashCount: (state, action: PayloadAction<{ title: string; count: number }>) => {
      state.push({
        index: `0_${Math.random() * 100}`,
        title: action.payload.title,
        count: action.payload.count,
      });
    },
    handleDeleteCashCount: (state, action: PayloadAction<{ index: string }>) =>
      state.filter((item) => item.index !== action.payload.index),

    handleChangeCashTitle: (state, action: PayloadAction<{ index: string; title: string }>) => {
      const countToChange = state.find((count) => count.index === action.payload.index);
      countToChange!.title = action.payload.title;
      return state;
    },
    handleChangeCashCount: (state, action: PayloadAction<{ index: string; count: number }>) => {
      const countToChange = state.find((count) => count.index === action.payload.index);
      countToChange!.count = action.payload.count;
      return state;
    },
    handleDecreaseCashCount: (state, action: PayloadAction<{ index: string; count: number }>) => {
      const countToChange = state.find((count) => count.index === action.payload.index);
      if (countToChange!.count !== 0 && countToChange!.count >= action.payload.count) {
        countToChange!.count = countToChange!.count - action.payload.count;
        return state;
      }
      return state;
    },
  },
});

export const cashReducers = cashSlice.reducer;
export const cashActions = cashSlice.actions;
