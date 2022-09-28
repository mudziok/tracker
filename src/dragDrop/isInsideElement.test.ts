import { HTMLElementOffsets, isInsideElement } from 'dragDrop/isInsideElement';

describe('isInsideElement', () => {
  const element: HTMLElementOffsets = {
    offsetLeft: 100,
    offsetTop: 50,
    offsetWidth: 50,
    offsetHeight: 100,
  };

  it('returns false when cursor is in top left of element', () => {
    expect(isInsideElement({ top: 0, left: 0 }, element)).toEqual(false);
  });

  it('returns false when cursor is in bottom right of element', () => {
    expect(isInsideElement({ top: 200, left: 200 }, element)).toEqual(false);
  });

  it('returns true when cursor inside element', () => {
    expect(isInsideElement({ top: 125, left: 125 }, element)).toEqual(true);
  });

  it('returns true when cursor is on edge of an element', () => {
    expect(isInsideElement({ top: 100, left: 150 }, element)).toEqual(true);
  });
});
