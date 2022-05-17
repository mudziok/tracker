import styled from "styled-components";

const Card = styled("div")`
  background-color: ${props => props.theme.background};
  border: 3px solid ${props => props.theme.accent};
  border-radius: ${props => props.theme.roundness};
  height: auto;
  width: auto;

  padding: 0.5rem;
`

export default Card;