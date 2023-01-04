import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Target, TargetState } from "../types";

const initialState: TargetState = []

export const targetsSlice = createSlice({
    name: 'targets',
    initialState,
    reducers: {
        addTargetAccount: (state, action: PayloadAction<Target>) => {
            state.push(action.payload)
        },
        removeTargetAccount: (state, action: PayloadAction<{index: number}>) => {
            return state.filter(item => item.index !== action.payload.index)
        },
    }
})

export const targetReducer = targetsSlice.reducer;
export const targetActions = targetsSlice.actions;