import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {getPlatform} from "./platformAPI.js";

export const getPlatforms = createAsyncThunk(
    'platforms/getPlatforms',
    async (_, thunkAPI) => {
        try {
            return await getPlatform()
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || 'Failed to get platforms.');
        }
    }
)

const platformSlice = createSlice({
    name: "platforms",
    initialState: {
        platforms: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getPlatforms.fulfilled, (state, action) => {
            state.platforms = action.payload;
            state.status = 'done';
        }).addCase(getPlatforms.pending, (state) => {
            state.status = 'loading';
        }).addCase(getPlatforms.rejected, (state, action) => {
            state.status = 'error';
            state.error = action.payload;
        })
    }
});

export default platformSlice.reducer;