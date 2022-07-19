import { FC, MouseEvent, ChangeEvent } from "react";
import styled from "styled-components";
import Card from "../Card/Card";
import Task from "./Task";
import Input from "../Input/Input";
import { useDispatch } from "react-redux";
import { editTask } from "../../features/tracker/trackerSlice";

const FixedWidthCard = styled(Card)`
  width: 250px;
  cursor: grab;

  p {
    margin: 0.5em 0;
  }
`;

const TaskPreview:FC<Task> = (task) => {
  const {id, name, description} = task;
  const dispatch = useDispatch();
  
  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => e.stopPropagation();
  
  const onNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(editTask({id: id, task: {...task, name: e.target.value}}));
  };

  return (
    <FixedWidthCard>
      <Input size="md" value={name} onChange={onNameChange} onMouseDown={handleMouseDown} />
      <p>{description}</p>
    </FixedWidthCard>
  );
};

export default TaskPreview;