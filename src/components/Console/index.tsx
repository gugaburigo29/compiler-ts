import React, {useEffect, useRef} from "react";
import {TextAreaComponent} from "../../styles/styles";

interface ConsoleProps {
    messages: string[]
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
        {messages.map((val, index) => <div key={index}>{val}</div>)}
    </TextAreaComponent>
}

export default Console;
