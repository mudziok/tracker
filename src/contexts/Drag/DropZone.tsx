import { FC, useCallback, useContext } from 'react';
import { DragGroupContext } from './DragGroup';

interface DropZoneProps {
  children: React.ReactNode;
  onDroppedInZone: (props: JSX.Element) => void;
}

const DropZone: FC<DropZoneProps> = ({ children, onDroppedInZone }) => {
  const { dragged } = useContext(DragGroupContext);

  const onMouseUp = useCallback(() => {
    if (dragged) onDroppedInZone(dragged);
  }, [dragged, onDroppedInZone]);

  // eslint-disable-next-line jsx-a11y/no-static-element-interactions
  return <div onMouseUp={onMouseUp}>{children}</div>;
};

export default DropZone;
