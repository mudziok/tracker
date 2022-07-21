import { configureStore } from '@reduxjs/toolkit'
import { themeSlice } from './features/theme/themeSlice'
import {undoableTrackerSlice } from './features/tracker/trackerSlice'

export const store = configureStore({
  reducer: {
      tracker: undoableTrackerSlice.reducer,
      theme: themeSlice.reducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch