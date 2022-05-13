import React, { FC, useState } from "react";
import MouseFollow from "./MouseFollow";

interface DragGroupProps {
  children?: React.ReactNode,
}

interface DragGroupContextProps {
  dragged: JSX.Element | null,
  onPicked: (componentInfo: JSX.Element, rect: DOMRect) => void,
}

export const DragGroupContext = React.createContext<DragGroupContextProps>({
  dragged: null,
  onPicked: () => {},
});

const DragGroup:FC<DragGroupProps> = ({children}) => {
  const [dragged, setDragged] = useState<JSX.Element | null>(null);
  const [initialRect, setInitialRect] = useState<DOMRect | null>(null);

  const onPicked = (componentInfo: JSX.Element, initialRect: DOMRect) => {
    setDragged(componentInfo);
    setInitialRect(initialRect);
  };
  
  const onReleased = () => {
    setDragged(null); 
  };

  return (
    <DragGroupContext.Provider value={{dragged: dragged, onPicked}}>
      <div onMouseUp={onReleased}>
        { children }
        { (dragged && initialRect) &&
          <MouseFollow initialRect={initialRect}>{ dragged }</MouseFollow>
        }
      </div>
    </DragGroupContext.Provider>
  );
};

export default DragGroup;