import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {createGenreAPI, deleteGenreAPI, getGenreAPI, updateGenreAPI} from "./genreAPI.js";

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

export const createGenre = createAsyncThunk(
    'genre/create',
    async (genre, thunkAPI) => {
        try{
            return await createGenreAPI(genre);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
)
export const updateGenre = createAsyncThunk(
    'genre/update',
    async (genre, thunkAPI) => {
        try{
            return await updateGenreAPI(genre);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
)

export const deleteGenre = createAsyncThunk(
    'genre/delete',
    async (id, thunkAPI) => {
        try{
            return await deleteGenreAPI(id);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
)


const genreSlice = createSlice({
    name: "genre",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getGenre.fulfilled, (state, action) => {
            state.genres = action.payload;
            state.status = 'done'
        }).addCase(getGenre.pending, (state) => {
            state.status = 'loading';
        }).addCase(getGenre.rejected,(state, action)=> {
            state.status = 'failed';
            state.error = action.payload;
        }).addCase(createGenre.fulfilled, (state, action) => {
            state.genres.unshift(action.payload);
        }).addCase(updateGenre.fulfilled, (state, action) => {
            const index = state.genres.findIndex(genre => genre.id === action.payload);

            if (index !== 1) {
                state.genres[index] = action.payload;
            }
        }).addCase(deleteGenre.fulfilled, (state, action) => {
            state.genres = state.genres.filter(genre => genre.id !== action.payload);
        });
    },
})

export default genreSlice.reducer;