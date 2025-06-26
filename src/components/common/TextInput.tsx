import React from "react";
import styled from "styled-components";

const TextInputContainer = styled.input`
  background-color: blue;
  border: 1px solid;
  border-radius: 50%;
  padding: 12px;
`;

interface TextInputProps {
  placeHolder: string;
}
const TextInput: React.FC<TextInputProps> = ({ placeHolder }) => {
  return <TextInputContainer type="text" placeholder={placeHolder} />;
};

export default TextInput;
