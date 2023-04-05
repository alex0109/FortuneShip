export interface ICash {
  index: string;
  title: string;
  count: number;
}

export interface ITarget {
  index: string;
  title: string;
  count: number;
}

export interface IModalProp {
  index: string;
  title: string;
  count: number;
  type: '0' | '1';
}

export type CashState = ICash[];
export type TargetState = ITarget[];
