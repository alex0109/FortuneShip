import moment from 'moment';

import type { IDataPoint } from '../types/types';
import type { ICategory } from 'pages/Chart/lib/types/types';

export const getHistory: IDataPoint[] = (arr: ICategory[]) => {
  const res = [];

  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].history.length; j++) {
      res.push(arr[i].history[j]);
    }
  }

  return res.sort((a, b) => moment(a.date).unix() - moment(b.date).unix());
};

export const getWeekHistory = (arr: IDataPoint[]) => {
  const week = moment().subtract(7, 'days').unix();

  return arr.filter((item) => moment(item.date).unix() >= week);
};
