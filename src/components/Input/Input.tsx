import TextareaAutosize from 'react-textarea-autosize';
import styled from "styled-components";
import Header from "../Header/Header";

export const Input = styled(Header).attrs<{value: string}>(props => ({
  as: "input",
  type: "text",
  value: props.value,
  spellcheck: "false",
}))<{value: string}>`
  outline: none;
  width: 100%;
  padding: 0;
  background: transparent;

  border: 0;
  border-bottom: transparent 0.25rem solid;
  transition: border-bottom 0.05s ease-out;

  caret-color: ${props => props.theme.accent};

  &:focus {
    border-bottom: ${props => props.theme.accent} 0.25rem solid;
  }
`


// https://codesandbox.io/s/l7y53n0k0z
export const TextArea = styled(TextareaAutosize).attrs(props => ({
  spellcheck: "false",
}))`
  outline: none;
  width: 100%;
  padding: 0;
  background: transparent;

  border: 0;
  border-bottom: transparent 0.125rem solid;
  transition: border-bottom 0.05s ease-out;

  color: ${props => props.theme.primary};
  font-weight: 600;
  resize: none;

  caret-color: ${props => props.theme.primary};
  &:focus {
    border-bottom: ${props => props.theme.primary} 0.125rem solid;
  }
`;