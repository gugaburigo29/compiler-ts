import styled from "styled-components";
import {Layout} from "antd";

const { Header, Footer } = Layout;

export const HeaderComponent = styled(Header)`
    background-color: white;
    height: 20px;
    display: flex;
`;

export const SiderTable = styled.div `
    height: 50%;
    max-height: 50%;
`;

export const FooterComponent = styled(Footer)`
    height: 20%;
    padding: 5px 5px;
`;

export const TextAreaComponent = styled.div `
    width: 100%;
    height: 100%;
    resize: none;
    padding: 15px;
    border: 1px solid grey;
    max-height: 190px;
    overflow-y: auto;
`;
