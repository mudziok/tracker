import { FC, useContext } from "react";
import { TaskPreviewProps } from "../Task/TaskPreview";
import { DragGroupContext } from "./DragGroup";

interface DropZoneProps {
    children: React.ReactNode,
    onDroppedInZone: (props: TaskPreviewProps) => void,
};

const DropZone:FC<DropZoneProps> = ({children, onDroppedInZone}) => {
    const {draggedProps} = useContext(DragGroupContext);

    return (
        <div onMouseUp={() => onDroppedInZone(draggedProps!)}>
            {children}
        </div>
    );
};

export default DropZone;