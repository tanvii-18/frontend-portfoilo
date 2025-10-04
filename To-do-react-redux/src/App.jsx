import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "./slices/todoSlice";

function App() {
  const tasks = useSelector((state) => state.todo.tasks);
  const dispatch = useDispatch();

  const handleAddTask = () => {
    dispatch(addTask());
  };
  return (
    <div className="flex flex-col items-center">
      <h2>Hello From To-do App</h2>

      <div>
        <input
          type="text"
          placeholder="Add task..."
          className="border-[1.3px] p-2 m-2 rounded-[2px]"
        />

        <button
          className="border-[1.5px] rounded-2xl p-2 bg-blue-600 text-cyan-50 cursor-pointer"
          onClick={handleAddTask}
        >
          Add Task
        </button>

        {/* multiple task included */}
        <ul>
          {tasks.map((el, i) => {
            return <li key={i}>{el}</li>;
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
