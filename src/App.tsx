import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {createUser, selectUser} from "./store/user/actions";
import {Layout} from "antd";
import Editor from "./components/Editor/";

const {Header, Footer, Sider, Content} = Layout;

function App() {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);

    useEffect(() => {
        dispatch(createUser());
    }, []);

    return (
        <Layout style={{height: '100%'}}>
            <Header>Header</Header>
            <Layout>
                <Content>
                    <Editor/>
                </Content>
                <Sider>Sider</Sider>
            </Layout>
            <Footer>Footer</Footer>
        </Layout>
    );
}

export default App;
