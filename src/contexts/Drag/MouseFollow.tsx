import { FC, useEffect, useState } from "react";
import styled from "styled-components";
import { ComponentInfo, Offset } from "./DragGroup";

interface MouseFollowProps {
  children: React.ReactNode,
  initialInfo: ComponentInfo,
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

const MouseFollow:FC<MouseFollowProps> = ({children, initialInfo}) => {
  const [currentMousePosition, setCurrentMousePosition] = useState<Offset>(initialInfo.mousePosition);

  useEffect(() => {
    const handleMovement = (e: MouseEvent) => setCurrentMousePosition({left: e.pageX, top: e.pageY});
    
    document.addEventListener("mousemove", handleMovement)
    return () => document.removeEventListener("mousemove", handleMovement);
  }, []);
  
  const offset: Offset = {
    left: currentMousePosition.left - initialInfo.mousePosition.left + initialInfo.componentRect.left,
    top: currentMousePosition.top - initialInfo.mousePosition.top + initialInfo.componentRect.top,
  }

  return (
    <Positioner offset={offset}>
        {children}
    </Positioner>
  )
};

export default MouseFollow;