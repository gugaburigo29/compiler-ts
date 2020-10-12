import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface EditorState {
    code: string;
    lines: number;
};

const initialState: EditorState = {
    code: '',
    lines: 1
};

export const editorSlice = createSlice({
    name: 'editor',
    initialState,
    reducers: {
        setCode: (state, action: PayloadAction<string>) => {
            return {
                ...state,
                code: action.payload,
            }
        },
        setLines: (state, action: PayloadAction<number>) => {
            return {
                ...state,
                lines: action.payload,
            }
        }
    }
});

export default editorSlice.reducer;
