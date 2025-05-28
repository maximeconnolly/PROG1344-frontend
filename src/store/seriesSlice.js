import { createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {getSeriesAPI} from "./seriesAPI.js";
/** If you are reading this I was in pain while writing these functions**/
const initialState = {
    series: [],
    status: 'idle',
    error: null,
}

export const getSeries = createAsyncThunk(
    'series/getSeries',
    async (_, thunkAPI) => {
        try{
            return await getSeriesAPI();
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || "Failed to fetch series.");
        }
    }
);

const seriesSlice = createSlice({
    name: "serie",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getSeries.fulfilled, (state, action) => {
            state.series = action.payload;
            state.status = 'done';
        }).addCase(getSeries.pending, (state, action) => {
            state.status = 'loading';
        }).addCase(getSeries.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        });
    },

})

export default seriesSlice.reducer;