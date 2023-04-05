/* eslint-disable no-unused-vars */
import { create } from 'zustand';

import type { ITarget } from '../types/interface';

interface TargetState {
  targets: ITarget[];
  handleAddTargetCount: (title: string, count: number) => void;
  handleDeleteTargetCount: (index: string) => void;
  handleChangeTargetTitle: (index: string, title: string) => void;
  handleChangeTargetCount: (index: string, count: number) => void;
  handleDecreaseTargetCount: (index: string, count: number) => void;
}

export const useTargetState = create<TargetState>()((set) => ({
  targets: [
    { index: `1_${Math.random() * 10000 - 1}`, title: 'Chevrolet Camaro', count: 999 },
    { index: `1_${Math.random() * 10000 - 1}`, title: 'Country', count: 13 },
  ],
  handleAddTargetCount: (title: string, count: number) =>
    set((state) => {
      state.targets.push({
        index: `1_${Math.random() * 10000 - 1}`,
        title: title,
        count: count,
      });
      return { targets: state.targets };
    }),
  handleDeleteTargetCount: (index: string) =>
    set((state) => ({ targets: state.targets.filter((count) => count.index !== index) })),
  handleChangeTargetTitle: (index: string, title: string) =>
    set((state) => {
      const countToChange = state.targets.find((count) => count.index === index);
      countToChange!.title = title;
      return { targets: state.targets };
    }),
  handleChangeTargetCount: (index: string, count: number) =>
    set((state) => {
      const countToChange = state.targets.find((count) => count.index === index);
      countToChange!.count = count;
      return { targets: state.targets };
    }),
  handleDecreaseTargetCount: (index: string, count: number) =>
    set((state) => {
      const countToChange = state.targets.find((count) => count.index === index);
      if (countToChange!.count !== 0 && countToChange!.count >= count) {
        countToChange!.count = countToChange!.count - count;
        return { targets: state.targets };
      }
      return { targets: state.targets };
    }),
}));
