import { Offset } from 'dragDrop/DragGroup';

export type HTMLElementOffsets = Pick<
  HTMLElement,
  'offsetTop' | 'offsetLeft' | 'offsetHeight' | 'offsetWidth'
>;

export const isInsideElement = (
  { top, left }: Offset,
  element: HTMLElementOffsets | null,
) => {
  if (!element) return false;

  const isInsideVertically =
    element.offsetTop <= top && top <= element.offsetTop + element.offsetHeight;
  const isInsideHorizontally =
    element.offsetLeft <= left &&
    left <= element.offsetLeft + element.offsetWidth;
  return isInsideVertically && isInsideHorizontally;
};
