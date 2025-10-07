import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },
    deleteTask: (state, action) => {
      state.tasks.splice(action.payload, 1);
    },
    editTask: (state, action) => {
      const { i, newTask } = action.payload;
      state.tasks[i] = newTask;
    },
    // completeTask: (state, action) => {
    //   const i = action.payload;
    //   state.tasks[i].complete = !state.tasks[i].complete;
    // },
  },
});

export const { addTask, deleteTask, editTask, completeTask } =
  todoSlice.actions;
export default todoSlice.reducer;
