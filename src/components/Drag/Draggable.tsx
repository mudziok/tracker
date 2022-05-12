import { FC, useContext } from "react";
import { DragGroupContext } from "./DragGroup";

interface DraggableProps {
  children: JSX.Element
}

const Draggable:FC<DraggableProps> = ({children}) => {
  const { dragged, onPicked } = useContext(DragGroupContext);

  if (dragged === children) return null;

  return (
    <div onMouseDown={() => onPicked(children)}>
      {children}
    </div>
  );
};

export default Draggable;