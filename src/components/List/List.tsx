import { FC } from "react";
import styled from "styled-components";
import Draggable from "../Drag/Draggable";
import DropZone from "../Drag/DropZone";
import Card from "../shared/Card";
import Header from "../shared/Header";

interface ListProps {
    name: string
}

const NarrowCard = styled(Card)`
    width: 300px;
`;

const List:FC<ListProps> = ({name}) => {
    const mockTask = {name: "Mock name", description: "Mock description"};
    const mockTask2 = {name: "Mock name 2", description: "Mock description"};

    return (
        <NarrowCard>
            <DropZone onDroppedInZone={(props)=>{console.log(name, props)}}>
                <Header size="lg">{name}</Header>
                <Draggable childrenProps={{task: mockTask}} />
                <Draggable childrenProps={{task: mockTask2}} />
            </DropZone>
        </NarrowCard>
    )
}

export default List;