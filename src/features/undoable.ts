import { createSlice, original, Slice } from "@reduxjs/toolkit";

interface UndoableState<T> {
  past: Array<T>;
  present: T;
  future: Array<T>;
}

export const undoable = <SliceState>(slice: Slice<SliceState>) => {
  const initialUndoableState: UndoableState<SliceState> = {
    past: [],
    present: slice.getInitialState(),
    future: [],
  };

  return createSlice({
    name: "undoable",
    initialState: initialUndoableState,
    reducers: {
      undo: (state) => {
        const recentPast = state.past.pop();
        if (recentPast) {
          state.present = recentPast;
        }
      },
    },
    extraReducers: (builder) => {
      builder.addDefaultCase((state, action) => {
        state.past.push(original(state.present)!);
        state.present = slice.reducer(
          original(state.present) as any,
          action
        ) as any;
      });
    },
  });
};
