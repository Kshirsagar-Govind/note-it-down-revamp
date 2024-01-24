import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import PasswordLogo from "../(assets)/(svg)/tasks-logo";
import Colors from "../Helpers/colors";
import { API_URL } from "@/constants";

const TaskCard = ({ id, color, task }) => {
  const dispatch = useDispatch();
  const [ checked, setChecked ] = useState(task.status);

  const updateStatus = async status => {
    // alert(status);
    setChecked(!status);
    const data = {
      id: id,
      task_id: task.task_id,
      status: !status,
    };

    const res = await axios.post(
      `${API_URL}/update-task-status`,
      data
    );
    // dispatch(updatetTaskStatus(data));
  };

  return (
    <div className="task-container flex justify-between items-center p-3 rounded-md align-middle bg-pure my-2">
      <div className="">
        <h1 className={checked ? "line-through" : "head-18-semi"}>
          {task.task}
        </h1>
      </div>
      <div className="task-options">
        {/* {checked ? <PasswordLogo color="#000" /> : null} */}
        <button
          style={
            checked ? (
              { backgroundColor: `${color}` }
            ) : (
              { backgroundColor: "#fff", border: `3px solid ${color}` }
            )
          }
          className={
            checked ? (
              "task-complete-button shadow-inner w-5 h-5 rounded-sm"
            ) : (
              "task-complete-button  w-5 h-5 rounded-sm"
            )
          }
          onClick={() => updateStatus(checked)}
        />
      </div>
    </div>
  );
};
export default TaskCard;

/*
   <input
            onChange={e => updateStatus(e.target.checked)}
            checked={false}
            type="checkbox"
          />
*/
