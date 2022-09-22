import { FC, useState } from 'react';
import styled from 'styled-components';
import { Offset } from './DragGroup';

interface MouseFollowProps {
  children: React.ReactNode;
  rect: DOMRect;
  mousePosition: Offset;
}

const Positioner = styled('div').attrs<{ offset: Offset }>((props) => ({
  style: {
    top: props.offset.top + 'px',
    left: props.offset.left + 'px',
  },
}))<{ offset: Offset }>`
  width: 200px;
  position: fixed;
  pointer-events: none;
`;

const MouseFollow: FC<MouseFollowProps> = ({
  children,
  rect,
  mousePosition,
}) => {
  const [initialMousePosition] = useState(mousePosition);

  const offset: Offset = {
    left: mousePosition.left - initialMousePosition.left + rect.left,
    top: mousePosition.top - initialMousePosition.top + rect.top,
  };

  return <Positioner offset={offset}>{children}</Positioner>;
};

export default MouseFollow;
