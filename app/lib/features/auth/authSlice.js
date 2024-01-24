import { API_URL } from "@/constants";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export const userLogin = createAsyncThunk(
  "userLogin",
  async (payload) => {
    const response = await fetch(
      `${API_URL}/login-user`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    }
    );
    const data = await response.json();
    localStorage.setItem("user",JSON.stringify(data))
    return data;
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuth: false,
    isLoading: false,
    isError:false,
    username: "",
    user_id: "",
    data:{}
  },
  reducers: {
  },

  extraReducers(builder) {
    builder.addCase(userLogin.fulfilled, (state, action) => {
      state.isAuth = true;
      state.data = action.payload.data;
      state.username = action.payload.data.email;
      state.user_id = action.payload.data.user_id;
      state.isLoading = false;
    });
    builder.addCase(userLogin.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(userLogin.rejected, (state, action) => {
      state.isError = true;
    });
  },

})

export const { reducers, extraReducers } = authSlice.actions;
export default authSlice.reducer;