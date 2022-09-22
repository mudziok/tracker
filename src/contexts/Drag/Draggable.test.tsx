import { fireEvent, render } from '@testing-library/react';
import Draggable from './Draggable';
import DragGroup from './DragGroup';
import { DropZone } from './DropZone';
import { expect } from 'vitest';

describe('Draggable', () => {
  const onDroppedInZone1 = vi.fn();
  const onDroppedInZone2 = vi.fn();

  const renderTestSuite = () =>
    render(
      <DragGroup>
        <DropZone onDroppedInZone={onDroppedInZone1}>
          Dropzone 1
          <Draggable>
            <>element</>
          </Draggable>
        </DropZone>
        <DropZone onDroppedInZone={onDroppedInZone2}>Dropzone 2</DropZone>
      </DragGroup>,
    );

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('is taken out of the DOM flow when picked up', () => {
    const { getByText } = renderTestSuite();

    expect(getByText('Dropzone 1').textContent).toContain('element');

    fireEvent.mouseDown(getByText('element'));
    expect(getByText('element')).toBeDefined();
    expect(getByText('Dropzone 1').textContent).not.toContain('element');
  });

  it('can be picked up and dropped in the same zone', () => {
    const { getByText } = renderTestSuite();

    fireEvent.mouseDown(getByText('element'));
    fireEvent.mouseUp(getByText('Dropzone 1'));

    expect(onDroppedInZone1).toBeCalledTimes(1);
    expect(onDroppedInZone2).toBeCalledTimes(0);
  });

  it('can be picked up and moved to another zone', () => {
    const { getByText } = renderTestSuite();

    fireEvent.mouseDown(getByText('element'));
    fireEvent.mouseUp(getByText('Dropzone 2'));

    expect(onDroppedInZone1).toBeCalledTimes(0);
    expect(onDroppedInZone2).toBeCalledTimes(1);
  });
});
