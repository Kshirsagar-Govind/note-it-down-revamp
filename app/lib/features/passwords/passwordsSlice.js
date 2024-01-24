import { API_URL } from "@/constants";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export const getPasswords = createAsyncThunk(
    "getPasswords",
    async (user_id) => {
        const response = await fetch(`${API_URL}/get-all-passwords/${user_id}`);
        const data = await response.json();
        return data;
    }
);

export const passwordSlice = createSlice({
    name: 'passwords',
    initialState: {
        isLoading: false,
        isError: false,
        passwords: []
    },
    reducers: {
    },

    extraReducers(builder) {
        builder.addCase(getPasswords.fulfilled, (state, action) => {
                state.passwords = action.payload.Passwords,
                state.isLoading = false;
        });
        builder.addCase(getPasswords.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(getPasswords.rejected, (state, action) => {
            state.isError = true;
            state.isLoading = false;
        });

    },
})

export const { reducers, extraReducers } = passwordSlice.actions;
export default passwordSlice.reducer;