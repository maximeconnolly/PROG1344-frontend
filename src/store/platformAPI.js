import axiosInstance from "../utils/axiosInstance.js";

export const getPlatform = async () => {
    const response = await axiosInstance('/api/platform/')
    return response.data;
}