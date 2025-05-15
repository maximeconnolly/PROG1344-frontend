import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {loginAPI} from "./authAPI.js";
import axiosInstance from "../utils/axiosInstance.js";

const token = localStorage.getItem("token");
const refreshToken = localStorage.getItem("refreshToken");

const initialState = {
  token: token || null,
  refresh: refreshToken || null,
  status: 'idle',
  error: null,
};

export const loginUser = createAsyncThunk('auth/loginUser', async (credentials, thunkAPI) =>{
  try {
    const response = await loginAPI(credentials);
    
    axiosInstance.defaults.headers.Authorization = `Bearer ${response.access}`;

    return response

  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
  // const response = await loginAPi(credentials);
  // return response;
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
      state.refresh = action.payload.refresh;
      localStorage.setItem('token', action.payload.access)
      localStorage.setItem('refreshToken', action.payload.refresh)
    }).addCase(loginUser.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.error.message;
    });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;