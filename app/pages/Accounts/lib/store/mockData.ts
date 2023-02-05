import type { ICash, ITarget } from '../types/interface';

export const cashExample: ICash = {
  index: Math.random() * 10000 - 1,
  title: 'Count',
  count: 0,
  specify: 'cash',
};

export const targetExample: ITarget = {
  index: Math.random() * 10000 - 1,
  title: 'Target',
  count: 0,
  specify: 'target',
};
