import styled from "styled-components";
import Header from "../Header/Header";

const Input = styled(Header).attrs<{value: string}>(props => ({
  as: "input",
  type: "text",
  value: props.value,
  spellcheck: "false",
}))<{value: string}>`
  outline: none;
  width: 100%;
  background: ${props => props.theme.background};
  padding: 0.25rem;

  border: 0;
  border-bottom: transparent 0.25rem solid;
  transition: border-bottom 0.05s ease-out;

  caret-color: ${props => props.theme.accent};

  &:focus {
    border-bottom: ${props => props.theme.accent} 0.25rem solid;
  }
`

export default Input;