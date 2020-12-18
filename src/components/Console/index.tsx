import React, {useEffect, useRef} from "react";
import {TextAreaComponent} from "../../styles/styles";

export enum TypeMessage {
    ERROR = 'red',
    SUCCESS = 'green',
    INFO = 'black'
}

export interface Message {
    message: string;
    type: TypeMessage;
}

interface ConsoleProps {
    messages: Array<Message>;
}

function Console({messages}: ConsoleProps) {
    const consoleRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const current = consoleRef.current;
        if (!current) return;

        current.scroll({
            top: current.scrollHeight
        });
    }, [messages]);

    return <TextAreaComponent ref={consoleRef}>
        {messages.map((val, index) =>
            <div key={index}>
                <h4
                    style={{color: val.type}}
                >
                    {val.message}
                </h4>
            </div>)}
    </TextAreaComponent>
}

export default Console;