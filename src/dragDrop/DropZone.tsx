import { FC, ReactNode, useCallback, useContext, MouseEvent } from 'react';
import { DragGroupContext, Offset } from './DragGroup';

export interface DropZoneProps {
  children: ReactNode;
  onDroppedInZone: (props: JSX.Element) => void;
  onDragMove?: (props: JSX.Element, mousePosition: Offset) => void;
  onMouseEnter?: () => void;
}

export const DropZone: FC<DropZoneProps> = ({
  children,
  onDroppedInZone,
  onDragMove,
  onMouseEnter,
}) => {
  const { dragged, releaseDragged } = useContext(DragGroupContext);

  const onMouseUp = useCallback(
    (e: MouseEvent<HTMLElement>) => {
      e.stopPropagation();
      if (dragged) onDroppedInZone(dragged);
      releaseDragged();
    },
    [dragged, onDroppedInZone, releaseDragged],
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent<HTMLElement>) => {
      const mousePosition: Offset = { left: e.pageX, top: e.pageY };
      if (dragged && onDragMove) onDragMove(dragged, mousePosition);
    },
    [dragged, onDragMove],
  );

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      onMouseUp={onMouseUp}
      onMouseMove={handleMouseMove}
      onMouseEnter={onMouseEnter}
    >
      {children}
    </div>
  );
};
