"use client";
import React from "react";
import HomeLogo from "../(assets)/(svg)/home-logo";
import Link from "next/link";
import TasksLogo from "../(assets)/(svg)/tasks-logo";
import AllNotesLogo from "../(assets)/(svg)/all-notes-logo";
import ExpenseLogo from "../(assets)/(svg)/expense-logo";
import PasswordLogo from "../(assets)/(svg)/password-logo";
import LogoutLogo from "../(assets)/logout";
import { redirect } from "next/navigation";
import { WarningNotify } from "../Helpers/popups";

const SideMenu = ({}) => {
  const [selected, _setSelect] = React.useState("home");

  React.useEffect(() => {
    const splitedURL = window.location.pathname.split("/");
    menuSelected(splitedURL[splitedURL.length - 1]);
  }, []);

  React.useEffect(() => {}, [selected]);

  const menuSelected = (menu) => {
    switch (menu) {
      case "home":
        return _setSelect(menu);
      case "dashboard":
        return _setSelect(menu);

      case "expenses":
        return _setSelect(menu);

      case "notes":
        return _setSelect(menu);

      case "tasks":
        return _setSelect(menu);

      case "passwords":
        return _setSelect(menu);

      default:
        break;
    }
  };

  return (
    <div className="flex flex-col justify-start h-screen shadow-xl">
      <div className="my-10 mx-auto text-theme-color font-bold text-xl">
        Note It Down
      </div>
      <div className="px-4 flex flex-col justify-between h-full ">
        <ul className="text-theme-color text-md">
          <Link href="/dashboard">
            <li
              id="home"
              className={
                selected == "home"
                  ? "flex p-2 px-4 rounded-lg bg-theme-color text-pure my-2"
                  : "flex p-4 hover:font-semibold"
              }
              onClick={() => menuSelected("home")}
            >
              <HomeLogo
                color={selected == "home" ? "#FFF" : "#5F65E7"}
                size="2"
              />
              <span className="ml-2">Home</span>
            </li>
          </Link>

          <Link href="/dashboard/expenses">
            <li
              className={
                selected == "expenses"
                  ? "flex p-2 px-4 rounded-lg bg-theme-color text-pure my-2"
                  : "flex p-4 hover:font-semibold cursor-pointer"
              }
              id="expenses"
              onClick={() => menuSelected("expenses")}
            >
              <ExpenseLogo
                color={selected == "expenses" ? "#FFF" : "#5F65E7"}
                size="2"
              />
              <span className="ml-2">Expenses</span>
            </li>
          </Link>

          <Link href="/dashboard/notes">
            <li
              className={
                selected == "notes"
                  ? "flex p-2 px-4 rounded-lg bg-theme-color text-pure my-2"
                  : "flex p-4 hover:font-semibold cursor-pointer"
              }
              id="notes"
              onClick={() => menuSelected("notes")}
            >
              <AllNotesLogo
                color={selected == "notes" ? "#FFF" : "#5F65E7"}
                size="2"
              />
              <span className="ml-2">Notes</span>
            </li>
          </Link>

          <Link href="/dashboard/tasks">
            <li
              className={
                selected == "tasks"
                  ? "flex p-2 px-4 rounded-lg bg-theme-color text-pure my-2"
                  : "flex p-4 hover:font-semibold cursor-pointer"
              }
              id="tasks"
              onClick={() => menuSelected("tasks")}
            >
              <TasksLogo
                color={selected == "tasks" ? "#FFF" : "#5F65E7"}
                size="2"
              />
              <span className="ml-2">Tasks</span>
            </li>
          </Link>

          <Link href="/dashboard/passwords">
            <li
              className={
                selected == "passwords"
                  ? "flex p-2 px-4 rounded-lg bg-theme-color text-pure my-2"
                  : "flex p-4 hover:font-semibold cursor-pointer"
              }
              id="passwords"
              onClick={() => menuSelected("passwords")}
            >
              <PasswordLogo
                color={selected == "passwords" ? "#FFF" : "#5F65E7"}
                size="2"
              />
              <span className="ml-2">Passwords</span>
            </li>
          </Link>
        </ul>

        <div className="just-center py-7 w-full ">
          <div
            className="bg-slate-200 px-5 py-2 items-center rounded-md flex flex-row gap-3 cursor-pointer"
            onClick={() => {
              WarningNotify("Logging you out");
              localStorage.clear();
              window.location.href = window.location.origin;
            }}
          >
            <div className="">
              <LogoutLogo />
            </div>
            <h1>Logout</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideMenu;
