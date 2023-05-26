import type { IHistory } from 'shared/types/IHistory';

export interface IPoint {
  x: number;
  y: number;
}

export interface ICategory {
  index: string;
  title: string;
  count: number;
  icon: string;
  color: string;
  percent: number;
  history: IHistory[];
}
