import { FC, MouseEvent, ChangeEvent } from "react";
import styled from "styled-components";
import Card from "components/Card";
import Task from "components/Task/Task";
import { Input, TextArea } from "components/Input";
import { useDispatch } from "react-redux";
import { editTask } from "redux/tracker/trackerSlice";

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

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(editTask({ id: id, task: { ...task, name: e.target.value } }));
  };

  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
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
          onChange={handleNameChange}
          onMouseDown={handleMouseDown}
        />
        <TextArea
          placeholder="Task description"
          value={description}
          onChange={handleDescriptionChange}
          onMouseDown={handleMouseDown}
        />
      </Side>
    </FixedWidthCard>
  );
};

export default TaskPreview;
