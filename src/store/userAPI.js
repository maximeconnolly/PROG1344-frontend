import axiosInstance from "../utils/axiosInstance.js";

export const getUserAPI = async () => {
    const response = await axiosInstance.get("/api/current_user/");
    return response.data;
}