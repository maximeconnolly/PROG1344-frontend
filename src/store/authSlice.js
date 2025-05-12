import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {loginAPi} from "./authAPI.js";

const token = localStorage.getItem("token");

const initialState = {
  token: token || null,
  status: 'idle',
  error: null,
};

export const loginUser = createAsyncThunk('auth/loginUser', async (credentials) =>{
  const response = await loginAPi(credentials);
  return response;
})

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.status = 'loading';
    }).addCase(loginUser.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.token = action.payload.access;
      localStorage.setItem('token', action.payload.access)
    }).addCase(loginUser.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.error.message;
    });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;