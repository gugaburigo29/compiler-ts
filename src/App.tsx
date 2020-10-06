import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {createUser, selectUser} from "./store/user/actions";
import {Layout, Table} from "antd";
import { FooterComponent, HeaderComponent, SiderTable, TextAreaComponent } from './styles/styles';
import TextArea from 'antd/lib/input/TextArea';

const {Sider, Content} = Layout;

const columnsTableTop = [
    {
        title: 'Código',
        dataIndex: 'Codigo'
    }, 
    {
        title: 'Palavra',
        dataIndex: 'Palavra'
    }
];

const dataTableTop = [
    {
        key: '1',
        Codigo: 52,
        Palavra: 'PROGRAMA'
    }, 
    {
        key: '2',
        Codigo: 53,
        Palavra: 'END'
    }
];

function App() {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);

    useEffect(() => {
        dispatch(createUser());
    }, []);

    return (
        <Layout style={{height: '100%'}}>
            <HeaderComponent>
                HeaderComponent
            </HeaderComponent>
            <Layout>
                <Layout>
                    <Content>Content</Content>
                    <Sider>
                        <SiderTable>
                            <Table columns={columnsTableTop} dataSource={dataTableTop} size="small" />
                        </SiderTable>
                        <SiderTable>
                            <Table columns={columnsTableTop} dataSource={dataTableTop} size="small" />
                        </SiderTable>
                    </Sider>
                </Layout>
            </Layout>
            <FooterComponent>
                <TextAreaComponent disabled />
            </FooterComponent>
        </Layout>
    );
}

export default App;
