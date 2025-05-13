import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {getUserAPI} from "./userAPI.js";

const initialState = {
    user: null,
    status: 'idle',
    error: null,
};

export const getUser = createAsyncThunk(
    'users/getUser',
    async(_, thunkAPI) => {
        try {
            const response = await getUserAPI();
            return response.user;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || 'Failed to fetch user');
        }
    }
);

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getUser.fulfilled, (state, action) => {
            state.user = action.payload;
        }).addCase(getUser.pending, (state, action) => {
            state.status = 'loading';
        }).addCase(getUser.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        });
    },
})

export default userSlice.reducer;