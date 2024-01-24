import { API_URL } from "@/constants";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export const getCategories = createAsyncThunk(
    "getCategories",
    async (user_id) => {
        const response = await fetch(`${API_URL}/get-all-categories/${user_id}`);
        const data = await response.json();
        return data;
    }
);

export const categoriesSlice = createSlice({
    name: 'categories',
    initialState: {
        isLoading: false,
        isError: false,
        categories: []
    },
    reducers: {
    },

    extraReducers(builder) {
        builder.addCase(getCategories.fulfilled, (state, action) => {
            state.categories = action.payload.Categories;
            state.isLoading = false;
        });
        builder.addCase(getCategories.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(getCategories.rejected, (state, action) => {
            state.isError = true;
            state.isLoading = false;
        });

    },
})

export const { reducers, extraReducers } = categoriesSlice.actions;
export default categoriesSlice.reducer;