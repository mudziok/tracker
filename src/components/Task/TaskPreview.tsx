import { FC, MouseEvent } from "react";
import styled from "styled-components";
import Card from "../Card/Card";
import Task from "./Task";
import Input from "../Input/Input";

const FixedWidthCard = styled(Card)`
  width: 250px;
  cursor: grab;

  p {
    margin: 0.5em 0;
  }
`;

const TaskPreview:FC<Task> = (task) => {
  const {name, description} = task;
  
  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => e.stopPropagation();

  return (
    <FixedWidthCard>
      <Input size="md" value={name} onChange={()=>{}} onMouseDown={handleMouseDown}/>
      <p>{description}</p>
    </FixedWidthCard>
  );
};

export default TaskPreview;