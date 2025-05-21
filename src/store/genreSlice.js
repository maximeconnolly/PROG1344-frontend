import { createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {getGenreAPI} from "./genreAPI.js";

const initialState = {
    genres: [],
    status: 'idle',
    error: null,
};

export const getGenre = createAsyncThunk(
    'genre/getGenre',
    async (_, thunkAPI) => {
        try {
            return await getGenreAPI();
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || "Failed to fetch genre");
        }
    }
);

const genreSlice = createSlice({
    name: "genre",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getGenre.fulfilled, (state, action) => {
            state.genres = action.payload;
            state.status = 'done'
        }).addCase(getGenre.pending, (state, action) => {
            state.status = 'loading';
        }).addCase(getGenre.rejected,(state, action)=> {
            state.status = 'failed';
            state.error = action.payload;
        });
    },
})

export default genreSlice.reducer;