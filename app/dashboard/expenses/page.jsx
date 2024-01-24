"use client";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { API_URL } from "../../lib/constans";
import { getExpenses } from "@/app/lib/features/expenses/expensesSlice";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { ExpenseContext } from "@/app/lib/contexts/expensesContext";
import { useSelector } from "react-redux";
import groupArray from "group-array";
import ExpenseCard from "@/app/(components)/expense-card";
import Header from "@/app/(components)/header";
import FloatingButton from "@/app/(components)/floating-button";
import LoaderLogo from "@/app/Helpers/loader-logo";
import Loader from "@/app/(components)/loader-screen";
import { GetCurrentDate } from "@/app/Helpers/getDate";
import CloseButton from "@/app/Helpers/close-button";
import { getCategories } from "@/app/lib/features/categories/categoriesSlice";
import Colors from "@/app/Helpers/colors";
import { InfoNotify } from "@/app/Helpers/popups";
const Expenses = () => {
  const { expenses, isLoading } = useSelector((state) => state.expensesReducer);
  const { categories } = useSelector((state) => state.categoriesReducer);
  const dispatch = useAppDispatch();
  const [user, setUser] = React.useState();
  const [allData, setAllData] = useState([]);
  const [allDataTotal, setAllDataTotal] = useState([]);
  const [available_colors, setAvailable_colors] = useState([]);
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [showAddCategory, setShowAddCategory] = useState(false);

  React.useEffect(() => {
    const { data: user } = JSON.parse(localStorage.getItem("user"));
    setUser(user);
  }, []);

  React.useEffect(() => {
    if (user && expenses.length < 1) {
      getData();
    }
  }, [user]);

  const getData = async () => {
    dispatch(getExpenses(user.user_id));
    dispatch(getCategories(user.user_id));
  };
  React.useEffect(() => {
    setExpense();
  }, [expenses, categories]);

  const setExpense = async () => {
    const arr = expenses;
    const final = [];
    const final_totals = [];
    const group = groupArray(arr, "added_on");
    for (const key in group) {
      let temp = [];
      let total = 0;
      group[key].forEach((item) => {
        temp.push(item);
        total = total + Number(item.cost);
      });
      final.push(temp);
      final_totals.push(total);
    }

    setAllData(final.reverse());
    setAllDataTotal(final_totals.reverse());
  };

  const showAddCategoryPopup = () => {
    setShowAddExpense(false);
    setShowAddCategory(true);
  };
  return (
    <div className="w-full h-full overflow-hidden">
      <div className="py-10 px-8">
        <Header title="Expenses" />
      </div>
      {isLoading ? (
        <div className="absolute top-[50%] left-[50%] flex justify-center align-middle items-center">
          <Loader />
        </div>
      ) : (
        <div className="expense-section h-[80%] overflow-y-auto px-7 pt-3">
          {allData.map((data, index) =>
            data.length > 0 ? (
              <div
                key={Math.random()}
                className="bg-pure rounded-xl mb-7 p-5 transition-all hover:-translate-y-1 hover:shadow-md"
              >
                <div className="date-header">
                  <h1>{data[0].added_on.split("T")[0]} </h1>{" "}
                </div>
                <ExpenseCard data={data} />

                <div className="flex justify-between p-3">
                  <h1 className="head-18-semi">Total</h1>
                  <h1 className="head-18-bold">{allDataTotal[index]}/-</h1>
                </div>
              </div>
            ) : null
          )}
        </div>
      )}

      {showAddExpense && (
        <div className="dark-back">
          <AddExpensePopup
            reload={() => getData()}
            categories={categories}
            user={user}
            my_colors={available_colors}
            addCategory={() => showAddCategoryPopup()}
            close={() => setShowAddExpense(false)}
          />
        </div>
      )}
      {showAddCategory && (
        <div className="dark-back just-center">
          <AddCategoryPopup
            user={user}
            my_colors={available_colors}
            categories={categories}
            close={() => setShowAddCategory(false)}
          />
        </div>
      )}

      <div className="floating-button">
        <FloatingButton text="+" callback={() => setShowAddExpense(true)} />
      </div>
    </div>
  );
};
export default Expenses;

