import { FC, MouseEvent, ChangeEvent } from 'react';
import styled from 'styled-components';
import Card from 'components/Card';
import { Task } from 'components/Task/Task';
import { Input, TextArea } from 'components/Input';
import { useDispatch, useSelector } from 'react-redux';
import { editTask } from 'redux/tracker/trackerSlice';
import { FaArrowsAlt } from 'react-icons/fa';
import { Header } from 'components/Header';
import { selectIsCollapsed } from 'redux/theme/themeSlice';

const FixedWidthCard = styled(Card)`
  width: 250px;
  cursor: grab;
  display: flex;
`;

const Side = styled.div`
  width: 80%;
`;

const Grab = styled.div`
  width: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  color: ${(props) => props.theme.accent};
`;

const TaskPreview: FC<Task> = (task) => {
  const { id, name, description } = task;
  const dispatch = useDispatch();
  const isCollapsed = useSelector(selectIsCollapsed);

  const handleMouseDown = (e: MouseEvent) => e.stopPropagation();

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(editTask({ id, task: { ...task, name: e.target.value } }));
  };

  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(editTask({ id, task: { ...task, description: e.target.value } }));
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
        {isCollapsed && (
          <TextArea
            placeholder="Task description"
            value={description}
            onChange={handleDescriptionChange}
            onMouseDown={handleMouseDown}
          />
        )}
      </Side>
      <Grab>
        <Header size="lg">
          <FaArrowsAlt />
        </Header>
      </Grab>
    </FixedWidthCard>
  );
};

export default TaskPreview;
