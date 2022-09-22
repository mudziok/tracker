import { ChangeEvent, FC } from 'react';
import { useDispatch } from 'react-redux';
import {
  addTask,
  deleteList,
  editList,
  moveTask,
} from 'redux/tracker/trackerSlice';
import Draggable from 'contexts/Drag/Draggable';
import Card from 'components/Card';
import Task from 'components/Task/Task';
import TaskPreview from 'components/Task/TaskPreview';
import List from 'components/List/List';
import Button from 'components/Button';
import styled from 'styled-components';
import { Input } from 'components/Input';
import { nanoid } from 'nanoid';
import { Sortable } from 'contexts/Drag/Sortable';
import { DropZone } from 'contexts/Drag/DropZone';

const HeaderRow = styled.div`
  margin: 0.5em;
`;

export const ListCard = styled(Card)`
  box-sizing: border-box;
  width: calc(250px + 4rem);
`;

const TaskContainer = styled.div`
  margin: 0.5em;
`;

const DraggableTask: FC<Task> = (task) => (
  <Draggable>
    <TaskPreview {...task} />
  </Draggable>
);

const ListDisplay: FC<List> = (list) => {
  const { id, name, tasks } = list;
  const dispatch = useDispatch();

  const droppedInsideHandled = (dropped: JSX.Element, position?: number) => {
    if (dropped.type === TaskPreview) {
      const task = dropped.props as Task;
      dispatch(moveTask({ task, list, position }));
    }
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(editList({ id, list: { ...list, name: e.target.value } }));
  };

  const addEmptyTask = () => {
    const emptyTask: Task = {
      id: nanoid(),
      name: '',
      description: '',
    };
    dispatch(addTask({ task: emptyTask, list }));
  };

  return (
    <ListCard>
      <DropZone onDroppedInZone={droppedInsideHandled}>
        <HeaderRow>
          <Input
            size="lg"
            placeholder="List name"
            value={name}
            onChange={handleNameChange}
          />
        </HeaderRow>
        <TaskContainer>
          <Sortable
            Component={DraggableTask}
            entries={tasks}
            onDroppedInZone={droppedInsideHandled}
          />
        </TaskContainer>
        {tasks.length === 0 && (
          <Button
            fontSize="lg"
            buttonSize="full"
            onClick={() => dispatch(deleteList({ id: id }))}
          >
            Delete List
          </Button>
        )}
        <Button fontSize="lg" buttonSize="full" onClick={addEmptyTask}>
          New Task +
        </Button>
      </DropZone>
    </ListCard>
  );
};

export default ListDisplay;
