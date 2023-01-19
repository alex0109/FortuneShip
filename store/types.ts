export interface ICash {
  index: number;
  title: string;
  count: number;
  specify: 'cash';
}

export interface ITarget {
  index: number;
  title: string;
  count: number;
  specify: 'target';
}

export type CashState = ICash[];
export type TargetState = ITarget[];
// export type AccountState = [CashArray, TargetArray];
