import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {createUser, selectUser} from "./store/user/actions";
import {Layout, Table} from "antd";
import { FooterComponent, HeaderComponent, SiderTable, TextAreaComponent } from './styles/styles';
import { FolderOpenOutlined, PlaySquareOutlined, SaveOutlined } from "@ant-design/icons";

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

    async function handleFileInput(target: EventTarget) {
        debugger;
        const $target = target as HTMLInputElement;
        if (!$target.files) return;
    
        const textFile = await readFile($target.files[0]);
                
        // return the text file
        console.log(textFile);
    }
    
    async function readFile(file: File): Promise<string> {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
    
            fileReader.onloadend = _ => resolve(String(fileReader.result));
            fileReader.onerror = _ => reject();
    
            fileReader.readAsText(file);
        });
    }

    return (
        <Layout style={{height: '100%'}}>
            <HeaderComponent>
                <div 
                    id="importFile"
                    style={{display: "flex", cursor: "pointer"}}
                    onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {handleFileInput(e.target)}}
                >
                    <FolderOpenOutlined />
                </div>
                <SaveOutlined style={{cursor: "pointer"}}/>
                <PlaySquareOutlined style={{cursor: "pointer"}}/>
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
