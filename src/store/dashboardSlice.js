import { createSlice } from "@reduxjs/toolkit";

const dashboardSlice = createSlice({
    name: "dashboard",
    initialState: {
        stats: {
            revenue: 5000,
            gameInCollection: 2000,
            reviews: 200
        },
    },
    reducers: {
        updateRevenue: (state, action) => {
            state.stats.revenue = action.payload;
        },
        updateGameInCollection: (state, action) => {
            state.stats.gameInCollection = action.payload;
        },
        updateReviews: (state, action) => {
            state.stats.reviews = action.payload;
        }
        
    },
});

export const { updateRevenue, updateGameInCollection, updateReviews } = dashboardSlice.actions;
export default dashboardSlice.reducer;