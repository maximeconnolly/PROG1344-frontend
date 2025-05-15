import axiosInstance from "../utils/axiosInstance.js";

export const loginAPI = async (credentials) => {
    const response = await axiosInstance.post("/api/token/", credentials);
    return response.data;
}