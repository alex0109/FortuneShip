import { createSlice } from '@reduxjs/toolkit';

import type { ICash, CashState } from '../../../../shared/lib/store/types';
import type { PayloadAction} from '@reduxjs/toolkit';

const initialState: CashState = [
  { index: Math.random() * 10000 - 1, title: 'Puss in Boots', count: 999, specify: 'cash' },
  { index: Math.random() * 10000 - 1, title: 'On redux course', count: 13, specify: 'cash' },
  { index: Math.random() * 10000 - 1, title: 'On donate Toolkit', count: 89, specify: 'cash' },
  { index: Math.random() * 10000 - 1, title: 'TS is good', count: 34, specify: 'cash' },
];

export const cashSlice = createSlice({
  name: 'cash',
  initialState,
  reducers: {
    addCashAccount: (state, action: PayloadAction<ICash>) => {
      state.push(action.payload);
    },
    removeCashAccount: (state, action: PayloadAction<{ index: number }>) => state.filter((item) => item.index !== action.payload.index),
    updateTitleCashAccount: (state, action: PayloadAction<{ index: number; title: string }>) => {
      const cashItem = state.find((item) => item.index === action.payload.index);
      if (cashItem) {
        cashItem.title = action.payload.title;
      }
      return state;
    },
    updateCountCashAccount: (state, action: PayloadAction<{ index: number; count: number }>) => {
      const cashItem = state.find((item) => item.index === action.payload.index);
      if (cashItem) {
        cashItem.count = action.payload.count;
      }
      return state;
    },
  },
});

export const cashReducer = cashSlice.reducer;
export const cashActions = cashSlice.actions;
