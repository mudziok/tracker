import { ChangeEvent, FC } from "react";
import { useDispatch } from "react-redux";
import {
  addTask,
  deleteList,
  editList,
  moveTask,
} from "../../features/tracker/trackerSlice";
import Draggable from "../../contexts/Drag/Draggable";
import DropZone from "../../contexts/Drag/DropZone";
import Card from "../Card/Card";
import Task from "../Task/Task";
import TaskPreview from "../Task/TaskPreview";
import List from "./List";
import Button from "../Button/Button";
import styled from "styled-components";
import { Input } from "../Input/Input";
import { nanoid } from "nanoid";

const HeaderRow = styled.div`
  margin: 0.5em;
`;

export const ListCard = styled(Card)`
  box-sizing: border-box;
  width: calc(250px + 4rem);
`;

const ListDisplay: FC<List> = (list) => {
  const { id, name, tasks } = list;
  const dispatch = useDispatch();

  const droppedInsideHandled = (dropped: JSX.Element) => {
    if (dropped.type === TaskPreview) {
      const task = dropped.props as Task;
      dispatch(moveTask({ task: task, list: list }));
    }
  };

  const changeName = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(editList({ id: id, list: { ...list, name: e.target.value } }));
  };

  const trashList = () => dispatch(deleteList({ id: id }));

  const newTask = () => {
    const emptyTask: Task = {
      id: nanoid(),
      name: "",
      description: "",
    };
    dispatch(addTask({ task: emptyTask, list: list }));
  };

  const draggableTasks = tasks.map((task) => (
    <Draggable key={task.id}>
      <TaskPreview {...task} />
    </Draggable>
  ));

  return (
    <DropZone onDroppedInZone={droppedInsideHandled}>
      <ListCard>
        <HeaderRow>
          <Input
            size="lg"
            placeholder="List name"
            value={name}
            onChange={changeName}
          />
        </HeaderRow>
        {draggableTasks}
        {tasks.length === 0 && (
          <Button fontSize="lg" buttonSize="full" onClick={trashList}>
            Delete List
          </Button>
        )}
        <Button fontSize="lg" buttonSize="full" onClick={newTask}>
          New Task +
        </Button>
      </ListCard>
    </DropZone>
  );
};

export default ListDisplay;
