import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import List from '../../components/List/List';
import Task from '../../components/Task/Task';
import { initialState } from './initialTrackerState';

export interface TrackerState {
  lists: List[],
}

export const trackerSlice = createSlice({
  name: 'tracker',
  initialState: initialState,
  reducers: {
    addTask: (state, action: PayloadAction<{task: Task, list: List}>) => {
      const {task: newTask, list: targetList} = {...action.payload};

      const destinationList = state.lists.find(list => list.id === targetList.id);
      if (destinationList) { destinationList.tasks.push(newTask); };
    },
    moveTask: (state, action: PayloadAction<{task: Task, list: List}>) => {
      const {task: movedTask, list: targetList} = {...action.payload};

      state.lists = state.lists.map(list => ({...list, tasks: list.tasks.filter(task => task.id !== movedTask.id)}));

      const destinationList = state.lists.find(list => list.id === targetList.id);
      if (destinationList) { destinationList.tasks.push(movedTask); };
    },
    deleteTask: (state, action: PayloadAction<{task: Task}>) => {
      const {task: deletedTask} = {...action.payload};

      state.lists = state.lists.map(list => ({...list, tasks: list.tasks.filter(task => task.id !== deletedTask.id)}));
    },
    addList(state, action: PayloadAction<{list: List}>) {
      state.lists.push(action.payload.list);
    },
    editList(state, action: PayloadAction<{id: string, list: List}>) {
      const {id, list: editedList} = {...action.payload};
      state.lists = state.lists.map(list => (list.id === id) ? editedList : list);
    },
    deleteList(state, action: PayloadAction<{id: string}>) {
      state.lists = state.lists.filter(list => list.id !== action.payload.id);
    }
  },
})

export const { addTask, moveTask, deleteTask, addList, editList, deleteList } = trackerSlice.actions

export default trackerSlice.reducer