import styled from 'styled-components';

const FontSizes = {
  sm: '1.0rem',
  md: '1.5rem',
  lg: '2.0rem',
  xl: '2.5rem',
} as const;

type fontSize = keyof typeof FontSizes;

export const Header = styled('header')<{ size?: fontSize }>`
  color: ${(props) => props.theme.accent};
  font-weight: bold;
  font-size: ${(props) => FontSizes[props.size || 'md']};
  line-height: 1em;

  margin: 0.5rem 0;
`;
