import { FC, useCallback, useRef } from "react";
import styled from "styled-components";
import Card from "../Card/Card";

interface DialogProps {
  onBackgroundClick?: () => void,
  children: React.ReactNode,
}

const Background = styled.div`
  position: fixed;
  inset: 0;
  background-color: ${props => props.theme.primary + "40"};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DialogCard = styled(Card)`
  min-width: calc(480px * 0.9);
  width: max-content;

  @media (max-width: 480px) {
    width: 90%;
  }
`;

const Dialog:FC<DialogProps> = ({onBackgroundClick = ()=>{}, children}) => {
  const backgroundRef = useRef(null);

  const onClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === backgroundRef.current) { onBackgroundClick(); }
  }, [onBackgroundClick]);

  return (
    <Background onClick={onClick} ref={backgroundRef}>
      <DialogCard>
        {children}
      </DialogCard>
    </Background>  
  );
};

export default Dialog;