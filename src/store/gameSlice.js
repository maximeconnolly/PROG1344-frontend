import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {getGamesAPI, getGameDetailAPI, createGameAPI, updateGameAPI, deleteGameAPI} from "./gameAPI.js";

export const getGames = createAsyncThunk(
    'games/getGames',
    async (_, thunkAPI) => {
        try {
            return await getGamesAPI();
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || 'Failed to get games');
        }
    }
)

export const getGameDetails = createAsyncThunk(
    'games/getGameDetails',
    async (gameID, thunkAPI) => {
        try{
            return await getGameDetailAPI(gameID);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || 'Failed to get game details');
        }
    }
)

export const createGame = createAsyncThunk(
    'games/addGames',
    async (data, thunkAPI) => {
        try {
            return await createGameAPI(data);
        } catch (error){
            return thunkAPI.rejectWithValue(error.response.data || 'Failed to add games');
        }
    }
)

export const updateGame = createAsyncThunk(
    'games/updateGame',
    async (game, thunkAPI) => {
        try {
            return await updateGameAPI(game);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data || 'Failed to update games');
        }
    }
)

export const deleteGame = createAsyncThunk(
    'games/deleteGame',
    async (id, thunkAPI) => {
        try {
            return await deleteGameAPI(id);
        }
        catch (error) {
            return thunkAPI.rejectWithValue(error.response.data || 'Failed to delete games');
        }
    }
)

const gameSlice = createSlice({
    name: "games",
    initialState: {
        games: [],
        status: 'idle',
        error: null,
    },
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(getGames.fulfilled, (state, action) => {
            state.games = action.payload;
            state.status = 'done';
        }).addCase(getGames.pending, (state) => {
            state.status = 'loading';
        }).addCase(getGames.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        }).addCase(createGame.fulfilled, (state, action) => {
            state.games.unshift(action.payload);
        }).addCase(updateGame.fulfilled, (state, action) => {
            const index = state.games.findIndex(game => game.id === action.payload.id);
            if (index !== -1) {
                state.games[index] = action.payload;
            }
        }).addCase(deleteGame.fulfilled, (state, action) => {
            state.games = state.games.filter(game => game.id !== action.payload.id);
        });
    }
});


export default gameSlice.reducer;