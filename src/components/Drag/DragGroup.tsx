import React, { useState } from "react";
import { FC } from "react";
import TaskPreview, { TaskPreviewProps } from "../Task/TaskPreview";

interface DragGroupProps {
    children?: React.ReactNode
}

export const DragGroupContext = React.createContext({
    draggedProps: null as TaskPreviewProps | null,
    onPicked: (props: TaskPreviewProps) => {}
});

const DragGroup:FC<DragGroupProps> = ({children}) => {
    const [draggedProps, setDraggedProps] = useState<TaskPreviewProps | null>(null);

    const onPicked = (props: TaskPreviewProps) => setDraggedProps(props);
    const onReleased = () => {
        setDraggedProps(null); 
    };

    return (
        <DragGroupContext.Provider value={{draggedProps, onPicked}}>
            <div onMouseUp={onReleased}>
                {children}
                Dragged:
                { draggedProps &&
                    <TaskPreview {...draggedProps}/>
                }
            </div>
        </DragGroupContext.Provider>
    );
};

export default DragGroup;