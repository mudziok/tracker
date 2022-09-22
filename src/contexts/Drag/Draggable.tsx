import {
  FC,
  useCallback,
  useContext,
  useRef,
  useEffect,
  MouseEvent,
} from 'react';
import { DragGroupContext, Offset } from './DragGroup';

interface DraggableProps {
  children: JSX.Element;
}

const Draggable: FC<DraggableProps> = ({ children }) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const { dragged, setDragged, setRect, setMousePosition } =
    useContext(DragGroupContext);

  const handleMouseDown = useCallback(
    (e: MouseEvent) => {
      const mousePosition: Offset = { left: e.pageX, top: e.pageY };
      if (elementRef.current) {
        const componentRect = elementRef.current.getBoundingClientRect();

        setDragged(children);
        setRect(componentRect);
        setMousePosition(mousePosition);
      }
    },
    [children, setDragged, setMousePosition, setRect],
  );

  useEffect(() => {
    const handleMovement = (e: any) => {
      const mousePosition: Offset = { left: e.pageX, top: e.pageY };
      if (elementRef.current && dragged) {
        setMousePosition(mousePosition);
      }
    };

    window.addEventListener('mousemove', handleMovement);
    return () => window.removeEventListener('mousemove', handleMovement);
  }, [dragged, setMousePosition]);

  if (dragged === children) return null;

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div onMouseDown={handleMouseDown} ref={elementRef}>
      {children}
    </div>
  );
};

export default Draggable;
