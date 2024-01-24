"use client";
import FloatingButton from "@/app/(components)/floating-button";
import Header from "@/app/(components)/header";
import Loader from "@/app/(components)/loader-screen";
import PasswordCard from "@/app/(components)/password-card";
import CloseButton from "@/app/Helpers/close-button";
import { ErrorNotify, SuccessNotify } from "@/app/Helpers/popups";
import { getPasswords } from "@/app/lib/features/passwords/passwordsSlice";
import { getTasks } from "@/app/lib/features/tasks/tasksSlice";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { API_URL } from "@/constants";
import axios from "axios";
import React from "react";

const Passwords = () => {
  const { passwords, isLoading } = useAppSelector(
    (state) => state.passwordsReducer
  );
  const dispatch = useAppDispatch();
  const [search, setSearch] = React.useState("");
  const [user, setUser] = React.useState();
  const [showAddPassword, setShowAddPassword] = React.useState(false);
  const [label, setLabel] = React.useState("");
  const [password_category, setPasswordCategory] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [c_password, setConfirmPassword] = React.useState("");

  React.useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  React.useEffect(() => {
    if (user && passwords.length < 1) getData();
  }, [user]);
  React.useEffect(() => {}, [passwords]);

  const getData = async () => {
    dispatch(getPasswords(user.user_id));
  };

  const addNewPassword = async () => {
    if (c_password !== password) {
      return alert("Password Not Matching");
    }
    try {
      const data = {
        user_id: user.user_id,
        label: label,
        password_category: password_category,
        password: password,
      };

      const res = await axios.post(`${API_URL}/add-password`, data);
      SuccessNotify("New Password Added!");
      setShowAddPassword(false);
      getData();
    } catch (error) {
      console.log(error);
      ErrorNotify("Failed to add new password!");
    }
  };

  return (
    <div className="w-full h-full overflow-hidden">
      <div className="flex justify-between py-10 px-8">
        <Header title="Passwords" />
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
      {isLoading && (
        <div className="absolute top-[50%] left-[50%] flex justify-center align-middle items-center">
          <Loader />
        </div>
      )}

      <div className="passwords-section h-[80%] px-5 pt-2 overflow-y-auto ">
        {passwords.map((item) =>
          search != "" ? (
            item.label.toLowerCase().includes(search.toLowerCase()) ? (
              <div key={Math.random()}>
                <PasswordCard
                  data={item}
                  Severity={item.password_category}
                  reload={() => getData()}
                />
              </div>
            ) : null
          ) : (
            <div key={Math.random()}>
              <PasswordCard
                data={item}
                Severity={item.password_category}
                reload={() => getData()}
              />
            </div>
          )
        )}
      </div>
      <div className="floating-button">
        <FloatingButton text="+" callback={() => setShowAddPassword(true)} />
      </div>
      {showAddPassword ? (
        <div className="dark-back just-center">
          <div className="add-note-popup">
            <div className="just-space">
              <h1>Add New Password +</h1>
              <CloseButton
                callback={() => {
                  setShowAddPassword(false);
                }}
              />
            </div>
            <br />
            <div className="note-popup-form flex flex-col gap-3">
              <div className=" m-yy-20">
                <label
                  className="head-16-semi inline-block w-[200px]"
                  htmlFor=""
                >
                  Password For
                </label>
                <span className="input-wrapper">
                  <input
                    value={label}
                    onChange={(e) => setLabel(e.target.value)}
                    className="input-box head-16-semi"
                    type="text"
                  />
                </span>
              </div>

              <div className=" m-yy-20">
                <label
                  className="head-16-semi inline-block w-[200px]"
                  htmlFor=""
                >
                  Enter Password
                </label>
                <span className="input-wrapper">
                  <input
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-box head-16-semi"
                    type="password"
                  />
                </span>
              </div>

              <div className=" m-yy-20">
                <label
                  className="head-16-semi inline-block w-[200px]"
                  htmlFor=""
                >
                  Confirm Password
                </label>
                <span className="input-wrapper">
                  <input
                    value={c_password}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="input-box head-16-semi"
                    type="password"
                  />
                </span>
              </div>
              <div className="d-flex-center m-yy-20">
                <label
                  className="head-16-semi inline-block w-[200px]"
                  htmlFor=""
                >
                  Severity
                </label>

                <select
                  value={password_category}
                  onChange={(e) => setPasswordCategory(e.target.value)}
                  className="select-box head-16-semi"
                >
                  <option value="" hidden>
                    Select{" "}
                  </option>
                  <option value="High">High </option>
                  <option value="Medium">Medium </option>
                  <option value="Low">Low </option>
                </select>
              </div>
            </div>

            <div className=" my-2">
              <label
                className="head-16-semi inline-block w-[200px]"
                htmlFor=""
              />
              <span className="button-wrapper">
                <button
                  onClick={() => addNewPassword()}
                  className="primary_button head-16-semi"
                >
                  Add Password
                </button>
              </span>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Passwords;
