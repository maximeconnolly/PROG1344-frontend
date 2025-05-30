import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {getClientAPI, createClientAPI, updateClientAPI, deleteClientAPI } from "./clientAPI.js";

let initialState = {
    clients: [],
    status: 'idle',
    error: null,
}


export const getClients = createAsyncThunk(
    'clients/getClients',
    async (_, thunkAPI) => {
        try {
            return await getClientAPI();
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
)

export const createClient = createAsyncThunk(
    'clients/createClients',
    async (client, thunkAPI) => {
        try{
            return await createClientAPI(client);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
)

export const updateClient = createAsyncThunk(
    'clients/updateClient',
    async (client, thunkAPI) => {
        try{
            return await updateClientAPI(client);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
)

export const deleteClient = createAsyncThunk(
    'clients/deleteClient',
    async (id, thunkAPI) => {
        try {
            return await deleteClientAPI(id);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
)

const clientSlice = createSlice({
        name: "clients",
        initialState,
        reducers: {},
        extraReducers: (builder) => {
            builder.addCase(getClients.fulfilled, (state, action) => {
                state.clients = action.payload;
                state.status = 'done';
            }).addCase(getClients.pending, (state) => {
                state.status = 'loading';
            }).addCase(getClients.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            }).addCase(createClient.fulfilled, (state, action) => {
                state.clients.unshift(action.payload);
            }).addCase(updateClient.fulfilled, (state, action) => {
                const index = state.clients.findIndex(client => client.id === action.payload.id);
                if (index !== -1){
                    state.clients[index] = action.payload;
                }
            }).addCase(deleteClient.fulfilled, (state, action) => {
                state.clients = state.clients.filter(client => client.id !== action.payload.id);
            });
        }
    }
);

export default clientSlice.reducer;