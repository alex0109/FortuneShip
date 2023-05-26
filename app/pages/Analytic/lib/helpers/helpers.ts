import moment from 'moment';

import type { IDateGroupes } from '../types/interface';

import type { ICategory } from 'pages/Chart/lib/types/types';
import type { IHistory } from 'shared/types/IHistory';

export const getHistory = (arr: ICategory[]): IHistory[] => {
  const res = [];

  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].history.length; j++) {
      res.push({ ...arr[i].history[j], title: arr[i].title });
    }
  }

  return res.sort((a, b) => moment(a.date).unix() - moment(b.date).unix());
};

export const getWeekHistory = (arr: IHistory[]) => {
  const week = moment().subtract(7, 'days').unix();

  return arr.filter((item) => moment(item.date).unix() >= week);
};

export const groupByDate = (inputArray: IHistory[]): IDateGroupes[] => {
  const groupedData = {};

  inputArray.forEach((obj) => {
    const date = obj.date;

    if (!groupedData[date]) {
      groupedData[date] = {
        date: date,
        values: [],
      };
    }

    groupedData[date].values.push({
      title: obj.title,
      value: obj.value,
    });
  });

  const resultArray = Object.values(groupedData);

  return resultArray.sort((a, b) => moment(b.date).unix() - moment(a.date).unix());
};
