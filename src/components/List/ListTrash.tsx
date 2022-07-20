import { FC } from "react";
import { useDispatch } from "react-redux";
import DropZone from "../../contexts/Drag/DropZone";
import { deleteTask } from "../../features/tracker/trackerSlice";
import Header from "../Header/Header";
import Task from "../Task/Task";
import { ListCard } from "./ListDisplay"

const ListTrash:FC = () => {
  const dispatch = useDispatch();

  const onDroppedInside = (dropped: JSX.Element) => {
    const task: Task = dropped.props;
    dispatch(deleteTask({task: task}));
  };

  return (
    <DropZone onDroppedInZone={onDroppedInside}>
      <ListCard>
        <Header size="lg">Trash Can</Header>
      </ListCard>
    </DropZone>
  );
}

export default ListTrash;