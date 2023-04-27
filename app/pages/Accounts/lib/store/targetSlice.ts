import { createSlice } from '@reduxjs/toolkit';

import type { ITarget } from '../types/interfaces';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState: ITarget[] = [];

export const targetSlice = createSlice({
  name: 'target',
  initialState,
  reducers: {
    handleAddTargetCount: (state, action: PayloadAction<{ title: string; count: number }>) => {
      state.push({
        index: `1_${Math.random() * 100}`,
        title: action.payload.title,
        count: action.payload.count,
      });
    },
    handleDeleteTargetCount: (state, action: PayloadAction<{ index: string }>) =>
      state.filter((item) => item.index !== action.payload.index),
    handleChangeTargetTitle: (state, action: PayloadAction<{ index: string; title: string }>) => {
      const countToChange = state.find((count) => count.index === action.payload.index);
      countToChange!.title = action.payload.title;
      return state;
    },
    handleChangeTargetCount: (state, action: PayloadAction<{ index: string; count: number }>) => {
      const countToChange = state.find((count) => count.index === action.payload.index);
      countToChange!.count = action.payload.count;
      return state;
    },
    handleDecreaseTargetCount: (state, action: PayloadAction<{ index: string; count: number }>) => {
      const countToChange = state.find((count) => count.index === action.payload.index);
      if (countToChange!.count !== 0 && countToChange!.count >= action.payload.count) {
        countToChange!.count = countToChange!.count - action.payload.count;
        return state;
      }
      return state;
    },
  },
});

export const targetReducers = targetSlice.reducer;
export const targetActions = targetSlice.actions;
