import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";
import authReducer from "./authSlice";
import dashboardReducer from "./dashboardSlice";
import gamesReducer from "./gamesSlice";
import rentalsReducer from "./rentalSlice";
import salesReducer from "./salesSlice"

// Configure all store
export const store = configureStore({
    reducer: {
        counter: counterReducer,
        auth: authReducer,
        dashboard: dashboardReducer,
        games: gamesReducer,
        rentals: rentalsReducer,
        sales: salesReducer
    }
})