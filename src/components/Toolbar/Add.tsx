import { nanoid } from "nanoid";
import { FC, useCallback } from "react";
import { useDispatch } from "react-redux";
import DropZone from "../../contexts/Drag/DropZone";
import { addList, deleteTask } from "../../features/tracker/trackerSlice";
import Button from "../Button/Button";
import Card from "../Card/Card";
import Task from "../Task/Task";
import List from "../List/List";
import { FaPlus } from "react-icons/fa";

export const Add:FC = () => {
  const dispatch = useDispatch();

  const onDroppedInside = useCallback((dropped: JSX.Element) => {
    const task: Task = dropped.props;
    const newList: List = {
      name: "",
      id: (+new Date()).toString(36).slice(-5),
      tasks: [task],
    };
    dispatch(deleteTask({task: task}));
    dispatch(addList({list: newList}));
  }, [dispatch]);

  const onCreateList = useCallback(() => {
    const newList: List = {
      name: "",
      id: nanoid(),
      tasks: [],
    };
    dispatch(addList({list: newList}));
  }, [dispatch]);

  return (
    <DropZone onDroppedInZone={onDroppedInside}>
      <Card>
        <Button fontSize="lg" buttonSize="full" onClick={onCreateList}><FaPlus/></Button>
      </Card>
    </DropZone>
  );
}