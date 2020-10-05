import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import './index.css';
import App from './App';
import {store} from "./store";
import {ThemeProvider} from "styled-components";
import theme from "./styles/themes/mainTheme";

import "antd/dist/antd.css";

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <App/>
            </ThemeProvider>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
