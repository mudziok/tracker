import React, { FC, useCallback, useState } from "react";
import styled from "styled-components";
import MouseFollow from "./MouseFollow";

interface DragGroupProps {
  children?: React.ReactNode,
}

export type Offset = {top: number, left: number};
export interface ComponentInfo {
  componentRect: DOMRect,
  mousePosition: Offset,
}

interface DragGroupContextProps {
  dragged: JSX.Element | null,
  onPicked: (component: JSX.Element, info: ComponentInfo) => void,
}

export const DragGroupContext = React.createContext<DragGroupContextProps>({
  dragged: null,
  onPicked: () => {},
});

const DragGroupDiv = styled.div`
  width: 100%;
  height: 100%;
`

const DragGroup:FC<DragGroupProps> = ({children}) => {
  const [dragged, setDragged] = useState<JSX.Element | null>(null);
  const [draggedInfo, setDraggedInfo] = useState<ComponentInfo | null>(null);

  const onPicked = useCallback((component: JSX.Element, info: ComponentInfo) => {
    setDragged(component);
    setDraggedInfo(info);
  }, []);

  const onReleased = useCallback(() => {
    setDragged(null);
    setDraggedInfo(null);
  }, []);

  return (
    <DragGroupContext.Provider value={{dragged, onPicked}}>
      <DragGroupDiv onMouseUp={onReleased}>
        { children }
        { (dragged && draggedInfo) &&
          <MouseFollow initialInfo={draggedInfo}>{ dragged }</MouseFollow>
        }
      </DragGroupDiv>
    </DragGroupContext.Provider>
  );
};

export default DragGroup;