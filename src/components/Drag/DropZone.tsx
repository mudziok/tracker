import { FC, useContext } from "react";
import { DragGroupContext } from "./DragGroup";

interface DropZoneProps {
  children: React.ReactNode,
  onDroppedInZone: (props: JSX.Element) => void,
};

const DropZone:FC<DropZoneProps> = ({children, onDroppedInZone}) => {
  const {dragged} = useContext(DragGroupContext);

  return (
    <div onMouseUp={() => onDroppedInZone(dragged!)}>
      {children}
    </div>
  );
};

export default DropZone;