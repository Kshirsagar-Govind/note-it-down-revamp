import { API_URL } from "@/constants";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export const getExpenses = createAsyncThunk(
    "getExpenses",
    async (user_id) => {
        const response = await fetch(`${API_URL}/get-all-expenses/${user_id}`);
        const data = await response.json();
        return data;
    }
);

export const expensesSlice = createSlice({
    name: 'expenses',
    initialState: {
        isLoading: false,
        isError: false,
        expenses: []
    },
    reducers: {
    },

    extraReducers(builder) {
        builder.addCase(getExpenses.fulfilled, (state, action) => {
            state.expenses = action.payload.Expenses;
            state.isLoading = false;
        });
        builder.addCase(getExpenses.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(getExpenses.rejected, (state, action) => {
            state.isError = true;
            state.isLoading = false;
        });

    },
})

export const { reducers, extraReducers } = expensesSlice.actions;
export default expensesSlice.reducer;