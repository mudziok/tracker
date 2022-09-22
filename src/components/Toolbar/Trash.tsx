import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { DropZone } from '../../contexts/Drag/DropZone';
import { deleteTask } from '../../redux/tracker/trackerSlice';
import Card from '../Card';
import Header from '../Header';
import Task from '../Task/Task';
import { FaTrash } from 'react-icons/fa';
import styled from 'styled-components';

const CenteredCard = styled(Card)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Trash: FC = () => {
  const dispatch = useDispatch();

  const handleDroppedInside = (dropped: JSX.Element) => {
    const task: Task = dropped.props;
    dispatch(deleteTask({ task: task }));
  };

  return (
    <DropZone onDroppedInZone={handleDroppedInside}>
      <CenteredCard>
        <Header size="lg">
          <FaTrash />
        </Header>
      </CenteredCard>
    </DropZone>
  );
};
