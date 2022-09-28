import { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { undo } from 'redux/tracker/trackerSlice';
import Button from 'components/Button';
import Card from 'components/Card';
import { FaUndo } from 'react-icons/fa';

export const Undo: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
        dispatch(undo());
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [dispatch]);

  return (
    <Card>
      <Button fontSize="lg" buttonSize="full" onClick={() => dispatch(undo())}>
        <FaUndo />
      </Button>
    </Card>
  );
};
