import {tableSlice} from "./slices";
import {AppThunk, RootState} from "../index";

const {setCode, setWord} = tableSlice.actions;

interface TokenInterface {
    code: number;
    word: string;
}

export const setText = (token: TokenInterface): AppThunk => async dispatch => {
    dispatch(setCode(token.code));
    dispatch(setWord(token.word));
}

export const selectTokenCode = (state: RootState) => state.table.code;
export const selectTokenWord = (state: RootState) => state.table.token;