export const AddExpensePopup = (props) => {
  const [expense, setExpense] = useState("");
  const [selected_category, setSelected_category] = useState("");
  const [cost, setCost] = useState("");
  // const dispatch = useDispatch();

  const addNewExpense = async () => {
    if (expense.length < 1 || cost < 1 || !selected_category) {
      return alert("Invalid Data");
    }
    try {
      const getColor = props.categories.find(
        (item) => item.category == selected_category
      );
      const data = {
        user_id: props.user.user_id,
        expense_id: (Math.random() + 1).toString(36).substring(7),
        expense: expense,
        category: selected_category,
        cost: cost,
        color: getColor.color,
        //   added_on: GetCurrentDate(),
      };
      // console.log(data);

      const res = await axios.post(`${API_URL}/add-expense`, data);
      console.log(res);
      // dispatch(addExpense(data));
      props.close();

      props.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="add-note-popup bg-pure w-[800px] h-[380px] shadow-lg rounded-2xl p-10">
      <div className="just-space mb-2">
        <h1 className="text-lg font-semibold">Add New Expense +</h1>
        <CloseButton
          callback={() => {
            props.close();
          }}
        />
      </div>

      <div className="flex flex-col gap-4">
        <div className="">
          <label className="head-16-semi inline-block w-[200px]" htmlFor="">
            Expense
          </label>
          <span className="input-wrapper">
            <input
              value={expense}
              onChange={(e) => setExpense(e.target.value)}
              className="input-box head-16-semi"
              type="text"
            />
          </span>
        </div>

        <div className="">
          <label className="head-16-semi inline-block w-[200px]" htmlFor="">
            Cost
          </label>
          <span className="input-wrapper">
            <input
              value={cost}
              onChange={(e) => setCost(e.target.value)}
              className="input-box head-16-semi"
              type="number"
            />
          </span>
        </div>

        <div className="d-flex-center">
          <label className="head-16-semi inline-block w-[200px]" htmlFor="">
            Category
          </label>

          <select
            onChange={(e) => setSelected_category(e.target.value)}
            className="select-box head-16-semi"
          >
            <option value="" hidden>
              Select
            </option>

            {props.categories.map((item, index) => (
              <option
                key={item.color}
                style={{ background: `${item.color}`, padding: "5px 0" }}
                value={item.category}
              >
                {item.category}
              </option>
            ))}
          </select>

          <span className="button-wrapper">
            <button
              onClick={() => {
                props.addCategory();
              }}
              className="secondary_button mx-2"
            >
              {" "}
              +{" "}
            </button>
          </span>
        </div>

        <div className="">
          <label className="head-16-semi inline-block w-[200px]" htmlFor="" />
          <span className="button-wrapper">
            <button
              onClick={() => addNewExpense()}
              className="primary_button head-16-semi"
            >
              Add Expense
            </button>
          </span>
        </div>
      </div>
    </div>
  );
};

export const AddCategoryPopup = (props) => {
  const [new_category, setNew_category] = useState("");
  const [selectedColor, setSelectedColor] = useState("#F1F1F1");

  const addNewCategory = async () => {
    const categoryAlreadyInList = props.categories.find(
      (item) => item.category == new_category
    );

    const colorSelected = props.categories.find(
      (item) => item.color == selectedColor
    );

    if (!new_category || new_category.length < 2) {
      return alert("Invalid Data");
    } else if (categoryAlreadyInList) {
      return ErrorNotify("Category Already Exists");
    } else if (colorSelected) {
      return ErrorNotify("Select another color");
    }
    try {
      const data = {
        user_id: props.user.user_id,
        category_id: (Math.random() + 1).toString(36).substring(7),
        color: selectedColor,
        category: new_category,
        added_on: GetCurrentDate(),
      };
      // console.log(data);

      const res = await axios.post(`${API_URL}/add-category`, data);
      props.close();
      InfoNotify("New Category Added");
      // console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (Colors.length <= 0) alert("You can not add more categories");
  }, []);

  return (
    <div className="bg-pure w-[800px] h-[380px] shadow-lg rounded-2xl p-10">
      <div className="just-space">
        <h1 className="text-lg font-semibold">Add New Category +</h1>
        <CloseButton
          callback={() => {
            props.close();
          }}
        />
      </div>
      <div className="flex flex-col gap-5">
        <div className="">
          <label className="head-16-semi inline-block w-[200px]" htmlFor="">
            New Category
          </label>
          <span className="input-wrapper">
            <input
              value={new_category}
              onChange={(e) => setNew_category(e.target.value)}
              className="input-box head-16-semi"
              type="text"
            />
          </span>
        </div>

        <div className=" flex">
          <label className="head-16-semi inline-block w-[200px]" htmlFor="">
            Color
          </label>
          <span className="flex gap-2">
            {Colors.map((item, index) =>
              props.categories.find(
                (item2) => item2.color == item.color
              ) ? null : (
                <div
                  key={item.color}
                  onClick={() => setSelectedColor(item.color)}
                  style={{ backgroundColor: `${item.color}` }}
                  className={
                    item.color == selectedColor
                      ? "w-[40px] h-[40px] rounded-md shadow-sm border-2 border-theme-color"
                      : "w-[40px] h-[40px] rounded-md"
                  }
                />
              )
            )}
          </span>
        </div>

        <div className="">
          <label className="head-16-semi inline-block w-[200px]" htmlFor="" />
          <span className="button-wrapper">
            <button
              onClick={() => addNewCategory()}
              className="primary_button head-16-semi"
            >
              Add Category
            </button>
          </span>
        </div>
      </div>
    </div>
  );
};
