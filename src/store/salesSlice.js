import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {getSalesAPI, updateSalesAPI, createSalesAPI, deleteSalesAPI} from "./salesAPI.js";

const initialState = {
    sales: [],
    status: 'idle',
    error: null,
}

export const getSales = createAsyncThunk(
    'sales/getSales',
    async (_, thunkAPI) => {
        try {
            return await getSalesAPI();
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
);

export const createSales = createAsyncThunk(
    'sales/create',
    async (sale, thunkAPI) => {
        try {
            return await createSalesAPI(sale);
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
);

export const updateSales = createAsyncThunk(
    'sales/update',
    async (sale, thunkAPI) => {
        try {
            return await updateSalesAPI(sale);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const deleteSales = createAsyncThunk(
    'sales/delete',
    async (saleId, thunkAPI) => {
        try {
            return await deleteSalesAPI(saleId);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);


const salesSlice = createSlice({
    name: "sales",
    initialState,
    reducers:{},
    extraReducers:(builder) => {
        builder.addCase(getSales.fulfilled, (state, action) => {
            state.sales = action.payload;
            state.status = 'done';
        }).addCase(getSales.pending, (state) => {
            state.status = 'loading';
        }).addCase(getSales.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        }).addCase(createSales.fulfilled, (state, action) => {
            state.sales.unshift(action.payload);
        }).addCase(updateSales.fulfilled, (state, action) => {
            const index = state.sales.findIndex(sale => sale.id === action.payload);

            if (index !== 1){
                state.sales[index] = action.payload;
            }
        }).addCase(deleteSales.fulfilled, (state, action) => {
            state.sales = state.sales.filter(sale => sale.id !== action.payload);
        });
    }
});

export default salesSlice.reducer;