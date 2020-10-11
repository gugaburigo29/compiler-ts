import React, {ChangeEvent, FormEvent, useEffect, useRef, useState} from "react";
import {Container, ItemCounter, LineCounter, TextArea} from "./styles";
import {useDispatch, useSelector} from "react-redux";
import {selectCode, selectLines, setTextCode} from "../../store/editor/actions";

function Editor() {
    const dispatch = useDispatch();

    const [height, setHeight] = useState<number | undefined>(undefined);

    const lines = useSelector(selectLines)
    const code = useSelector(selectCode)

    const lineCounterRef = useRef<HTMLDivElement>(null);



    /**
     * Set height from iframe
     */
    useEffect(() => {
        setHeight(lineCounterRef.current?.offsetHeight);
    }, [lineCounterRef.current?.offsetHeight]);

    // @ts-ignore
    return (
        <Container>
            <LineCounter ref={lineCounterRef}>
                {new Array(lines).fill(0).map((_, index) => (
                    <ItemCounter>{index + 1}</ItemCounter>
                ))}
            </LineCounter>
            <TextArea
                style={{
                    height: height
                }}
                value={code}
                onInput={e => {
                    // @ts-ignore
                    dispatch(setTextCode(e.target.value));
                }}
            />
        </Container>
    )
}

export default Editor;
