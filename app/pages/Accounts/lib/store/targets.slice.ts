import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';
import type { ITarget, TargetState } from 'shared/lib/store/types';

const initialState: TargetState = [];

export const targetsSlice = createSlice({
  name: 'targets',
  initialState,
  reducers: {
    addTargetAccount: (state, action: PayloadAction<ITarget>) => {
      state.push(action.payload);
    },
    removeTargetAccount: (state, action: PayloadAction<{ index: number }>) =>
      state.filter((item) => item.index !== action.payload.index),
    updateTitleTargetAccount: (state, action: PayloadAction<{ index: number; title: string }>) => {
      const cashItem = state.find((item) => item.index === action.payload.index);
      if (cashItem) {
        cashItem.title = action.payload.title;
      }
      return state;
    },
    updateCountTargetAccount: (state, action: PayloadAction<{ index: number; count: number }>) => {
      const cashItem = state.find((item) => item.index === action.payload.index);
      if (cashItem) {
        cashItem.count = action.payload.count;
      }
      return state;
    },
  },
});

export const targetReducer = targetsSlice.reducer;
export const targetActions = targetsSlice.actions;
