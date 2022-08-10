import styled from "styled-components";

const FontSizes = {
  sm: "1.0rem",
  md: "1.5rem",
  lg: "2.0rem",
  xl: "2.5rem",
} as const;

type fontSize = keyof typeof FontSizes;

const Header = styled("header")<{ size?: fontSize }>`
  color: ${(props) => props.theme.accent};
  font-weight: bold;
  font-size: ${(props) => FontSizes[props.size || "md"]};

  margin: 0.5rem 0;
`;

export default Header;
