import type { ChartPieData } from '../../components/ChartPie/ChartPie';
import type { ICategory } from '../types/types';

export const generateChartPieData = () => {
  const itemsCount = Math.floor(Math.random() * 7) + 3;
  const value = [];
  for (let i = 0; i < itemsCount; i++) {
    value.push(Math.floor(Math.random() * 60) + 40);
  }

  const total = value.reduce((a, b) => a + b, 0);

  const data: ChartPieData = [];
  for (let i = 0; i < itemsCount; i++) {
    const percent = value[i] / total;
    data.push({
      percent,
      color: getRandomColor(),
    });
  }

  return data;
};

const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export const categories: ICategory[] = [
  {
    index: Math.random() * 1000,
    title: 'Architecture',
    count: 5,
    icon: 'ios-cafe-outline',
    color: '#E09B11',
    percent: 0,
  },
  {
    index: Math.random() * 1000,
    title: 'Games',
    count: 11,
    icon: 'ios-game-controller-outline',
    color: '#CCD50F',
    percent: 0,
  },
  {
    index: Math.random() * 1000,
    title: 'Pets',
    count: 7,
    icon: 'ios-paw-outline',
    color: '#0E7FC0',
    percent: 0,
  },
  {
    index: Math.random() * 1000,
    title: 'Sport',
    count: 9,
    icon: 'ios-basketball-outline',
    color: '#C92AAE',
    percent: 0,
  },
  {
    index: Math.random() * 1000,
    title: 'Transport',
    count: 6,
    icon: 'bus-outline',
    color: '#8A46B0',
    percent: 0,
  },
  {
    index: Math.random() * 1000,
    title: 'Transport',
    count: 8,
    icon: 'bus-outline',
    color: '#0BD1C5',
    percent: 0,
  },
  {
    index: Math.random() * 1000,
    title: 'Transport',
    count: 6,
    icon: 'ios-bicycle-outline',
    color: '#0B6ED1',
    percent: 0,
  },
  {
    index: Math.random() * 1000,
    title: 'Transport',
    count: 6,
    icon: 'bus-outline',
    color: '#E05311',
    percent: 0,
  },
  {
    index: Math.random() * 1000,
    title: 'Transport',
    count: 6,
    icon: 'bus-outline',
    color: '#0BBCD1',
    percent: 0,
  },
  {
    index: Math.random() * 1000,
    title: 'Transport',
    count: 6,
    icon: 'bus-outline',
    color: '#0BBCD1',
    percent: 0,
  },
];
