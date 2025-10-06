import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, deleteTask, editTask } from "./slices/todoSlice";

function App() {
  const [task, setTask] = useState("");
  const [EditTask, setEditTask] = useState(null);

  const tasks = useSelector((state) => state.todo.tasks);
  const dispatch = useDispatch();

  const handleAddTask = () => {
    if (EditTask !== null) {
      dispatch(editTask({ i: EditTask, newTask: task }));
      setEditTask(null);
    } else {
      dispatch(addTask(task));
    }
    setTask("");
  };

  const handleDeleteTask = (index) => {
    dispatch(deleteTask(index));
  };

  const handleEdit = (i) => {
    setTask(tasks[i]);
    setEditTask(i);
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-4xl m-2 text-blue-800">Todoist</h2>

      <div>
        <input
          type="text"
          placeholder="Add task..."
          className="border-[1.3px] p-2 m-2 rounded-[2px]"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />

        <button
          className="border-[1.5px] rounded-2xl p-2 bg-blue-600 text-cyan-50 cursor-pointer"
          onClick={handleAddTask}
        >
          Add Task
        </button>

        {/* multiple task included */}
        <ul className="w-[100%] flex flex-col">
          {tasks.map((el, i) => {
            return (
              <div className="flex m-2 place-content-between">
                <li key={i}>{el}</li>

                {/* update task */}
                <div>
                  <button
                    className="bg-blue-300 rounded-2xl p-1 px-2 cursor-pointer"
                    onClick={() => handleEdit(i)}
                  >
                    Edit
                  </button>
                  {/* delete task */}
                  <button
                    className="bg-red-600 p-1 px-2 text-amber-50 rounded-3xl cursor-pointer"
                    onClick={() => handleDeleteTask(i)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
