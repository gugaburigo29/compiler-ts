import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectCode, setTextCode} from "../../store/editor/actions";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/theme-github";

function Editor() {
    const dispatch = useDispatch();
    const code = useSelector(selectCode);

    return (
        <AceEditor
            width="100%"
            height="100%"
            theme="github"
            value={code}
            editorProps={{ $blockScrolling: true }}
            onChange={value => dispatch(setTextCode(value))}
        />
    )
}

export default Editor;
