import {tableSlice} from "./slices";
import {AppThunk, RootState} from "../index";

const {setLine, setCode, setWord} = tableSlice.actions;

export interface IToken {
    line: number;
    code: number;
    word: string;
}

export interface IVariable {
    pos: number;
    category: string;
    name: string;
    type: VariableType;
}

export enum VariableType {
    NULL = 'NULL',
    INTEGER = 'INTEGER',
    ARRAY = 'ARRAY',
    LITERAL = 'LITERAL',
    PROCEDURE = 'PROCEDURE',
    LABEL = 'LABEL',
    CONSTANT = 'CONSTANT',
    VARIABLE = 'VARIABLE',
    PARAMETER = 'PARAMETER',
    PROGRAM_NAME = 'PROGRAM_NAME'
}

export const setText = (token: IToken): AppThunk => async dispatch => {
    dispatch(setLine(token.line));
    dispatch(setCode(token.code));
    dispatch(setWord(token.word));
}

// export const selectTokenLine = (state: RootState) => state.table.line;
export const selectTokenCode = (state: RootState) => state.table.code;
export const selectTokenWord = (state: RootState) => state.table.token;
