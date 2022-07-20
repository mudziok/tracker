import { configureStore } from '@reduxjs/toolkit'
import {undoableTrackerSlice } from './features/tracker/trackerSlice'

export const store = configureStore({
  reducer: {
      tracker: undoableTrackerSlice.reducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch