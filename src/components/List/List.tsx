import { FC } from "react";
import styled from "styled-components";
import Draggable from "../Drag/Draggable";
import DropZone from "../Drag/DropZone";
import Card from "../shared/Card";
import Header from "../shared/Header";
import TaskPreview from "../Task/TaskPreview";

interface ListProps {
  name: string
}

const NarrowCard = styled(Card)`
  width: 300px;
`;

const List:FC<ListProps> = ({name}) => {
  const mockTask = {name: "Mock name", description: "Mock description"};
  const mockTask2 = {name: "Mock name 2", description: "Mock description"};

  const onDroppedInsideList = (dropped: JSX.Element) => {
    if (dropped.type === TaskPreview) {
      console.log(name, dropped);
    }
  }

  return (
    <NarrowCard>
      <DropZone onDroppedInZone={onDroppedInsideList}>
        <Header size="lg">{name}</Header>
        <Draggable>
          <TaskPreview task={mockTask}/>
        </Draggable>
        <Draggable>
          <TaskPreview task={mockTask2}/>
        </Draggable>
      </DropZone>
    </NarrowCard>
  )
}

export default List;