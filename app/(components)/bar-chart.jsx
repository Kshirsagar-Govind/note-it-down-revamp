"use client";
import React, { Component, useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";

import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { CompaireTwoDate, setMonthName } from "../Helpers/getDate";
import { API_URL } from "@/constants";
import { useAppDispatch } from "../lib/hooks";
import { getExpenses } from "../lib/features/expenses/expensesSlice";

const ExpenseGraph = () => {
  const [_final, _setFinal] = useState();
  const [_totalExpenseData, _setTotalExpensData] = useState([]);
  const [_data, _setData] = useState([]);
  const [_month, _setMonth] = useState([]);
  const [_year, _setYear] = useState(new Date().getFullYear());
  const { expenses, isLoading } = useSelector((state) => state.expensesReducer);
  const dispatch = useAppDispatch();
  const [user, setUser] = React.useState();

  const setExpense = () => {
    let curr_date = new Date();
    curr_date.setFullYear(_year);
    const arr = expenses;
    const final = [];
    const regDate = user.reg_on.split("T")[0];
    while (
      // (curr_date.getMonth() + 1) >=
      // Number(data.reg_on.toLocaleString().split("/")[1]
      // )
      // &&
      curr_date.getFullYear() >= Number(regDate.substring(0, 4)) // false
    ) {
      let expenses = [];
      let temp_date = new Date();
      let month = Number(curr_date.getMonth());
      temp_date.setDate(1);
      temp_date.setMonth(month);
      let dayscount = month % 2 == 0 ? 31 : 30;
      dayscount = month == 1 ? 28 : dayscount;

      for (let i = 0; i < dayscount; i++) {
        expenses.push({
          month: setMonthName(month),
          name: `Day ${i + 1}`,
          expense: 0,
          list: [],
        });
      }

      while (temp_date.getDate() != dayscount) {
        let total = 0;

        for (let j = 0; j < arr.length; j++) {
          if (
            new Date(arr[j].createdAt.split("T")[0]).getDate() ==
            temp_date.getDate()
          ) {
            console.log("---------------------------------");
            total = total + Number(arr[j].cost);
            expenses[
              new Date(arr[j].createdAt.split("T")[0]).getDate() - 1
            ].expense = total;
            expenses[
              new Date(arr[j].createdAt.split("T")[0]).getDate() - 1
            ].list.push(arr[j]);
          }
        }

        temp_date.setDate(temp_date.getDate() + 1);
      }

      //
      final.push({ expenses });

      _setData(final[0]);
      _setMonth(final[0].expenses[0].month);
      curr_date.setMonth(curr_date.getMonth() - 1);
    }
  };
  useEffect(() => {
    user && setExpense();
  }, [expenses, user]);

  React.useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  useEffect(() => {
    if (user && expenses.length < 1) getExpensesData();
  }, [user]);

  const getExpensesData = async () => {
    try {
      dispatch(getExpenses(user.user_id));
      // setExpense();
    } catch (error) {
      console.log(error);
    }
  };
  if (isLoading) {
    return <div className="">Loading</div>;
  } else
    return (
      <div className="">
        <h4>Current Month - {_month}</h4> <br />
        <BarChart width={1200} height={350} data={_data.expenses} barSize={10}>
          <YAxis />
          <XAxis dataKey="name" />
          <Tooltip />
          <Legend />
          <Bar dataKey="expense" fill="#8884d8" />
        </BarChart>
      </div>
    );
};

export default ExpenseGraph;
