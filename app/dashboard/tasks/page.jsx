"use client";
import Header from "@/app/(components)/header";
import TaskCard from "@/app/(components)/task-card";
import { getTasks } from "@/app/lib/features/tasks/tasksSlice";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import React from "react";
import ArrowDown from "@/app/(assets)/(svg)/arrow-down.svg";
import Loader from "@/app/(components)/loader-screen";
import FloatingButton from "@/app/(components)/floating-button";
import CloseButton from "@/app/Helpers/close-button";
import Colors from "@/app/Helpers/colors";
import { API_URL } from "@/constants";
import axios from "axios";
import EyeLogo from "@/app/(assets)/(svg)/eye-logo";

const Tasks = () => {
  const { tasks, isLoading } = useAppSelector((state) => state.tasksReducer);
  const dispatch = useAppDispatch();
  const [search, setSearch] = React.useState("");
  const [user, setUser] = React.useState();
  const [showAddTasks, setShowAddTasks] = React.useState(false);
  const [addMore, setAddMore] = React.useState([]);
  const [selectedColor, setSelectedColor] = React.useState("F1F1F1");
  const [tasks_title, setTaskTitle] = React.useState([]);

  React.useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  React.useEffect(() => {
    if (user && tasks.length < 1) {
      console.log(isLoading);
      getData();
    }
  }, [user]);

  const getData = async () => {
    dispatch(getTasks(user.user_id));
  };

  const AddMoreInput = () => {
    // alert("ok");
    let arr = [...addMore];
    arr.push(1);
    setAddMore(arr);
  };
  const RemoveMoreInput = () => {
    // alert("ok");
    let arr = [...addMore];
    arr.pop(1);
    setAddMore(arr);
  };
  const addTask = async () => {
    try {
      const divs = document.getElementsByClassName("tasks");
      const Tasks = [];
      for (let i = 0; i < divs.length; i++) {
        if (divs[i].value == "") {
          return alert("Empty Task not allowed");
        }
        const obj = {
          task_id: (Math.random() + 1).toString(36).substring(7),
          label: divs[i].name,
          task: divs[i].value,
          status: false,
        };
        Tasks.push(obj);
      }
      const data = {
        user_id: user.user_id,
        tasks_id: (Math.random() + 1).toString(36).substring(7),
        tasks_title: tasks_title,
        color: selectedColor,
        Tasks: Tasks,
      };

      const res = await axios.post(`${API_URL}/add-tasks`, data);
      console.log(res);
      setShowAddTasks(false);
      getData();
    } catch (error) {
      console.log(error);
    }
  };

  if (tasks) {
    return (
      <div className="w-full h-full overflow-hidden">
        <div className="flex justify-between py-10 px-8">
          <Header title="Tasks" />
          <div className="flex flex-row justify-start">
            <input
              className="head-14-semi p-2"
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder="Search"
              value={search}
            />
          </div>
        </div>
        {isLoading ? (
          <div className="absolute top-[50%] left-[50%] flex justify-center align-middle items-center">
            <Loader />
          </div>
        ) : (
          <div className="tasks-section h-[85%] px-5 pt-2 overflow-y-auto">
            {tasks.length > 0 &&
              tasks.map((item) =>
                search != "" ? (
                  item.tasks_title
                    .toLowerCase()
                    .includes(search.toLowerCase()) ? (
                    <div key={Math.random()}>
                      <TaskContainer data={item} color={item.color} />
                    </div>
                  ) : null
                ) : (
                  <div key={Math.random()}>
                    <TaskContainer data={item} color={item.color} />
                  </div>
                )
              )}
          </div>
        )}
        <div className="floating-button">
          <FloatingButton text="+" callback={() => setShowAddTasks(true)} />
        </div>
        {showAddTasks ? (
          <div className="dark-back just-center">
            <div className="add-note-popup">
              <div className="note-popup-header just-space">
                <h1>Add New Task +</h1>
                <CloseButton
                  callback={() => {
                    setShowAddTasks(false);
                  }}
                />
              </div>

              <div className="flex flex-col gap-3">
                <div className=" m-yy-20">
                  <label
                    className="head-16-semi inline-block w-[100px]"
                    htmlFor=""
                  >
                    Tasks Title
                  </label>
                  <span className="input-wrapper">
                    <input
                      value={tasks_title}
                      onChange={(e) => setTaskTitle(e.target.value)}
                      className="input-box head-16-semi"
                      type="text"
                    />
                  </span>
                </div>

                <div className="d-flex-center flex my-2">
                  <label
                    className="head-16-semi inline-block w-[100px]"
                    htmlFor=""
                  >
                    Color
                  </label>

                  <span className="flex gap-2">
                    {Colors.map((item) => (
                      <div
                        key={item.color}
                        onClick={() => setSelectedColor(item.color)}
                        style={{ backgroundColor: `${item.color}` }}
                        className={
                          item.color === selectedColor
                            ? "w-[40px] h-[40px] rounded-md shadow-sm border-2 border-theme-color"
                            : "w-[40px] h-[40px] rounded-md transition-transform hover:-translate-y-1 hover:shadow-md"
                        }
                      />
                    ))}
                  </span>
                </div>

                <div className=" my-3">
                  <label
                    className="head-16-semi inline-block w-[100px]"
                    htmlFor=""
                  >
                    Task 1
                  </label>
                  <span className="input-wrapper">
                    <input
                      className="tasks input-box head-16-semi"
                      type="text"
                      name="task 1"
                    />
                  </span>
                  <span className="button-wrapper">
                    <button
                      onClick={() => AddMoreInput()}
                      className="secondary_button head-16-semi mx-3"
                    >
                      {" "}
                      +{" "}
                    </button>

                    {addMore.length >= 1 ? (
                      <button
                        onClick={() => RemoveMoreInput()}
                        className="secondary_button head-16-semi"
                      >
                        {" "}
                        -{" "}
                      </button>
                    ) : (
                      <button
                        disabled
                        className="secondary_button head-16-semi"
                      >
                        {" "}
                        -{" "}
                      </button>
                    )}
                  </span>
                </div>
                <div className="dynamic-input-div overflow-y-auto h-[100px]">
                  {addMore.map((item, index) => (
                    <div className=" my-2" key={index}>
                      <label
                        className="head-16-semi inline-block w-[100px]"
                        htmlFor=""
                      >
                        Task {index + 2}
                      </label>
                      <span className="input-wrapper">
                        <input
                          name={`task ${index + 2}`}
                          className="tasks input-box head-16-semi"
                          type="text"
                        />
                      </span>
                    </div>
                  ))}
                </div>
                <div className="just-space">
                  <div />
                  <span className="button-wrapper">
                    <button
                      onClick={() => addTask()}
                      className="primary_button head-16-semi"
                    >
                      Add Tasks
                    </button>
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
  } else return <div className="">loading...</div>;
};

const TaskContainer = ({ data, color }) => {
  const [showTasks, setShowTasks] = React.useState(false);
  return (
    <div
      className="tasks-container mb-6 rounded-lg p-7 transition-all hover:-translate-y-1 hover:shadow-md"
      style={{ backgroundColor: `${color}` }}
    >
      <div
        className="task-container-title just-space"
        onClick={() => setShowTasks(!showTasks)}
      >
        <h1 className="head-24-semi">{data.tasks_title}</h1>
        <div className="cursor-pointer">
          <EyeLogo show={showTasks} />
        </div>
      </div>
      <div className={showTasks ? "" : "hidden"}>
        {data.Tasks.map((item, index) => (
          <div key={index}>
            <TaskCard id={data.tasks_id} color={data.color} task={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tasks;
