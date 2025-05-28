import axiosInstance from "../utils/axiosInstance.js";

export const getSeriesAPI = async () => {
    const response = await axiosInstance('/api/series/');
    return response.data;
};