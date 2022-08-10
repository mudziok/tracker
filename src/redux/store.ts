import { configureStore } from "@reduxjs/toolkit";
import { themeSlice } from "./theme/themeSlice";
import { undoableTrackerSlice } from "./tracker/trackerSlice";

export const store = configureStore({
  reducer: {
    tracker: undoableTrackerSlice.reducer,
    theme: themeSlice.reducer,
  },
});

store.subscribe(() => {
  const slices = Object.entries(store.getState());
  slices.forEach(([name, state]) => {
    localStorage.setItem(name, JSON.stringify(state));
  });
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
