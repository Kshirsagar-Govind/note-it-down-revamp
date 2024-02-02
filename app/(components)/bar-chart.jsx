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
import LeftIcon from "@/app/(assets)/(svg)/left-icon";
import RightIcon from "@/app/(assets)/(svg)/right-icon";
import { useAppDispatch } from "../lib/hooks";
import { getExpenses } from "../lib/features/expenses/expensesSlice";
import { Months } from "../lib/constans";

const ExpenseGraph = () => {
  const [_final, _setFinal] = useState();
  const [_totalExpenseData, _setTotalExpensData] = useState([]);
  const [_data, _setData] = useState([]);
  const [_month, _setMonth] = useState([]);
  const [_slected_month, _setSelectMonth] = useState(new Date().getMonth());
  const [_slected_month_2, _setSelectMonth_2] = useState(new Date().getMonth());
  const [_year, _setYear] = useState(new Date().getFullYear());
  const { expenses, isLoading } = useSelector((state) => state.expensesReducer);
  const dispatch = useAppDispatch();
  const [user, setUser] = React.useState();

  useEffect(() => {
    user && setExpense(_slected_month);
  }, [expenses, user]);

  React.useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  useEffect(() => {
    if (user && expenses.length < 1) {
      getExpensesData(_slected_month);
    }
  }, [user]);

  const getExpensesData = async () => {
    try {
      dispatch(getExpenses(user.user_id));
      // setExpense();
    } catch (error) {
      console.log(error);
    }
  };

  const setExpense = (selected_month) => {
    let curr_date = new Date();
    _setData([]);
    const arr = expenses;
    const final = [];;
    _setSelectMonth_2(Months.find(it=>it.id==selected_month).name)
    while (
      curr_date.getFullYear() >= _year // false
    ) {
      let expenses = [];
      let temp_date = new Date();
      let month = selected_month
        ? selected_month
        : Number(curr_date.getMonth());
      temp_date.setFullYear(_year);
      temp_date.setDate(1);
      temp_date.setMonth(month);
      let dayscount =Months.find(it=>it.id==month).days;
      if(month==1) dayscount = _year%4==0?29:28;
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
              temp_date.getDate() &&
            new Date(arr[j].createdAt.split("T")[0]).getMonth() ==
              temp_date.getMonth() &&
            new Date(arr[j].createdAt.split("T")[0]).getFullYear() ==
              temp_date.getFullYear()
          ) {
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
  React.useEffect(() => {
    user && setExpense(0);
  }, [_year]);

  if (isLoading) {
    return <div className="">Loading</div>;
  } else
    return (
      <div className="">
        <div className="py-2 flex flex-row justify-between w-full">
          <div className="flex">
            <label htmlFor="" className="px-3 pr-4">
              Selected Month -
            </label>
            <p>
              {_slected_month_2}
            </p>
          </div>
          <div className="flex">
          <div className="">
            <label htmlFor="" className="px-3 pr-4">
              Month
            </label>
            <select
              name=""
              id=""
              className="px-2 py-1"
              onChange={(e) => setExpense(e.target.value)}
            >
              {Months.map((item, index) => {
                return <option key={item.id} value={item.id}>{item.name}</option>;
              })}
            </select>
          </div>
          <div className="flex items-center">
            <div className="" onClick={() => _setYear(_year - 1)}>
              <LeftIcon />
            </div>
            <h2>Year - {_year}</h2>
            {_year < new Date().getFullYear() && (
              <div className="" onClick={() => _setYear(_year + 1)}>
                <RightIcon />
              </div>
            )}
          </div>
          </div>
        </div>
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
