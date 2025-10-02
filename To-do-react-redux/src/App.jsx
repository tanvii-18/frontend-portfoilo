import { useState } from "react";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    setTasks(task);
    setTask("");
  };

  return (
    <div className="flex flex-col items-center">
      <h2>Hello From To-do App</h2>

      <div>
        <input
          type="text"
          placeholder="Add task..."
          className="border-[1.3px] p-2 m-2 rounded-[2px]"
          onChange={(e) => setTask(e.target.value)}
        />

        <button
          className="border-[1.5px] rounded-2xl p-2 bg-blue-600 text-cyan-50 cursor-pointer"
          onClick={addTask}
        >
          Add Task
        </button>
        <p>{tasks}</p>
      </div>
    </div>
  );
}

export default App;
