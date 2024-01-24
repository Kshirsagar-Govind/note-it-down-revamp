import { API_URL } from "@/constants";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export const getTasks = createAsyncThunk(
    "getTasks",
    async (user_id) => {
        const response = await fetch(`${API_URL}/get-all-tasks/${user_id}`);
        const data = await response.json();
        return data;
    }
);

export const taskSlice = createSlice({
    name: 'tasks',
    initialState: {
        isLoading: false,
        isError: false,
        tasks: []
    },
    reducers: {
    },

    extraReducers(builder) {
        builder.addCase(getTasks.fulfilled, (state, action) => {
            state.tasks = action.payload.data,
                state.isLoading = false;
        });
        builder.addCase(getTasks.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(getTasks.rejected, (state, action) => {
            state.isError = true;
            state.isLoading = false;
        });

    },
})

export const { reducers, extraReducers } = taskSlice.actions;
export default taskSlice.reducer;