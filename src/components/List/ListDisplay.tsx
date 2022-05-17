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
import Button from "../Button/Button";
import styled from "styled-components";

const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

export const ListCard = styled(Card)`
  box-sizing: border-box;
  width: calc(250px + 4rem);
`;

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
    <DropZone onDroppedInZone={onDroppedInsideList}>
      <ListCard>
        <HeaderRow>
          <Header size="lg">{name}</Header>
          <Button fontSize="sm">Edit List</Button>
        </HeaderRow>
        { draggableTasks }
        <Button fontSize="lg" buttonSize="full">New Task +</Button>
      </ListCard>
    </DropZone>
  )
}

export default ListDisplay;