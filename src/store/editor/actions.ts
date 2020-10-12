import {editorSlice} from "./slices";
import {AppThunk, RootState} from "../index";

const {setCode, setLines} = editorSlice.actions;

export const setTextCode = (code: string): AppThunk => dispatch => {
    const lines = code.split('\n').length;

    dispatch(setCode(code));
    dispatch(setLines(lines));
}

export const selectLines = (state: RootState) => state.editor.lines;
export const selectCode = (state: RootState) => state.editor.code;
