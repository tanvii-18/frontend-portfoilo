import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTask,
  completeTask,
  deleteTask,
  editTask,
} from "./slices/todoSlice";

function App() {
  const [task, setTask] = useState("");
  const [EditTask, setEditTask] = useState(null);
  const currentDate = new Date();
  const date = currentDate.getDate();
  const month = currentDate.toLocaleString("en-US", { month: "long" });
  const year = currentDate.getFullYear();

  const tasks = useSelector((state) => state.todo.tasks);
  const dispatch = useDispatch();

  function getDaySuffix(day) {
    if (day > 3 && day < 21) return "th";
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  }

  const handleAddTask = () => {
    if (EditTask !== null) {
      dispatch(editTask({ i: EditTask, newTask: task }));
      console.log("got edit");
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
    setTask(tasks[i].task);
    setEditTask(i);
    console.log("worked edit");
  };

  const handleComplete = (id) => {
    dispatch(completeTask(id));
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-4xl m-2 text-blue-800">Good Morning, T !🌞</h2>

      <div>
        {/* todo date and time */}
        <div>
          <h2>Today's Tasks</h2>
          <p className="text-gray-400 text-[10px]">{`${date}${getDaySuffix(
            date
          )} ${month},${year}`}</p>
        </div>

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
              <div className="flex m-2 place-content-between" key={i}>
                <i onClick={() => handleComplete(el.id)}>
                  {el.completed ? (
                    <i class="fa-solid fa-circle-check"></i>
                  ) : (
                    <i className="fa-regular fa-circle"></i>
                  )}
                </i>

                <i key={i}>{el.task}</i>
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
