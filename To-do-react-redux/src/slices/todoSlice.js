import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push("wake up at 6am");
    },
  },
});

export const { addTask } = todoSlice.actions;
export default todoSlice.reducer;
