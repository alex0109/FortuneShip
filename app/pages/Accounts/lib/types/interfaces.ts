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
  type: string;
}

export type CashState = ICash[];
export type TargetState = ITarget[];
