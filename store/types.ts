export interface Cash {
    index: number;
    title: string;
    count: number;
    specify: 'cash'
};

export interface Target {
    index: number;
    title: string;
    count: number;
    specify: 'target'
};

export type CashState = Cash[];
export type TargetState = Target[];
// export type AccountState = [CashArray, TargetArray];