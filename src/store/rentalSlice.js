import { createSlice } from "@reduxjs/toolkit";

const rentalsSlice = createSlice({
    name: "rentals",
    initialState: {
        rentals: [
            {
                key: 1,
                gameName: "Metal Gear Solid",
                clientName: "Charles-Etienne Roy",
                returnDate: "2025-01-01"
            },
            {
                key: 2,
                gameName: "Metal Gear Sonic 3",
                clientName: "Charles Robichaud",
                returnDate: "2025-02-01"
            },
            {
                key: 3,
                gameName: "Sonic the gear",
                clientName: "Maxime Roy",
                returnDate: "2025-01-05"
            }
        ]
    },
    reducers:{
        addRentals: (state, action) => {
            const rental = {
                key: state.rentals.length + 2,
                gameName: action.payload.gameName,
                clientName: action.payload.clientName,
                returnDate: action.payload.returnDate
            };
            state.rentals = [...state.rentals, rental];
        },
        updateRentals: (state, action) => {
            state.rentals = state.rentals.map(rental => rental.key === action.payload.key ? action.payload : rental);

        },
        deleteRentals: (state, action) => {
            state.rentals = state.rentals.filter(rental => rental.key !== action.payload.key)
        }
    },
});

export const {addRentals, deleteRentals, updateRentals} = rentalsSlice.actions;
export default rentalsSlice.reducer;