import { createSlice } from "@reduxjs/toolkit";

const gamesSlice = createSlice({
    name: "games",
    initialState: {
        games: [
            {
                key: 1,
                name: "Metal Gear Solid",
                platform: "Playstation",
                year: "1999"
            },
            {
                key: 2,
                name: "Paper Mario",
                platform: "Nintendo 64",
                year: "1998"
            },
            {
                key: 3,
                name: "Super Mario World",
                platform: "Super Nintendo",
                year: "1991"
            },
            {
                key: 4,
                name: "Metroid",
                platform: "Nintendo Entertainement System",
                year: "1987"
            },
            {
                key: 5,
                name: "Super Metroid",
                platform: "Super Nintendo",
                year: "1994"
            },
            {
                key: 6,
                name: "Splatoon 3",
                platform: "Nintendo Switch",
                year: "2022"
            }
        ],
    },
    reducers:{
        addGames: (state, action) => {
            const game = {
                key: state.games.length + 2,
                name: action.payload.name,
                platform: action.payload.platform,
                year: action.payload.year
            }
            state.games = [...state.games, game];
        },
        updateGames: (state, action) => {
            state.games = state.games.map(game => game.key === action.payload.key ? action.payload : game);

        },
        deleteGames: (state, action) => {
            state.games = state.games.filter(game => game.key !== action.payload.key)
        }
    },
});

export const {addGames, updateGames, deleteGames} = gamesSlice.actions;
export default gamesSlice.reducer;