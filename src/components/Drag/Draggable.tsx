import { FC, useContext } from "react";
import TaskPreview, { TaskPreviewProps } from "../Task/TaskPreview";
import { DragGroupContext } from "./DragGroup";

interface DraggableProps {
    childrenProps: TaskPreviewProps
}

const Draggable:FC<DraggableProps> = ({childrenProps}) => {
    const { draggedProps, onPicked} = useContext(DragGroupContext);

    if (draggedProps == childrenProps) return null;

    return (
        <div onMouseDown={() => onPicked(childrenProps)}>
            <TaskPreview task={childrenProps.task}/>
        </div>
    );
};

export default Draggable;