import axiosInstance from "../utils/axiosInstance.js";

export const statsAPI = async() =>{
    const response = await axiosInstance.get(`/api/stat/`);
    return response.data;
}