import { FC } from "react";
import { useDispatch } from "react-redux";
import { moveTask } from "../../features/tracker/trackerSlice";
import Draggable from "../../contexts/Drag/Draggable";
import DropZone from "../../contexts/Drag/DropZone";
import Card from "../Card/Card";
import Header from "../Header/Header";
import Task from "../Task/Task";
import TaskPreview from "../Task/TaskPreview";
import List from "./List";

const ListDisplay:FC<List> = (list) => {
  const {name, tasks} = list;
  const dispatch = useDispatch();

  const onDroppedInsideList = (dropped: JSX.Element) => {
    if (dropped.type === TaskPreview) {
      const task = dropped.props as Task;
      dispatch(moveTask({task: task, list: list}));
    }
  }

  const draggableTasks = tasks.map(task => 
    <Draggable key={task.id}><TaskPreview {...task}/></Draggable>
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

export default ListDisplay;