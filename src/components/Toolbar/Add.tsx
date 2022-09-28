import { nanoid } from 'nanoid';
import { FC, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { addList, deleteTask } from 'redux/tracker/trackerSlice';
import Button from 'components/Button';
import Card from 'components/Card';
import { Task } from 'components/Task/Task';
import { List } from 'components/List/List';
import { FaPlus } from 'react-icons/fa';
import { DropZone } from 'contexts/Drag/DropZone';

export const Add: FC = () => {
  const dispatch = useDispatch();

  const handleDroppedInside = useCallback(
    (dropped: JSX.Element) => {
      const task: Task = dropped.props;
      const newList: List = {
        name: '',
        id: nanoid(),
        tasks: [task],
      };
      dispatch(deleteTask({ task: task }));
      dispatch(addList({ list: newList }));
    },
    [dispatch],
  );

  const createNewList = useCallback(() => {
    const newList: List = {
      name: '',
      id: nanoid(),
      tasks: [],
    };
    dispatch(addList({ list: newList }));
  }, [dispatch]);

  return (
    <DropZone onDroppedInZone={handleDroppedInside}>
      <Card>
        <Button fontSize="lg" buttonSize="full" onClick={createNewList}>
          <FaPlus />
        </Button>
      </Card>
    </DropZone>
  );
};
