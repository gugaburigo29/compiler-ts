import {tableSlice} from "./slices";
import {AppThunk, RootState} from "../index";

const {setLine, setCode, setWord} = tableSlice.actions;

export interface TokenInterface {
    line: number;
    code: number;
    word: string;
}

export const setText = (token: TokenInterface): AppThunk => async dispatch => {
    dispatch(setLine(token.line));
    dispatch(setCode(token.code));
    dispatch(setWord(token.word));
}

// export const selectTokenLine = (state: RootState) => state.table.line;
export const selectTokenCode = (state: RootState) => state.table.code;
export const selectTokenWord = (state: RootState) => state.table.token;
