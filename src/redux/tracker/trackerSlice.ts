import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import List from "components/List/List";
import Task from "components/Task/Task";
import { RootState } from "redux/store";
import { undoable } from "redux/undoable";

export interface TrackerState {
  lists: List[];
}

export const defaultTrackerState: TrackerState = {
  lists: [
    {
      id: "1",
      name: "Todo",
      tasks: [
        { id: "1", name: "Mock name", description: "Mock description" },
        { id: "2", name: "Mock name 2", description: "Mock description 2" },
      ],
    },
    {
      id: "2",
      name: "In Progress",
      tasks: [
        { id: "3", name: "Mock name 3", description: "Mock description 3" },
        { id: "4", name: "Mock name 4", description: "Mock description 4" },
      ],
    },
    {
      id: "3",
      name: "In QA",
      tasks: [
        { id: "5", name: "Mock name 3", description: "Mock description 3" },
        { id: "6", name: "Mock name 4", description: "Mock description 4" },
      ],
    },
    {
      id: "4",
      name: "Done",
      tasks: [
        { id: "7", name: "Mock name 3", description: "Mock description 3" },
        { id: "8", name: "Mock name 4", description: "Mock description 4" },
      ],
    },
  ],
};

const initialTrackerState: TrackerState = localStorage.getItem("tracker")
  ? JSON.parse(localStorage.getItem("tracker")!).present
  : defaultTrackerState;

export const trackerSlice = createSlice({
  name: "tracker",
  initialState: initialTrackerState,
  reducers: {
    addTask: (state, action: PayloadAction<{ task: Task; list: List }>) => {
      const { task: newTask, list: targetList } = { ...action.payload };

      const destinationList = state.lists.find(
        (list) => list.id === targetList.id
      );
      if (destinationList) {
        destinationList.tasks.push(newTask);
      }
    },
    moveTask: (state, action: PayloadAction<{ task: Task; list: List }>) => {
      const { task: movedTask, list: targetList } = { ...action.payload };

      state.lists = state.lists.map((list) => ({
        ...list,
        tasks: list.tasks.filter((task) => task.id !== movedTask.id),
      }));

      const destinationList = state.lists.find(
        (list) => list.id === targetList.id
      );
      if (destinationList) {
        destinationList.tasks.push(movedTask);
      }
    },
    editTask: (state, action: PayloadAction<{ id: string; task: Task }>) => {
      const { id, task: editedTask } = { ...action.payload };
      state.lists = state.lists.map((list) => ({
        ...list,
        tasks: list.tasks.map((task) => (task.id === id ? editedTask : task)),
      }));
    },
    deleteTask: (state, action: PayloadAction<{ task: Task }>) => {
      const { task: deletedTask } = { ...action.payload };

      state.lists = state.lists.map((list) => ({
        ...list,
        tasks: list.tasks.filter((task) => task.id !== deletedTask.id),
      }));
    },
    addList(state, action: PayloadAction<{ list: List }>) {
      state.lists.push(action.payload.list);
    },
    editList(state, action: PayloadAction<{ id: string; list: List }>) {
      const { id, list: editedList } = { ...action.payload };
      state.lists = state.lists.map((list) =>
        list.id === id ? editedList : list
      );
    },
    deleteList(state, action: PayloadAction<{ id: string }>) {
      state.lists = state.lists.filter((list) => list.id !== action.payload.id);
    },
  },
});

export const undoableTrackerSlice = undoable(trackerSlice);

export const selectLists = (state: RootState) => state.tracker.present.lists;

export const {
  addTask,
  moveTask,
  editTask,
  deleteTask,
  addList,
  editList,
  deleteList,
} = trackerSlice.actions;
export const { undo } = undoableTrackerSlice.actions;
