import {
    configureStore,
    ThunkAction,
    Action,
    ConfigureStoreOptions,
    combineReducers,
} from '@reduxjs/toolkit';
import userReducer from "./user/slices";
import editorReducer from "./editor/slices";
import tableReducer from "./table/slices";

const rootReducer = combineReducers({
    user: userReducer,
    editor: editorReducer,
    table: tableReducer
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
