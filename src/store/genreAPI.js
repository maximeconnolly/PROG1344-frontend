import axiosInstance from "../utils/axiosInstance.js";

export const getGenreAPI = async () => {
    const response = await axiosInstance.get("/api/genre/");
    return response.data;

}