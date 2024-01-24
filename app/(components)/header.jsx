import React, { Component } from "react";

import HomeLogo from "../(assets)/(svg)/home-logo";
import TasksLogo from "../(assets)/(svg)/tasks-logo";
import ExpenseLogo from "../(assets)/(svg)/expense-logo";
import ReminderLogo from "../(assets)/(svg)/reminder-logo";
import PasswordLogo from "../(assets)/(svg)/password-logo";
import AllNotesLogo from "../(assets)/(svg)/all-notes-logo";

const Header = ({ title }) => {
  return (
    <div className="items-center flex  mb-2 ro">
      <div className="logo">
        {title == "Home Page" ? (
          <HomeLogo color="#5F65E7" />
        ) : title == "All Notes" ? (
          <AllNotesLogo color="#5F65E7" />
        ) : title == "Tasks" ? (
          <TasksLogo color="#5F65E7" />
        ) : title == "Reminders" ? (
          <ReminderLogo color="#5F65E7" />
        ) : title == "Expenses" ? (
          <ExpenseLogo color="#5F65E7" />
        ) : (
          <PasswordLogo color="#5F65E7" />
        )}
      </div>

      <h1
      className="text-lg text-theme-color font-semibold pl-2"
      style={{textAlign: "center"}}
      >{title}</h1>
    </div>
  );
};

export default Header;
