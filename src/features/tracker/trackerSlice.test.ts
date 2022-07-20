import {trackerSlice, addTask, deleteTask, moveTask } from './trackerSlice'

const reducer = trackerSlice.reducer;

describe("Tracker Store", () => {

  const initialState = {
    lists: [
      {
        id: "list-1",
        name: "Filled List",
        tasks: [
          {id: "move", name: "Move this task", description: ""},
          {id: "delete", name: "Delete this task", description: ""},
        ],
      },
      {
        id: "list-2",
        name: "Empty List",
        tasks: [
        ],
      },
    ],
  };

  const exampleTask = {id: "example", name: "Use this task for testing", description: ""};

  it("can add a task to a list", () => {
    expect(reducer(initialState, addTask({list: initialState.lists[1], task: exampleTask}))).toEqual({
      lists: [
        {
          id: "list-1",
          name: "Filled List",
          tasks: [
            {id: "move", name: "Move this task", description: ""},
            {id: "delete", name: "Delete this task", description: ""},
          ],
        },
        {
          id: "list-2",
          name: "Empty List",
          tasks: [exampleTask],
        },
      ]
    });
  });

  it("can move a task from one list to another", () => {
    expect(reducer(initialState, moveTask({list: initialState.lists[1], task: initialState.lists[0].tasks[0]}))).toEqual({
      lists: [
        {
          id: "list-1",
          name: "Filled List",
          tasks: [{id: "delete", name: "Delete this task", description: ""}],
        },
        {
          id: "list-2",
          name: "Empty List",
          tasks: [{id: "move", name: "Move this task", description: ""}],
        },
      ]
    });
  });

  it("can delete a task", () => {
    expect(reducer(initialState, deleteTask({task: initialState.lists[0].tasks[1]}))).toEqual({
      lists: [
        {
          id: "list-1",
          name: "Filled List",
          tasks: [
            {id: "move", name: "Move this task", description: ""},
          ],
        },
        {
          id: "list-2",
          name: "Empty List",
          tasks: [],
        },
      ]
    });
  });
});