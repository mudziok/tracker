import { FC } from "react";
import Card from "../Card/Card";
import Header from "../Header/Header";
import Task from "./Task";

export interface TaskPreviewProps {
  task: Task,
}

const TaskPreview:FC<TaskPreviewProps> = ({task}) => {
  const {name, description} = task;
  
  return (
    <Card>
      <Header size="md">{name}</Header>
      <p>{description}</p>
    </Card>
  );
};

export default TaskPreview;