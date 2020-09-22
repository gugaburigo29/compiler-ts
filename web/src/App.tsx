import React, {useEffect} from 'react';
import './App.css';
import { useDispatch, useSelector } from "react-redux";
import { createUser, selectUser } from "./store/user/actions";

function App() {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);

    useEffect(() => {
        dispatch(createUser());
    }, []);

    return (
        <div>
            {user?.description}
        </div>
    );
}

export default App;
