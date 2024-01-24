"use client";
import React, { ReactHTMLElement, useRef } from "react";
import "../globals.css";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../lib/features/auth/authSlice";
import { useAppDispatch, useAppSelector, useAppStore } from "../lib/hooks";
import { redirect } from "next/navigation";
import { getExpenses } from "../lib/features/expenses/expensesSlice";
import { getNotes } from "../lib/features/notes/notesSlice";
import { getPasswords } from "../lib/features/passwords/passwordsSlice";
import { getTasks } from "../lib/features/tasks/tasksSlice";
import Loader from "../(components)/loader-screen";
import { API_URL } from "@/constants";
import { ErrorNotify, SuccessNotify, WarningNotify } from "../Helpers/popups";
import axios from "axios";
/*
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            reg_on: req.body.reg_on,

*/

const Authenticate = () => {
  React.useEffect(() => {
    let oktogo = false;
    try {
      const data = JSON.parse(localStorage.getItem("user"));
      if (data) oktogo = true;
    } catch (error) {
      console.log(error);
    }
    oktogo && redirect("/dashboard");
  }, []);

  return (
    <div className="py-10">
      <h1 className="text-center text-2xl text-theme-color">
        Welcome to Note It Down
      </h1>
      <div className="flex justify-around py-10">
        <Login />
        <Registration />
      </div>
    </div>
  );
};

const Registration = () => {
  const [formValues, _setFormValues] = React.useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const handleOnChange = (name, value) => {
    _setFormValues({ ...formValues, [name]: value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    let oktogo = false;
    try {
      const res = await axios.post(`${API_URL}/register-user`, formValues);
      if (res.status == 200) {
        SuccessNotify("Registered Successfully!");
        console.log(res);
        oktogo = true
        localStorage.setItem("user", JSON.stringify(res.data));
        window.location.reload()
      }
    } catch (error) {
      ErrorNotify("Registration Failed!");
    }
    console.log(formValues,oktogo);
  };

  return (
    <div className="">
      <div className="text-center">
        <h1 className="text-2xl">Registration</h1>
      </div>
      <form onSubmit={onSubmit} className="reg-form">
        <div className="flex flex-col my-3">
          <label className="">Name</label>
          <input
            name="name"
            type="text"
            className="px-2 py-2 border-2 border-theme-color rounded-md mt-1"
            value={formValues.name}
            onChange={(e) => handleOnChange(e.target.name, e.target.value)}
          />
        </div>

        <div className="flex flex-col my-3">
          <label className="">Email</label>
          <input
            name="email"
            type="email"
            className="px-2 py-2 border-2 border-theme-color rounded-md mt-1"
            value={formValues.email}
            onChange={(e) => handleOnChange(e.target.name, e.target.value)}
          />
        </div>
        <div className="flex flex-col my-3">
          <label className="">Password</label>
          <input
            type="password"
            name="password"
            className="px-2 py-2 border-2 border-theme-color rounded-md mt-1"
            value={formValues.password}
            onChange={(e) => handleOnChange(e.target.name, e.target.value)}
          />
        </div>

        <div className="flex flex-col my-3">
          <label className="">Confirm Password</label>
          <input
            type="password"
            name="confirm_password"
            className="px-2 py-2 border-2 border-theme-color rounded-md mt-1"
            value={formValues.confirm_password}
            onChange={(e) => handleOnChange(e.target.name, e.target.value)}
          />
        </div>
        <div className="transition-all hover:-translate-y-1 hover:shadow-md cursor-pointer bg-theme-color my-5 px-4 py-4 text-center rounded-md text-pure font-bold">
          <input type="submit" className="" value="Register" />
        </div>
        {/* <h3>
                    Test Account
                    <br />
                    [username - test@mail.com] <br /> [password - 12345]
                </h3> */}
      </form>
    </div>
  );
};

const Login = () => {
  const store = useAppStore();
  const initialized = useRef(false);
  const dispatch = useAppDispatch();
  const [formValues, _setFormValues] = React.useState({
    email: "",
    password: "",
  });
  const { username, user_id, isLoading, isError } = useSelector(
    (state) => state.authReducer
  );

  const handleOnChange = (name, value) => {
    _setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(userLogin(formValues));
  };

  React.useEffect(() => {
    if (user_id) {
      dispatch(getExpenses(user_id));
      dispatch(getNotes(user_id));
      dispatch(getPasswords(user_id));
      dispatch(getTasks(user_id));
      SuccessNotify('Login Success')
      redirect("/dashboard");
    }
    if(isError) {ErrorNotify('Login failed');}

  }, [user_id, isError]);
  if (isLoading) {
    return (
      <div className="">
        <Loader />
      </div>
    );
  } else {
    return (
      <div className="">
        <div className="text-center">
          <h1 className="text-2xl">Login</h1>
        </div>

        <form onSubmit={handleSubmit} className="reg-form">
          <div className="flex flex-col my-3">
            <label className="">Username</label>
            <input
              name="email"
              type="email"
              className="px-2 py-2 border-2 border-theme-color rounded-md mt-1"
              value={formValues.email}
              onChange={(e) => handleOnChange(e.target.name, e.target.value)}
            />
          </div>
          <div className="flex flex-col my-3">
            <label className="">Password</label>
            <input
              type="text"
              name="password"
              className="px-2 py-2 border-2 border-theme-color rounded-md mt-1"
              value={formValues.password}
              onChange={(e) => handleOnChange(e.target.name, e.target.value)}
            />
          </div>
          <div className="transition-all hover:-translate-y-1 hover:shadow-md cursor-pointer bg-theme-color my-5 px-4 py-4 text-center rounded-md text-pure font-bold">
            <input type="submit" className="" value="Login" />
          </div>
          <h3>
                    Test Account
                    <br />
                    username -
                    demo.account@demo.com <br /> 
                    password -
                    qwerty
                </h3>
        </form>
      </div>
    );
  }
};

export default Authenticate;
