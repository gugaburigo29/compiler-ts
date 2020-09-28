import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {createUser, selectUser} from "./store/user/actions";

import './App.css';
import MainLayout from './layouts/MainLayout';

function App() {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);

    useEffect(() => {
        dispatch(createUser());
    }, []);

    return (
        <MainLayout>
            <div>
                {user?.description}
            </div>
        </MainLayout>
    );
}

export default App;
