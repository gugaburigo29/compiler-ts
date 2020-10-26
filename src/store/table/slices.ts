import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface TableState {
    code: number;
    token: string;
};

const initialState: TableState = {
    code: 0,
    token: ''
}

export const tableSlice = createSlice({
    name: 'table',
    initialState,
    reducers: {
        setCode: (state, action: PayloadAction<number>) => {
            return {
                ...state,
                code: action.payload
            }
        },
        setWord: (state, action: PayloadAction<string>) => {
            return {
                ...state,
                token: action.payload
            }
        }
    }
});

export default tableSlice.reducer;