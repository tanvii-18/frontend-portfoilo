import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTask: (state, action) => {
      const newTask = {
        task: action.payload,
        complete: false,
      };
      state.tasks.push(newTask);
    },
    deleteTask: (state, action) => {
      state.tasks.splice(action.payload, 1);
    },
    editTask: (state, action) => {
      const { i, newTask } = action.payload;
      state.tasks[i].task = newTask;
    },
    completeTask: (state, action) => {
      const todos = state.tasks.find((task) => task.id === action.payload);
      if (todos) {
        todos.completed = !todos.completed;
      }
    },
  },
});

export const { addTask, deleteTask, editTask, completeTask } =
  todoSlice.actions;
export default todoSlice.reducer;
