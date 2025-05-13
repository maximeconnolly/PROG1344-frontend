import axiosInstance from "../utils/axiosInstance.js";

export const loginAPi = async (credentials) => {
    const response = await axiosInstance.post("/api/token/", credentials);
    return response.data;
}