import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Cash, CashState } from "../types";

const initialState: CashState = [
    {index: 1, title: 'Some count', count: 999, specify: 'cash'},
    {index: 2, title: 'On redux course', count: 13, specify: 'cash'},
    {index: 3, title: 'On donate Toolkit', count: 89, specify: 'cash'},
    {index: 4, title: 'TS is good', count: 34, specify: 'cash'}
]

export const cashSlice = createSlice({
    name: 'cash',
    initialState,
    reducers: {
        addCashAccount: (state, action: PayloadAction<Cash>) => {
            state.push(action.payload)
        },
        removeCashAccount: (state, action: PayloadAction<{index: number}>) => {
            return state.filter(item => item.index !== action.payload.index)
        },
        updateCashAccount: (state, action: PayloadAction<{index: number, title?: string, count?: number}>) => {}
    }
})

export const cashReducer = cashSlice.reducer;
export const cashActions = cashSlice.actions;