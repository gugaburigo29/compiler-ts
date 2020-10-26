import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Layout, Table} from "antd";
import {selectTokenCode, selectTokenWord, TokenInterface} from "../../store/table/actions";

const columnsTableTop = [
    {
        title: 'Código',
        dataIndex: 'code'
    },
    {
        title: 'Palavra',
        dataIndex: 'word'
    }
];

function TableComponent({tokens}: {tokens: TokenInterface[]}){
    return (
        <Table
            columns={columnsTableTop}
            dataSource={tokens}
            size="small"
            pagination={false}
        />
    );
}

export default TableComponent;
