import axiosInstance from "../utils/axiosInstance.js";

export const getSeriesAPI = async () => {
    const response = await axiosInstance('/api/series/');
    return response.data;
};

export const createSeriesAPI = async (data) => {
    const response = await axiosInstance.post('/api/series/', data);
    return response.data;
};

export const updateSeriesAPI = async (data) => {
    const response = await axiosInstance.put(`/api/series/${data.id}/`,data);
    return response.data;
}

export const deleteSeriesAPI = async (id) => {
    const response = await axiosInstance.delete(`/api/series/${id}/`);
    return response.data;
}