import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {createPlatformAPI, deletePlatformAPI, getPlatform, updatePlatformAPI} from "./platformAPI.js";

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

export const createPlatform = createAsyncThunk(
    'platforms/create',
    async (platform, thunkAPI) => {
        try{
            return await createPlatformAPI(platform);
        } catch(error){
            return thunkAPI.rejectWithValue(error);
        }
    }
);
export const updatePlatform = createAsyncThunk(
    'platforms/update',
    async (platform, thunkAPI) => {
        try{
            return await updatePlatformAPI(platform);
        } catch(error){
            return thunkAPI.rejectWithValue(error);
        }
    }
)

export const deletePlatform = createAsyncThunk(
    'platforms/delete',
    async (platformId, thunkAPI) => {
        try{
            return await deletePlatformAPI(platformId);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
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
        }).addCase(createPlatform.fulfilled, (state, action) => {
            state.platforms.unshift(action.payload);
        }).addCase(updatePlatform.fulfilled, (state, action) => {
            const index = state.platforms.findIndex(platform => platform.id === action.payload);

            if (index !== 1) {
                state.platforms[index] = action.payload;
            }
        }).addCase(deletePlatform.fulfilled, (state, action) => {
            state.platforms = state.platforms.filter(platform => platform.id !== action.payload);
        });
    }
});

export default platformSlice.reducer;