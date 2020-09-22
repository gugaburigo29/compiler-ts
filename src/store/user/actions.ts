import {User, userSlice} from "./slices";
import {AppThunk, RootState} from "../index";

const {setUser} = userSlice.actions;

const fakeCallApi = () => new Promise(resolve => setTimeout(resolve, 2000));

export const createUser = (): AppThunk => async dispatch => {
    await fakeCallApi();
    dispatch(setUser({description: 'asd'}))
}

export const selectUser = (state: RootState) => state.user.user
