import { FC } from "react";
import Draggable from "../../contexts/Drag/Draggable";
import DropZone from "../../contexts/Drag/DropZone";
import Card from "../Card/Card";
import Header from "../Header/Header";
import Task from "../Task/Task";
import TaskPreview from "../Task/TaskPreview";

interface ListProps {
  name: string,
  tasks: Task[],
}

const List:FC<ListProps> = ({name, tasks}) => {
  
  const onDroppedInsideList = (dropped: JSX.Element) => {
    if (dropped.type === TaskPreview) {
      console.log(name, dropped);
    }
  }

  const draggableTasks = tasks.map(task => 
    <Draggable key={task.id}><TaskPreview task={task}/></Draggable>
  );

  return (
    <Card>
      <DropZone onDroppedInZone={onDroppedInsideList}>
        <Header size="lg">{name}</Header>
        { draggableTasks }
      </DropZone>
    </Card>
  )
}

export default List;