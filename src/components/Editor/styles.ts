import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    min-height: 100%;
    background-color: white;
    line-height: 2;
`;

export const LineCounter = styled.div`
    flex: 0 0 5%;
    max-width: 5%;
    height: 100%;
    padding: 15px;
`;

export const ItemCounter = styled.div`
  
`

export const TextArea = styled.textarea`
    flex: 0 0 95%;
    max-width: 95%;
    border: none;
    resize: none;
    padding: 15px;
    min-height: 100%;
    overflow: hidden;
    
    &:focus {
      outline: none;
    }
`
