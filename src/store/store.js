import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";
import authReducer from "./authSlice";
import dashboardReducer from "./dashboardSlice";
import gameReducer from "./gameSlice.js";
import rentalsReducer from "./rentalSlice";
import salesReducer from "./salesSlice";
import userReducer from "./userSlice";
import gameCompaniesReducer from "./gameCompanySlice";
import platformReducer from "./platformSlice";
import genreReducer from "./genreSlice";
import seriesReducer from "./seriesSlice";
import statsReducer from "./statsSlice";
import clientsReducer from "./clientSlice";

// Configure all store
export const store = configureStore({
    reducer: {
        counter: counterReducer,
        auth: authReducer,
        dashboard: dashboardReducer,
        games: gameReducer,
        rentals: rentalsReducer,
        sales: salesReducer,
        user: userReducer,
        gameCompanies: gameCompaniesReducer,
        platforms: platformReducer,
        genres: genreReducer,
        series: seriesReducer,
        stats: statsReducer,
        clients: clientsReducer,
    }
})