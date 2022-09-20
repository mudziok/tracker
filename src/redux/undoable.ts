import { AnyAction, createSlice, original, Slice } from '@reduxjs/toolkit';

interface UndoableState<T> {
  past: Array<T>;
  present: T;
}

export const undoable = <SliceState>(slice: Slice<SliceState>) => {
  const initialUndoableState: UndoableState<SliceState> = {
    past: [],
    present: slice.getInitialState(),
  };

  const actionExistsInSlice = (action: AnyAction) => {
    const sliceActions = Object.values(slice.actions);
    const sliceActionTypes = sliceActions.map((action) => action.type);
    return sliceActionTypes.includes(action.type);
  };

  return createSlice({
    name: 'undoable',
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
      builder.addMatcher(actionExistsInSlice, (state, action) => {
        state.past.push(original(state.present)!);
        state.present = slice.reducer(
          original(state.present) as any,
          action,
        ) as any;
      });
    },
  });
};
