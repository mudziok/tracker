import React, { ChangeEvent, FC } from "react";
import { useDispatch } from "react-redux";
import { addTask, deleteList, deleteTask, editList } from "../../features/tracker/trackerSlice";
import Draggable from "../../contexts/Drag/Draggable";
import DropZone from "../../contexts/Drag/DropZone";
import Card from "../Card/Card";
import Task from "../Task/Task";
import TaskPreview from "../Task/TaskPreview";
import List from "./List";
import Button from "../Button/Button";
import styled from "styled-components";
import Input from "../Input/Input";

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
  const {id, name, tasks} = list;
  const dispatch = useDispatch();

  const onDroppedInsideList = (dropped: JSX.Element) => {
    if (dropped.type === TaskPreview) {
      const task = dropped.props as Task;
      dispatch(deleteTask({task: task}));
      dispatch(addTask({task: task, list: list}));
    }
  }

  const onNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(editList({id: id, list: {...list, name: e.target.value}}));
  };

  const onDeleteList = () => {
    dispatch(deleteList({id: id}));
  }

  const draggableTasks = tasks.map(task => 
    <Draggable key={task.id}><TaskPreview {...task}/></Draggable>
  );


  return (
    <DropZone onDroppedInZone={onDroppedInsideList}>
      <ListCard>
        <HeaderRow>
          <Input size="md" placeholder="List name" value={name} onChange={onNameChange}/>
        </HeaderRow>
        { draggableTasks }
        { tasks.length === 0 &&
          <Button fontSize="lg" buttonSize="full" onClick={onDeleteList}>Delete List</Button>
        }
        <Button fontSize="lg" buttonSize="full">New Task +</Button>
      </ListCard>
    </DropZone>
  )
}

export default ListDisplay;