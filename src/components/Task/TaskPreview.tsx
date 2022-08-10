import { FC, MouseEvent, ChangeEvent } from "react";
import styled from "styled-components";
import Card from "../Card/Card";
import Task from "./Task";
import { Input, TextArea } from "../Input/Input";
import { useDispatch } from "react-redux";
import { editTask } from "../../features/tracker/trackerSlice";

const FixedWidthCard = styled(Card)`
  width: 250px;
  cursor: grab;

  p {
    margin: 0.5em 0;
  }
`;

const Side = styled.div`
  width: 80%;
`;

const TaskPreview: FC<Task> = (task) => {
  const { id, name, description } = task;
  const dispatch = useDispatch();

  const handleMouseDown = (e: MouseEvent<any>) => e.stopPropagation();

  const onNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(editTask({ id: id, task: { ...task, name: e.target.value } }));
  };

  const onDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(
      editTask({ id: id, task: { ...task, description: e.target.value } })
    );
  };

  return (
    <FixedWidthCard>
      <Side>
        <Input
          size="md"
          placeholder="Task name"
          value={name}
          onChange={onNameChange}
          onMouseDown={handleMouseDown}
        />
        <TextArea
          placeholder="Task description"
          value={description}
          onChange={onDescriptionChange}
          onMouseDown={handleMouseDown}
        />
      </Side>
    </FixedWidthCard>
  );
};

export default TaskPreview;
