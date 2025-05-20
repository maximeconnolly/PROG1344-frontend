import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {getGameCompanyAPI, deleteGameCompanyAPI} from "./gameCompanyAPI.js";

export const getGameCompanies = createAsyncThunk(
    'getGameCompanies',
    async (_, thunkAPI) => {
        try {
            return getGameCompanyAPI();
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || "Failed to get game company data");
        }
    }
)