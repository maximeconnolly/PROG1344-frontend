import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {statsAPI} from "./statsAPI.js";


export const getStats = createAsyncThunk('stats/getStats', async (arg, thunkAPI) => {
try {
    return await statsAPI();
} catch (error) {
    return thunkAPI.rejectWithValue(error);
}
})

const statsSlice = createSlice({
    name: "stats",
    initialState: {
        stats: {},
        errors: "",
        status: "",
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getStats.pending, (state) => {
            state.status = "loading";
        }).addCase(getStats.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.stats = action.payload;
        }).addCase(getStats.rejected, (state, action) => {
            state.status = 'rejected';
            state.errors = action.payload;
        });
    },
});

export default statsSlice.reducer;