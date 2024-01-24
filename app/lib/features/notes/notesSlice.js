import { API_URL } from "@/constants";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export const getNotes = createAsyncThunk(
    "getNotes",
    async (user_id) => {
        const response = await fetch(`${API_URL}/get-all-notes/${user_id}`);
        const data = await response.json();
        return data;
    }
);

export const noteSlice = createSlice({
    name: 'notes',
    initialState: {
        isLoading: false,
        isError: false,
        notes: []
    },
    reducers: {
    },

    extraReducers(builder) {
        builder.addCase(getNotes.fulfilled, (state, action) => {
            state.notes = action.payload.Notes,
                state.isLoading = false;
        });
        builder.addCase(getNotes.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(getNotes.rejected, (state, action) => {
            state.isError = true;
            state.isLoading = false;
        });

    },
})

export const { reducers, extraReducers } = noteSlice.actions;
export default noteSlice.reducer;