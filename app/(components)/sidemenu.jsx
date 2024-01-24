"use client";
import React from "react";
import HomeLogo from "../(assets)/(svg)/home-logo";
import Link from "next/link";
import TasksLogo from "../(assets)/(svg)/tasks-logo";
import AllNotesLogo from "../(assets)/(svg)/all-notes-logo";
import ExpenseLogo from "../(assets)/(svg)/expense-logo";
import PasswordLogo from "../(assets)/(svg)/password-logo";

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

      case "all_notes":
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
      <div className="px-4 ">
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

          {/* <Link href="/dashboard/notes">
                    <li
                        className={selected == 'all_notes' ? "flex p-2 px-4 rounded-lg bg-theme-color text-pure my-2" : "flex p-4 hover:font-semibold cursor-pointer"}

                        id='all_notes'
                        onClick={() => menuSelected('notes')}>
                        <AllNotesLogo color={selected == 'notes' ? "#FFF" : "#5F65E7"} size="2" />
                        <span className="ml-2">
                            All Notes
                        </span>
                    </li>
                </Link > */}

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
      </div>
    </div>
  );
};

export default SideMenu;
