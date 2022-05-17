import { FC } from "react";
import styled from "styled-components";
import Card from "../Card/Card";
import Header from "../Header/Header";
import Task from "./Task";

const FixedWidthCard = styled(Card)`
  width: 250px;
  cursor: grab;
`;

const TaskPreview:FC<Task> = (task) => {
  const {name, description} = task;
  
  return (
    <FixedWidthCard>
      <Header size="md">{name}</Header>
      <p>{description}</p>
    </FixedWidthCard>
  );
};

export default TaskPreview;