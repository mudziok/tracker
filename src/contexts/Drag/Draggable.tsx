import { FC, useCallback, useContext, useRef, MouseEvent } from 'react';
import { ComponentInfo, DragGroupContext, Offset } from './DragGroup';

interface DraggableProps {
  children: JSX.Element;
}

const Draggable: FC<DraggableProps> = ({ children }) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const { dragged, onPicked } = useContext(DragGroupContext);

  const handleOnMouseDown = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      const mousePosition: Offset = { left: e.pageX, top: e.pageY };
      if (elementRef.current) {
        const componentRect = elementRef.current.getBoundingClientRect();

        const info: ComponentInfo = { componentRect, mousePosition };
        onPicked(children, info);
      }
    },
    [children, onPicked],
  );

  if (dragged === children) return null;

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div onMouseDown={handleOnMouseDown} ref={elementRef}>
      {children}
    </div>
  );
};

export default Draggable;
