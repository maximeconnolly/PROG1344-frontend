import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createRentalAPI, deleteRentalAPI, updateRentalAPI, getRentalAPI} from "./rentalAPI.js";

const initialState = {
    rentals: [],
    status: 'idle',
    error: null,
}

export const getRental = createAsyncThunk(
    'rental/getRental',
    async(_, thunkAPI) => {
        try {
            return await getRentalAPI();
        } catch (error) {
            return thunkAPI.reject(error);
        }
    }
);

export const createRental = createAsyncThunk(
    'rental/create',
    async (rental, thunkAPI) => {
        try{
            return await createRentalAPI(rental);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
)

export const updateRental = createAsyncThunk(
    'rental/update',
    async (rental, thunkAPI) => {
        try {
            return await updateRentalAPI(rental);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
)

export const deleteRental = createAsyncThunk(
    'rental/delete',
    async (id, thunkAPI) => {
        try{
            return await deleteRentalAPI(id);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
)


const rentalsSlice = createSlice({
    name: "rentals",
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(getRental.fulfilled, (state, action) => {
            state.rentals = action.payload;
            state.status = 'done';
        }).addCase(getRental.pending, (state) => {
            state.status = 'loading';
        }).addCase(getRental.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        }).addCase(createRental.fulfilled, (state, action) => {
            state.rentals.unshift(action.payload);
        }).addCase(updateRental.fulfilled, (state,action) => {
            const index = state.rentals.findIndex(rental => rental.id === action.payload);

            if (index !== -1) {
                state.rentals[index] = action.payload;
            }
        }).addCase(deleteRental.fulfilled, (state, action) => {
            state.rentals = state.rentals.filter(rental => rental.id !== action.payload);
        })
    }
});

export default rentalsSlice.reducer;