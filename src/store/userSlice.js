import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {getUserAPI} from "./userAPI.js";

const initialState = {
    user: null,
    group: [],
    status: 'idle',
    error: null,
};

export const getUser = createAsyncThunk(
    'users/getUser',
    async(_, thunkAPI) => {
        try {
            return await getUserAPI();
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
            state.user = action.payload.user;
            state.group = action.payload.group;
        }).addCase(getUser.pending, (state, action) => {
            state.status = 'loading';
        }).addCase(getUser.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        });
    },
})

export default userSlice.reducer;