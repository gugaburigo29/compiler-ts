import React, {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {Container, ItemCounter, LineCounter, TextArea} from "./styles";

function Editor() {
    const [value, setValue] = useState('');
    const [lines, setLines] = useState(0)

    /**
     * Count lines in string
     */
    useEffect(() => {
        const {length} = value.split('\n');
        console.log(value)
        setLines(length);
    }, [value]);

    // @ts-ignore
    return (
        <Container>
            <LineCounter>
                {new Array(lines).fill(0).map((_, index) => (
                    <ItemCounter>{index + 1}</ItemCounter>
                ))}
            </LineCounter>
            <TextArea
                contentEditable
                onInput={ (event: FormEvent<HTMLDivElement>) => {
                    // @ts-ignore
                    console.log(event.target.innerText);
                    // @ts-ignore
                    setValue(event.target.innerText)
                }}
            />
        </Container>
    )
}

export default Editor;
