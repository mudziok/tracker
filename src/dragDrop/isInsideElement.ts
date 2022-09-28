import { Offset } from 'dragDrop/DragGroup';

export const isInsideElement = (
  { top, left }: Offset,
  element: HTMLElement | null,
) => {
  if (!element) return false;

  const isInsideVertically =
    element.offsetTop < top && top < element.offsetTop + element.offsetHeight;
  const isInsideHorizontally =
    element.offsetLeft < left &&
    left < element.offsetLeft + element.offsetWidth;
  return isInsideVertically && isInsideHorizontally;
};
