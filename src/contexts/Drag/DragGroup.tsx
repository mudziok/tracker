import React, { FC, useCallback, useState } from 'react';
import styled from 'styled-components';
import MouseFollow from './MouseFollow';

interface DragGroupProps {
  children?: React.ReactNode;
}

export type Offset = { top: number; left: number };
export interface ComponentInfo {
  componentRect: DOMRect;
  mousePosition: Offset;
}

interface DragGroupContextProps {
  dragged: JSX.Element | null;
  rect: DOMRect | null;
  mousePosition: Offset | null;
  setDragged: React.Dispatch<React.SetStateAction<JSX.Element | null>>;
  setRect: React.Dispatch<React.SetStateAction<DOMRect | null>>;
  setMousePosition: React.Dispatch<React.SetStateAction<Offset | null>>;
}

export const DragGroupContext = React.createContext<DragGroupContextProps>({
  dragged: null,
  rect: null,
  mousePosition: null,
  setDragged: () => {},
  setRect: () => {},
  setMousePosition: () => {},
});

const DragGroupDiv = styled.div`
  width: 100%;
  height: 100%;
`;

const DragGroup: FC<DragGroupProps> = ({ children }) => {
  const [dragged, setDragged] = useState<JSX.Element | null>(null);
  const [rect, setRect] = useState<DOMRect | null>(null);
  const [mousePosition, setMousePosition] = useState<Offset | null>(null);

  const onReleased = useCallback(() => {
    setDragged(null);
    setRect(null);
    setMousePosition(null);
  }, []);

  return (
    <DragGroupContext.Provider
      value={{
        dragged,
        rect,
        mousePosition,
        setDragged,
        setRect,
        setMousePosition,
      }}
    >
      <DragGroupDiv onMouseUp={onReleased}>
        {children}
        {dragged && rect && mousePosition && (
          <MouseFollow rect={rect} mousePosition={mousePosition}>
            {dragged}
          </MouseFollow>
        )}
      </DragGroupDiv>
    </DragGroupContext.Provider>
  );
};

export default DragGroup;
