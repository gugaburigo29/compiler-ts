import {
    configureStore,
    ThunkAction,
    Action,
    ConfigureStoreOptions,
    combineReducers,
} from '@reduxjs/toolkit';
import userReducer from "./user/slices";

const rootReducer = combineReducers({
    user: userReducer,
});

const storeConfig: ConfigureStoreOptions = {
    reducer: rootReducer,
};

export const store = configureStore(storeConfig);

export type RootState = ReturnType<typeof rootReducer>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
    >;
