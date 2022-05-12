import React, { FC, useState } from "react";

interface DragGroupProps {
  children?: React.ReactNode,
}

interface DragGroupContextProps {
  dragged: JSX.Element | null,
  onPicked: (componentInfo: JSX.Element) => void,
}

export const DragGroupContext = React.createContext<DragGroupContextProps>({
  dragged: null,
  onPicked: () => {},
});

const DragGroup:FC<DragGroupProps> = ({children}) => {
  const [dragged, setDragged] = useState<JSX.Element | null>(null);

  const onPicked = (componentInfo: JSX.Element) => setDragged(componentInfo);
  const onReleased = () => {
    setDragged(null); 
  };

  return (
    <DragGroupContext.Provider value={{dragged: dragged, onPicked}}>
      <div onMouseUp={onReleased}>
        { children }
        Dragged:
        { dragged }
      </div>
    </DragGroupContext.Provider>
  );
};

export default DragGroup;