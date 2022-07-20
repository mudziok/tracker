import { FC } from "react";
import { useDispatch } from "react-redux";
import DropZone from "../../contexts/Drag/DropZone";
import { deleteTask } from "../../features/tracker/trackerSlice";
import Card from "../Card/Card";
import Header from "../Header/Header";
import Task from "../Task/Task";
import { FaTrash } from "react-icons/fa"
import styled from "styled-components";

const CenteredCard = styled(Card)`
  display: flex;
  justify-content: center;
  align-items: center;
`

const ListTrash:FC = () => {
  const dispatch = useDispatch();

  const onDroppedInside = (dropped: JSX.Element) => {
    const task: Task = dropped.props;
    dispatch(deleteTask({task: task}));
  };

  return (
    <DropZone onDroppedInZone={onDroppedInside}>
      <CenteredCard>
        <Header size="lg"><FaTrash/></Header>
      </CenteredCard>
    </DropZone>
  );
}

export default ListTrash;