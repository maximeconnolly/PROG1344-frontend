import { createSlice } from "@reduxjs/toolkit";

const salesSlice = createSlice({
    name: "sales",
    initialState: {
        sales: [
            {
                key: 1,
                transactionType: "Buy",
                transactionAmount: "80.00",
                gameName: "Metal Gear Solid",
                transactionDate: "2024-03-01",
            },
            {
                key: 2,
                transactionType: "Sell",
                transactionAmount: "10.00",
                gameName: "Metal Gear Sonic 3",
                transactionDate: "2024-04-01",
            },
            {
                key: 3,
                transactionType: "Buy",
                transactionAmount: "80.00",
                gameName: "Xenoblades Chronicles 3",
                transactionDate: "2024-10-02",
            }
        ]
    },
    reducers:{
        addSales: (state, action) => {
            const sales = {
                key: state.sales.length + 2,
                transactionType: action.payload.transactionType,
                transactionAmount: action.payload.transactionAmount,
                gameName: action.payload.gameName,
                transactionDate: action.payload.transactionDate
            };
            state.sales = [...state.sales, sales];
        },
        deleteSales: (state, action) => {

        },
        updateSales: (state, action) => {
            state.sales = state.sales.map(sale => sale.key === action.payload.key ? action.payload : sale);
        }
    }
});

export const {addSales, deleteSales, updateSales} = salesSlice.actions;
export default salesSlice.reducer;