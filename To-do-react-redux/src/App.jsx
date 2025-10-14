import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTask,
  completeTask,
  deleteTask,
  editTask,
} from "./slices/todoSlice";
import js from "@eslint/js";

function App() {
  const [task, setTask] = useState("");
  const [EditTask, setEditTask] = useState(null);
  const [toggleIcon, setToggleIcon] = useState(false);
  const [currentDate, setCurrentDate] = useState({
    date: "",
    month: "",
    year: "",
    currentHour: "",
  });
  const [updateHour, setUpdateHour] = useState("");

  useEffect(() => {
    const now = new Date();
    const hour = now.getHours();

    setCurrentDate({
      date: now.getDate(),
      month: now.toLocaleString("en-US", { month: "long" }),
      year: now.getFullYear(),
      currentHour: hour,
    });

    // Time of the day !!

    if (hour >= 6 && hour < 12) {
      setUpdateHour("Morning");
    } else if (hour >= 12 && hour < 18) {
      setUpdateHour("Afternoon");
    } else {
      setUpdateHour("Night");
    }
  }, []);

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
      setEditTask(null);
      setToggleIcon(false);
    } else if (task !== "") {
      dispatch(addTask(task));
      // setToggleIcon(false);
    }
    setTask("");
  };

  const handleDeleteTask = (index) => {
    dispatch(deleteTask(index));
  };

  const handleEdit = (i) => {
    setTask(tasks[i].task);
    setEditTask(i);
    setToggleIcon(true);
    console.log("worked edit");
  };

  const handleComplete = (id) => {
    dispatch(completeTask(id));
  };

  return (
    <div className="flex flex-col items-center my-2">
      <div>
        <h2 className="text-4xl my-2 text-blue-800">Good {updateHour}, T ! </h2>
        <p className="text-gray-400 text-[10px]">{`${
          currentDate.date
        }${getDaySuffix(currentDate.date)} ${currentDate.month},${
          currentDate.year
        }`}</p>
      </div>

      <div className="flex my-5">
        <input
          type="text"
          placeholder="Add task..."
          className="border-[1.3px] p-3 w-100 rounded-4xl border-[#155efc] shadow-[1px_1px_15px_rgba(0,81,255,0.1)] outline-none"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button
          className="rounded-4xl absolute right-[34%] p-3 bg-blue-600 text-cyan-50 cursor-pointer"
          onClick={handleAddTask}
        >
          {!toggleIcon ? (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 3.25C12.4142 3.25 12.75 3.58579 12.75 4V11.25H20C20.4142 11.25 20.75 11.5858 20.75 12C20.75 12.4142 20.4142 12.75 20 12.75H12.75V20C12.75 20.4142 12.4142 20.75 12 20.75C11.5858 20.75 11.25 20.4142 11.25 20V12.75H4C3.58579 12.75 3.25 12.4142 3.25 12C3.25 11.5858 3.58579 11.25 4 11.25H11.25V4C11.25 3.58579 11.5858 3.25 12 3.25Z"
                fill="#ffffff"
              />
            </svg>
          ) : (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.08828 6.41228C4.01598 6.31886 3.93772 6.2298 3.85387 6.14569C3.54169 5.83255 3.16058 5.59666 2.74097 5.45683L1.36317 5.00939C1.25698 4.97196 1.16502 4.90253 1.09998 4.81068C1.03493 4.71883 1 4.60908 1 4.49656C1 4.38404 1.03493 4.27429 1.09998 4.18244C1.16502 4.09058 1.25698 4.02116 1.36317 3.98372L2.74097 3.53628C3.15474 3.39352 3.52987 3.15705 3.837 2.84537C4.13572 2.54224 4.36226 2.17595 4.5 1.77372L4.51143 1.73963L4.95922 0.362894C4.99668 0.256782 5.06616 0.164895 5.15808 0.0998993C5.25 0.0349035 5.35984 0 5.47244 0C5.58505 0 5.69489 0.0349035 5.78681 0.0998993C5.87873 0.164895 5.94821 0.256782 5.98567 0.362894L6.43346 1.73963C6.5727 2.15819 6.80772 2.53853 7.11985 2.85041C7.43198 3.1623 7.8126 3.39715 8.23148 3.53628L9.60927 3.98372L9.63683 3.99061C9.74302 4.02804 9.83498 4.09747 9.90002 4.18932C9.96507 4.28117 10 4.39092 10 4.50344C10 4.61596 9.96507 4.72571 9.90002 4.81756C9.83498 4.90942 9.74302 4.97884 9.63683 5.01628L8.25903 5.46372C7.84016 5.60285 7.45953 5.8377 7.1474 6.14959C6.83528 6.46147 6.60025 6.84181 6.46101 7.26037L6.01323 8.63711C6.00919 8.64855 6.00477 8.65983 6 8.67093C5.96052 8.76273 5.89637 8.84212 5.81436 8.9001C5.72244 8.9651 5.61261 9 5.5 9C5.38739 9 5.27756 8.9651 5.18564 8.9001C5.09372 8.8351 5.02423 8.74322 4.98677 8.63711L4.53899 7.26037C4.43782 6.95331 4.28514 6.66664 4.08828 6.41228ZM11.7829 10.2132L11.0175 9.9646C10.7848 9.8873 10.5733 9.75683 10.3999 9.58356C10.2265 9.41029 10.0959 9.199 10.0186 8.96646L9.76982 8.20161C9.74901 8.14266 9.7104 8.09161 9.65934 8.0555C9.60827 8.01939 9.54725 8 9.48469 8C9.42213 8 9.36111 8.01939 9.31004 8.0555C9.25898 8.09161 9.22038 8.14266 9.19956 8.20161L8.9508 8.96646C8.87498 9.19736 8.74675 9.40761 8.57611 9.58076C8.40548 9.75392 8.19708 9.88529 7.9672 9.9646L7.20176 10.2132C7.14277 10.234 7.09168 10.2725 7.05554 10.3236C7.01941 10.3746 7 10.4356 7 10.4981C7 10.5606 7.01941 10.6216 7.05554 10.6726C7.09168 10.7236 7.14277 10.7622 7.20176 10.783L7.9672 11.0316C8.20032 11.1093 8.41205 11.2403 8.58548 11.4143C8.75891 11.5882 8.88926 11.8003 8.9661 12.0335L9.21487 12.7984C9.23569 12.8573 9.27429 12.9084 9.32535 12.9445C9.37642 12.9806 9.43744 13 9.5 13C9.56256 13 9.62358 12.9806 9.67465 12.9445C9.72571 12.9084 9.76431 12.8573 9.78513 12.7984L10.0339 12.0335C10.1113 11.801 10.2418 11.5897 10.4152 11.4164C10.5886 11.2432 10.8001 11.1127 11.0328 11.0354L11.7982 10.7868C11.8572 10.766 11.9083 10.7275 11.9445 10.6764C11.9806 10.6254 12 10.5644 12 10.5019C12 10.4394 11.9806 10.3784 11.9445 10.3274C11.9083 10.2764 11.8572 10.2378 11.7982 10.217L11.7829 10.2132ZM16.9518 4.10823L11.8641 9.19656L11.33 8.99903C11.2466 8.97548 11.1708 8.93069 11.11 8.86903C11.0572 8.80494 11.0196 8.72973 11 8.64903L10.8243 8.11497L15.8911 3.04764C17.2885 1.65003 19.5543 1.64997 20.9519 3.04749C22.3493 4.44489 22.3493 6.71051 20.952 8.108L20.0601 9.00003C21.3242 10.2697 21.3224 12.3236 20.055 13.5911L18.2715 15.3745C17.9786 15.6674 17.5038 15.6674 17.2109 15.3745C16.918 15.0816 16.918 14.6067 17.2109 14.3138L18.9943 12.5304C19.676 11.8488 19.6777 10.7446 18.9995 10.0608L9.00191 20.0595C8.59546 20.466 8.08418 20.7517 7.52498 20.8849L2.92373 21.9804C2.67037 22.0407 2.40385 21.9653 2.21968 21.7811C2.03552 21.597 1.96009 21.3304 2.02041 21.0771L3.116 16.4756C3.2491 15.9166 3.5347 15.4054 3.94103 14.9991L7.08121 11.8585L7.62 12.029C7.70104 12.0623 7.77553 12.1097 7.84 12.169C7.90377 12.2339 7.95168 12.3126 7.98 12.399L8.14369 12.9174L5.00175 16.0597C4.79168 16.2698 4.64402 16.534 4.57521 16.8231L3.76191 20.2389L7.17755 19.4257C7.46668 19.3568 7.73104 19.2091 7.94119 18.9989L19.8913 7.0474C20.7029 6.23571 20.7028 4.91979 19.8912 4.10815C19.0795 3.29644 17.7634 3.29648 16.9518 4.10823Z"
                fill="#ffffff"
              />
            </svg>
          )}
        </button>
      </div>

      <div className="w-[30%]">
        {/* multiple task included */}
        <ul className="w-[100%] flex flex-col items-start">
          {/* todo date and time */}
          <div>
            <h2>Today's Tasks</h2>
          </div>

          {/* list of todos */}
          {tasks.map((el, i) => {
            return (
              <div className="flex my-2 w-full gap-3" key={i}>
                <i onClick={() => handleComplete(el.id)}>
                  {el.completed ? (
                    <i class="fa-solid fa-circle-check"></i>
                  ) : (
                    <i className="fa-regular fa-circle"></i>
                  )}
                </i>

                {el.completed ? (
                  <i key={i} className="line-through text-gray-400">
                    {el.task}
                  </i>
                ) : (
                  <i key={i}>{el.task}</i>
                )}
                {/* update task */}
                <div className="w-full flex flex-row place-content-end gap-2">
                  <button
                    className="cursor-pointer"
                    onClick={() => handleEdit(i)}
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3.78181 16.3092L3 21L7.69086 20.2182C8.50544 20.0825 9.25725 19.6956 9.84119 19.1116L20.4198 8.53288C21.1934 7.75922 21.1934 6.5049 20.4197 5.73126L18.2687 3.58024C17.495 2.80658 16.2406 2.80659 15.4669 3.58027L4.88841 14.159C4.30447 14.7429 3.91757 15.4947 3.78181 16.3092Z"
                        stroke="#0b5eba"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M14 6L18 10"
                        stroke="#0b5eba"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </button>
                  {/* delete task */}
                  <button
                    className="cursor-pointer"
                    onClick={() => handleDeleteTask(i)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                    >
                      <g fill="none">
                        <path d="M24 0v24H0V0zM12.593 23.258l-.011.002-.071.035-.02.004-.014-.004-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01-.017.428.005.02.01.013.104.074.015.004.012-.004.104-.074.012-.016.004-.017-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113-.013.002-.185.093-.01.01-.003.011.018.43.005.012.008.007.201.093c.012.004.023 0 .029-.008l.004-.014-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014-.034.614c0 .012.007.02.017.024l.015-.002.201-.093.01-.008.004-.011.017-.43-.003-.012-.01-.01z" />
                        <path
                          fill="#ba0b0b"
                          d="M20 5a1 1 0 1 1 0 2h-1l-.003.071-.933 13.071A2 2 0 0 1 16.069 22H7.93a2 2 0 0 1-1.995-1.858l-.933-13.07A1.017 1.017 0 0 1 5 7H4a1 1 0 0 1 0-2zm-3.003 2H7.003l.928 13h8.138zM14 2a1 1 0 1 1 0 2h-4a1 1 0 0 1 0-2z"
                        />
                      </g>
                    </svg>
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
