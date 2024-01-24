'use client'
import { API_URL } from "@/constants";
import { createContext } from "react";
import React from "react";

const Expenses_Context = createContext();

export function ExpenseContext({ children }) {
    const [expenses, setExpenses] = React.useState();

    React.useEffect(() => {
        getData();
    }, [])

    const getData = async () => {
        try {
            let user_id = "va4rQHokJK";
            const response = await fetch(`${API_URL}/get-all-expenses/${user_id}`);
            const data = await response.json();
            setExpenses(data.Expenses)
        } catch (error) {
            console.log(error);
        }
    }
    const defaultContext = { expenses }
    return (
        <Expenses_Context.Provider value={{expenses}}>
            {children}
        </Expenses_Context.Provider>
    );
}