import { FC, useEffect, useState } from "react";
import styled from "styled-components";

interface MouseFollowProps {
  children: React.ReactNode,
  initialRect: DOMRect,
}

type Offset = {
  left: number,
  top: number,
}

const Positioner = styled("div").attrs<{offset: Offset}>(props => ({
    style: {
      top: props.offset.top + "px",
      left: props.offset.left + "px",
    },
}))<{offset: Offset}>`
  width: 200px;
  position: fixed;
  pointer-events: none;
`

const MouseFollow:FC<MouseFollowProps> = ({children, initialRect}) => {
  const [grabOffset, setGrabOffset] = useState<Offset>({left: 0, top: 0});

  useEffect(() => {
    const handleMovement = (e: MouseEvent) => setGrabOffset(({left, top}) => ({left: left + e.movementX, top: top + e.movementY}));
    
    document.addEventListener("mousemove", handleMovement)
    return () => document.removeEventListener("mousemove", handleMovement);
  }, []);
  
  return (
    <Positioner offset={{top: initialRect.top + grabOffset.top, left: initialRect.left + grabOffset.left}}>
        {children}
    </Positioner>
  )
};

export default MouseFollow;