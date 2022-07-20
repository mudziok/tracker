import styled from "styled-components";

const FontSizes = {
  "sm": "0.8rem",
  "md": "1.0rem",
  "lg": "1.5rem",
  "xl": "2.5rem",
} as const;

const ButtonSizes = {
  "auto": "auto",
  "full": "calc(100% - 1rem)"
}

type FontSize = keyof typeof FontSizes;
type ButtonSize = keyof typeof ButtonSizes;

const Button = styled("button")<{fontSize?: FontSize, buttonSize?: ButtonSize}>`
  width: ${props => ButtonSizes[props.buttonSize || "auto"]};
  font-size: ${props => FontSizes[props.fontSize || "md"]};
  padding: ${props => FontSizes[props.fontSize || "md"]};
  font-weight: bold;

  border: 0;
  box-shadow: none;
  border-radius: ${props => props.theme.roundness};
  background-color: ${props => props.theme.accent};
  color: ${props => props.theme.background};
  cursor: pointer;
  margin: 0.5rem;
  white-space: nowrap;
  opacity: 1.0;

  transition: opacity 0.05s ease-out;

  &:hover {
    opacity: 0.6;
  }
`;

export default Button;