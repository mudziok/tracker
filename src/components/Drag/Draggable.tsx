import { FC, useContext, useRef } from "react";
import { DragGroupContext } from "./DragGroup";

interface DraggableProps {
  children: JSX.Element
}

const Draggable:FC<DraggableProps> = ({children}) => {
  const elementRef = useRef<HTMLDivElement>(null)
  const { dragged, onPicked } = useContext(DragGroupContext);

  if (dragged === children) return null;

  const handleOnMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = elementRef.current?.getBoundingClientRect()!;
    onPicked(children, rect);
  }

  return (
    <div onMouseDown={handleOnMouseDown} ref={elementRef}>
      {children}
    </div>
  );
};

export default Draggable;