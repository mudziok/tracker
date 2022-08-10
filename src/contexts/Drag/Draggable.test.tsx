import { fireEvent, render } from "@testing-library/react";
import Draggable from "./Draggable";
import DragGroup from "./DragGroup";
import DropZone from "./DropZone";

describe("Draggable", () => {
  const onDroppedInZone1 = jest.fn();
  const onDroppedInZone2 = jest.fn();

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
      </DragGroup>
    );

  it("is taken out of the DOM flow when picked up", () => {
    const { getByText } = renderTestSuite();

    expect(getByText("Dropzone 1")).toContainElement(getByText("element"));

    fireEvent.mouseDown(getByText("element"));
    expect(getByText("element")).toBeDefined();
    expect(getByText("Dropzone 1")).not.toContainElement(getByText("element"));
  });

  it("can be picked up and dropped in the same zone", () => {
    const { getByText } = renderTestSuite();

    fireEvent.mouseDown(getByText("element"));
    fireEvent.mouseUp(getByText("Dropzone 1"));

    expect(onDroppedInZone1).toBeCalledTimes(1);
    expect(onDroppedInZone2).toBeCalledTimes(0);
  });

  it("can be picked up and moved to another zone", () => {
    const { getByText } = renderTestSuite();

    fireEvent.mouseDown(getByText("element"));
    fireEvent.mouseUp(getByText("Dropzone 2"));

    expect(onDroppedInZone1).toBeCalledTimes(0);
    expect(onDroppedInZone2).toBeCalledTimes(1);
  });
});
