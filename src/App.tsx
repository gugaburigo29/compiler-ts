import React, {useEffect, useRef} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {createUser, selectUser} from "./store/user/actions";
import {Layout, Table} from "antd";
import { FooterComponent, HeaderComponent, SiderTable, TextAreaComponent } from './styles/styles';
import { FolderOpenOutlined, PlaySquareOutlined, SaveOutlined } from "@ant-design/icons";
import Icon from "./components/Icon";

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
    const inputFileRef = useRef<HTMLInputElement>(null); // Pegar a ref. do componente

    useEffect(() => {
        dispatch(createUser());
    }, []);

    async function handleFileInput(target: EventTarget) {
        const $target = target as HTMLInputElement;
        let textFile = '';
        if (!$target.files) return;
    
        try {
            textFile = await readFile($target.files[0]);
        } catch(e){
            alert('Error on read file!');
        }       
                
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
                    onClick={e => {
                        if(!inputFileRef.current) return;
                        inputFileRef.current.click();
                    }}
                >
                    <input 
                        type="file"
                        hidden 
                        ref={inputFileRef}
                        onChange = {e => handleFileInput(e.target)}
                    />
                    <Icon icon={<FolderOpenOutlined />} size={20} />
                </div>
                <Icon icon={<SaveOutlined />} size={20} />
                <Icon icon={<PlaySquareOutlined />} size={20} />
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
