import axiosInstance from "../utils/axiosInstance.js";

export const getGamesAPI = async () => {
    const response = await axiosInstance.get("/api/game/");
    return response.data;
}
export const getGameDetailAPI = async (gameID) => {
    const response = await axiosInstance.get(`/game/${gameID}`);
    return response.data;
}
export const createGameAPI = async (game) => {
    const response = await axiosInstance.post("/api/game", game);
    return response.data;
}
export const updateGameAPI = async (game) => {
    const response = await axiosInstance.put(`/game/${game.id}`, game);
    return response.data;
}
export const deleteGameAPI = async (gameID) => {
    const response = await axiosInstance.delete(`/game/${gameID}`);
    return response.data;
}