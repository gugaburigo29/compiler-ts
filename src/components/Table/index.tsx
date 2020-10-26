import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Layout, Table} from "antd";
import {selectTokenCode, selectTokenWord} from "../../store/table/actions";

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

function TableComponent(){
    const dispatch = useDispatch();
    const code = useSelector(selectTokenCode);
    const word = useSelector(selectTokenWord);

    return (
        <Table 
            columns={columnsTableTop} 
            //dataSource={dataTableTop} 
            size="small"
        />
    );
}

export default TableComponent;