import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {createUser, selectUser} from "./store/user/actions";
import {Layout, message} from "antd";
import {FooterComponent, HeaderComponent, SiderTable, TextAreaComponent} from './styles/styles';
import Editor from "./components/Editor/";
import {FolderOpenOutlined, PlaySquareOutlined, SaveOutlined} from "@ant-design/icons";
import Icon from "./components/Icon";
import {selectCode, setTextCode} from "./store/editor/actions";
import TableComponent from './components/Table';
import {IToken} from "./store/table/actions";
import Console from "./components/Console";

import Gramatic from './gramatic/Gramatic';
import Syntatic from './gramatic/Syntatic';
import Semantic from './gramatic/Semantic';

const {Sider, Content} = Layout;

interface GramaticProps {
    lineNumber: number;
    value: string;
    identificationCode: number;
}

const gramaticClass = new Gramatic();
const syntaticClass = new Syntatic();

function App() {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const code = useSelector(selectCode);
    const inputFileRef = useRef<HTMLInputElement>(null); // Take the ref. of component

    const [tokens, setTokens] = useState<IToken[]>([]);
    const [consoleMessages, setConsoleMessages] = useState<string[]>([]);

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
    };

    async function readFile(file: File): Promise<string> {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();

            fileReader.onloadend = _ => resolve(String(fileReader.result));
            fileReader.onerror = _ => reject();

            fileReader.readAsText(file);
        });
    };

    function download(code: string) {
        const element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(code));
        element.setAttribute('download', 'file.txt');

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
    };

    function handleCompileClick(){
        setConsoleMessagesState("Initiating application...");
        setTokens([]);

        setConsoleMessagesState("Initiating lexical analysis...");
        const tokens = handleCompileFile();
        setTokens(tokens);

        syntaticClass.analyse(tokens);
        setConsoleMessages(messages => [...messages, "Initiating syntatic analysis..."]);


        setConsoleMessagesState("Initiating semantic analysis...");
        const semanticClass = new Semantic(tokens);
        semanticClass.validate();

        setConsoleMessages(messages => [...messages, "Compiled!!"]);
    };

    function setConsoleMessagesState(message: string) {
        setConsoleMessages(messages => [...messages, message]);
    };

    function handleCompileFile() {
        let codeToAnalyze: Array<string> = code.split('\n');
        let classifiedGramatic: Array<GramaticProps> = [];
        let isComment: boolean = false;

        codeToAnalyze.forEach((line: string, lineNumber: number) => {
            let lineSplited = line.split('');
            let words: Array<string> = [];
            let word: string = '';
            let previousLetter: string = '';
            let lengthLineSplited: number = lineSplited.length;

            for (let i = 0; i < lineSplited.length; i++) {
                var letter = lineSplited[i].trim();

                // Comment
                if(letter === "(" && i < line.length + 1 && line[i + 1] === "*" ) {
                    isComment = true;
                } else if (letter === ")" && 1 < line.length && line[i - 1] === "*" ) {
                    isComment = false;
                } else if(isComment) {
                    continue;
                }else if (gramaticClass.SpecialTokens.includes(letter)) {
                    if (gramaticClass.DuplicateTokens.includes(letter)) {
                        let currentWord = "";

                        if(gramaticClass.SpecialTokens.includes(letter + lineSplited[i + 1]) && i + 1 < lineSplited.length && lineSplited[i + 1].trim()) {
                            currentWord = letter + lineSplited[i + 1];
                        } else if(gramaticClass.SpecialTokens.includes(previousLetter + letter) && 1 < lineSplited.length && previousLetter.trim()) {
                            currentWord = previousLetter + letter;
                        }
                        if (currentWord.length) {
                            if (word.length) {
                                words.push(word);
                                word = "";
                            }
                            words.push(currentWord);
                            i++;
                        } else {
                            if (word.length) {
                                words.push(word);
                                word = "";
                            }
                            words.push(letter);
                        }
                    } else {
                        if (word.length) {
                            words.push(word);
                            word = "";
                        }
                        words.push(letter);
                    }
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
                } else if (lengthLineSplited === (i + 1)) {
                    if (word.length) {
                        words.push(word + letter);
                        word = '';
                    }
                } else if (letter.length) {
                    word += letter;
                }

                previousLetter = letter;
            };

            words.forEach((token: string) => {
                const gramatic = {
                    lineNumber: lineNumber + 1,
                    value: token,
                    identificationCode: gramaticClass.getTokenIdentificationCode(token)
                };

                if (gramatic.identificationCode === 26) {
                    if (Number(gramatic.value) > gramaticClass.IntegerMaxValue.positive ||
                        Number(gramatic.value) < gramaticClass.IntegerMaxValue.negative) {
                        throw new Error(`Valor inteiro na linha ${gramatic.lineNumber} inválido`);
                    } else {
                        classifiedGramatic.push(gramatic);
                    }
                } else {
                    classifiedGramatic.push(gramatic);
                }

                if (gramatic.identificationCode === 25) {
                    const { value, lineNumber } = gramatic;

                    if (value.length > 30) {
                        throw new Error(`O identificador ${value} na linha ${lineNumber} contem mais de 30 caracteres.`);
                    }
                }
            });
        });

        const tokens: IToken[] = classifiedGramatic.map(value => ({
            line: value.lineNumber,
            code: value.identificationCode,
            word: value.value
        }));

        return tokens;
    };

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
                <div onClick={() => {
                    try {
                        handleCompileClick();
                    } catch (e) {
                        setConsoleMessages(messages => [...messages, e.message]);
                        console.log(e)
                    }
                }}>
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
                <Console messages={consoleMessages} />
            </FooterComponent>
        </Layout>
    );
}

export default App;
