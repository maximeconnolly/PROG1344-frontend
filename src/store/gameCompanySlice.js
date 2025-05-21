import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {getGameCompany} from "./gameCompanyAPI.js";

export const getGameCompanies = createAsyncThunk(
    'getGameCompanies',
    async (_, thunkAPI) => {
        try {
            return getGameCompany();
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || "Failed to get game company data");
        }
    }
)

const gameCompanySlice = createSlice({
    name: "gameCompany",
    initialState: {
        gameCompanies: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getGameCompanies.fulfilled, (state, action) => {
            state.gameCompanies = action.payload;
            state.status = 'done';
        }).addCase(getGameCompanies.pending, (state) => {
            state.status = 'loading';
        }).addCase(getGameCompanies.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        });
    }
});

export default gameCompanySlice.reducer;