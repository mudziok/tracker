import { DragGroupContext } from 'dragDrop/DragGroup';
import { DropZone } from 'dragDrop/DropZone';
import { isInsideElement } from 'dragDrop/isInsideElement';
import { ComponentType, useCallback, useContext, useMemo, useRef } from 'react';
import styled, { css } from 'styled-components';

export const LeadingMargin = styled.div.attrs<{
  paddingTop: number;
  animate: boolean;
}>((props) => ({
  style: {
    paddingTop: `${props.paddingTop}px`,
  },
}))<{ paddingTop: number; animate: boolean }>`
  ${(props) =>
    props.animate &&
    css`
      transition: background-color 0.1s, color 0.1s, border-radius 0.1s,
        padding 0.1s;
    `}
`;

interface SortableProps<T extends { id: string }> {
  Component: ComponentType<T>;
  entries: Array<T>;
  onDroppedInZone: (element: JSX.Element, position: number) => void;
  gap?: number;
}

export function Sortable<T extends { id: string }>({
  Component,
  entries,
  onDroppedInZone,
  gap = 8,
}: SortableProps<T>) {
  const refs = useRef<Record<string, HTMLElement | null>>({});
  const { dragged, rect, mousePosition } = useContext(DragGroupContext);

  const children = useMemo(
    () =>
      entries
        .filter(({ id }) => id !== dragged?.props?.id)
        .map((entry) => (
          <LeadingMargin
            key={entry.id}
            animate={!!dragged}
            paddingTop={
              rect &&
              mousePosition &&
              isInsideElement(mousePosition, refs.current[entry.id])
                ? (rect.height || 0) + 2 * gap
                : gap
            }
            ref={(ref) => {
              refs.current[entry.id] = ref;
            }}
          >
            <Component {...entry} />
          </LeadingMargin>
        )),
    [entries, dragged, rect, mousePosition, Component, gap],
  );

  const handleDroppedInZone = useCallback(
    (element: JSX.Element) => {
      if (!rect || !mousePosition) return;

      const hoveredOverIndex = entries
        .filter(({ id }) => id !== dragged?.props?.id)
        .findIndex(({ id }) =>
          isInsideElement(mousePosition, refs.current[id]),
        );

      if (hoveredOverIndex === -1) return;
      onDroppedInZone(element, hoveredOverIndex);
    },
    [rect, mousePosition, entries, onDroppedInZone, dragged],
  );

  return <DropZone onDroppedInZone={handleDroppedInZone}>{children}</DropZone>;
}
