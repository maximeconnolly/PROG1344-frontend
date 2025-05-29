import { createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {createSeriesAPI, deleteSeriesAPI, getSeriesAPI, updateSeriesAPI} from "./seriesAPI.js";
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

export const createSeries = createAsyncThunk(
    'series/create',
    async (series, thunkAPI) => {
        try{
            return await createSeriesAPI(series);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const updateSeries = createAsyncThunk(
    'series/update',
    async (series, thunkAPI) => {
        try{
            return await updateSeriesAPI(series);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const deleteSeries = createAsyncThunk(
    'series/delete',
    async (id, thunkAPI) => {
        try{
            return await deleteSeriesAPI(id);
        } catch(error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
)

const seriesSlice = createSlice({
    name: "serie",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getSeries.fulfilled, (state, action) => {
            state.series = action.payload;
            state.status = 'done';
        }).addCase(getSeries.pending, (state) => {
            state.status = 'loading';
        }).addCase(getSeries.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        }).addCase(createSeries.fulfilled, (state, action) => {
            state.series.unshift(action.payload);
        }).addCase(updateSeries.fulfilled, (state, action) => {
            const index = state.series.findIndex(serie => serie.id === action.payload);

            if (index !== -1) {
                state.series[index] = action.payload;
            }
        }).addCase(deleteSeries.fulfilled, (state, action) => {
            state.series = state.series.filter(serie => serie.id !== action.payload);
        });
    },

})

export default seriesSlice.reducer;