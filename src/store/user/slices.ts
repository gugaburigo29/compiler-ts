import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface User {
    id?: number;
    description: string;
}

interface UserState {
    user: User | null
}

const initialState: UserState = {
    user: null
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User>) => {
            return {
                ...state,
                user: action.payload
            }
        }
    }
});

export default userSlice.reducer;
