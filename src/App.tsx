import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {createUser, selectUser} from "./store/user/actions";
import {Layout} from "antd";
import {FooterComponent, HeaderComponent, SiderTable, TextAreaComponent} from './styles/styles';
import Editor from "./components/Editor/";
import {FolderOpenOutlined, PlaySquareOutlined, SaveOutlined} from "@ant-design/icons";
import Icon from "./components/Icon";
import {selectCode, setTextCode} from "./store/editor/actions";
import Gramatic from './gramatic/Gramatic';
import TableComponent from './components/Table';
import {TokenInterface} from "./store/table/actions";

const {Sider, Content} = Layout;

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

interface GramaticProps {
    lineNumber: number;
    value: string;
    identificationCode: number;
}

function App() {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const code = useSelector(selectCode);
    const inputFileRef = useRef<HTMLInputElement>(null); // Take the ref. of component
    const gramaticClass = new Gramatic();

    const [tokens, setTokens] = useState<TokenInterface[]>([]);

    useEffect(() => {
        dispatch(createUser());
    }, []);

    async function handleFileInput(target: EventTarget) {
        const $target = target as HTMLInputElement;
        let textFile = '';
        if (!$target.files) return;

        try {
            textFile = await readFile($target.files[0]);
        } catch (e) {
            alert('Error on read file!');
        }

        dispatch(setTextCode(textFile));
    }

    async function readFile(file: File): Promise<string> {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();

            fileReader.onloadend = _ => resolve(String(fileReader.result));
            fileReader.onerror = _ => reject();

            fileReader.readAsText(file);
        });
    }

    function download(code: string) {
        const element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(code));
        element.setAttribute('download', 'file.txt');

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
    }

    function handleCompileFile() {
        let codeToAnalyze: Array<string> = code.split('\n');
        let classifiedGramatic: Array<GramaticProps> = [];
        let isComment: boolean = false;
        debugger
        codeToAnalyze.forEach((line: string, lineNumber: number) => {
            let lineSplited = line.split('');
            let words: Array<string> = [];
            let word: string = '';
            let previousLetter: string = '';
            let lengthLineSplited: number = lineSplited.length;

            lineSplited.forEach((letter: string, index: number) => {
                letter = letter.trim();

                if (isComment) {
                    if (((previousLetter + letter).includes(gramaticClass.CommentCharacterEnd))) {
                        isComment = false;
                    }
                } else if (((previousLetter + letter).includes(gramaticClass.CommentCharacterStart))) {
                    isComment = true;

                    word = '';
                } else if (gramaticClass.WordDelimiters.includes(letter) ||
                    gramaticClass.LineDelimiters.includes(letter)) {

                    if (word.length) {
                        words.push(word);
                    }
                    word = '';

                    // Take the delimiter only if it is not a blank space
                    if (letter.length) {
                        words.push(letter);
                    }
                    // Check if is the last character
                } else if (lengthLineSplited === (index + 1)) {
                    if (word.length) {
                        words.push(word + letter);
                        word = '';
                    }
                } else if (letter.length) {
                    word += letter;
                }

                previousLetter = letter;
            });

            words.forEach((token: string) => {
                classifiedGramatic.push({
                    lineNumber: lineNumber + 1,
                    value: token,
                    identificationCode: gramaticClass.getTokenIdentificationCode(token)
                });
            });
        });

        const tokens: TokenInterface[] = classifiedGramatic.map(value => ({
            code: value.identificationCode,
            word: value.value
        }));

        setTokens(tokens);
    }

    return (
        <Layout style={{height: '100%'}}>
            <HeaderComponent>
                <div
                    onClick={e => {
                        if (!inputFileRef.current) return;
                        inputFileRef.current.click();
                    }}
                >
                    <input
                        type="file"
                        hidden
                        ref={inputFileRef}
                        onChange={e => handleFileInput(e.target)}
                    />
                    <Icon icon={<FolderOpenOutlined/>} size={20}/>
                </div>
                <div onClick={() => download(code)}>
                    <Icon icon={<SaveOutlined/>} size={20}/>
                </div>
                <div onClick={handleCompileFile}>
                    <Icon icon={<PlaySquareOutlined/>} size={20}/>
                </div>
            </HeaderComponent>
            <Layout>
                <Layout>
                    <Content>
                        <Editor/>
                    </Content>
                    <Sider style={{backgroundColor: 'white', overflowY: 'scroll'}}>
                        <SiderTable>
                            <TableComponent tokens={tokens}/>
                        </SiderTable>
                        <SiderTable>
                            {/* <Table columns={columnsTableTop} dataSource={dataTableTop} size="small"/> */}
                        </SiderTable>
                    </Sider>
                </Layout>
            </Layout>
            <FooterComponent>
                <TextAreaComponent disabled/>
            </FooterComponent>
        </Layout>
    );
}

export default App;
