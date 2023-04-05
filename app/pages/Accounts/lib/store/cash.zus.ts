/* eslint-disable no-unused-vars */
import { create } from 'zustand';

import type { ICash } from '../types/interface';

interface CashState {
  cash: ICash[];
  handleAddCashCount: (title: string, count: number) => void;
  handleDeleteCashCount: (index: string) => void;
  handleChangeCashTitle: (index: string, title: string) => void;
  handleChangeCashCount: (index: string, count: number) => void;
  handleDecreaseCashCount: (index: string, count: number) => void;
}

export const useCashState = create<CashState>()((set) => ({
  cash: [
    { index: `0_${Math.random() * 10000 - 1}`, title: 'New zustand state', count: 999 },
    { index: `0_${Math.random() * 10000 - 1}`, title: 'redux suck ', count: 13 },
  ],
  handleAddCashCount: (title: string, count: number) =>
    set((state) => {
      state.cash.push({
        index: `0_${Math.random() * 10000 - 1}`,
        title: title,
        count: count,
      });
      return { cash: state.cash };
    }),
  handleDeleteCashCount: (index: string) =>
    set((state) => ({ cash: state.cash.filter((count) => count.index !== index) })),
  handleChangeCashTitle: (index: string, title: string) =>
    set((state) => {
      const countToChange = state.cash.find((count) => count.index === index);
      countToChange!.title = title;
      return { cash: state.cash };
    }),
  handleChangeCashCount: (index: string, count: number) =>
    set((state) => {
      const countToChange = state.cash.find((count) => count.index === index);
      countToChange!.count = count;
      return { cash: state.cash };
    }),
  handleDecreaseCashCount: (index: string, count: number) =>
    set((state) => {
      const countToChange = state.cash.find((count) => count.index === index);
      if (countToChange!.count !== 0 && countToChange!.count >= count) {
        countToChange!.count = countToChange!.count - count;
        return { cash: state.cash };
      }
      return { cash: state.cash };
    }),
}));
