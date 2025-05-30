import axiosInstance from "../utils/axiosInstance.js";

export const getClientAPI = async () => {
    const response = await axiosInstance('/api/client/')
    return response.data;
}

export const createClientAPI = async (data) => {
    const response = await axiosInstance.post('/api/client/', data);
    return response.data;
}

export const updateClientAPI = async (data) => {
    const response = await axiosInstance.put(`/api/client/${data.id}/`, data);
    return response.data;
}

export const deleteClientAPI = async (id) => {
    const response = await axiosInstance.delete(`/api/client/${id}/`);
    return response.data;
}