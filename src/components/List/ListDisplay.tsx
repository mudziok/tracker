import { ChangeEvent, FC } from 'react';
import { useDispatch } from 'react-redux';
import {
  addTask,
  deleteList,
  editList,
  moveTask,
} from 'redux/tracker/trackerSlice';
import Draggable from 'dragDrop/Draggable';
import Card from 'components/Card';
import { Task } from 'components/Task/Task';
import TaskPreview from 'components/Task/TaskPreview';
import { List } from 'components/List/List';
import Button from 'components/Button';
import styled from 'styled-components';
import { Input } from 'components/Input';
import { nanoid } from 'nanoid';
import { Sortable } from 'dragDrop/Sortable';
import { DropZone } from 'dragDrop/DropZone';

const HeaderRow = styled.div`
  margin: 0.5em;
`;

const ListCard = styled(Card)`
  box-sizing: border-box;
  width: calc(253px + 3.5em);
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
      const listId = list.id;
      dispatch(moveTask({ task, listId, position }));
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
    const listId = list.id;
    dispatch(addTask({ task: emptyTask, listId }));
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
          <Sortable
            Component={DraggableTask}
            entries={tasks}
            onDroppedInZone={droppedInsideHandled}
          />
        </HeaderRow>
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
