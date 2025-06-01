import axiosInstance from "../utils/axiosInstance.js";

export const getRentalAPI = async () => {
    const response = await axiosInstance.get('/api/rental/')
    return response.data;
}

export const createRentalAPI = async (rental) => {
    const response = await axiosInstance.post('/api/rental/', rental);
    return response.data;
}

export const updateRentalAPI = async (rental) => {
    const response = await axiosInstance.put(`/api/rental/${rental.id}/`, rental);
    return response.data;
}

export const deleteRentalAPI = async (id) => {
    const response = await axiosInstance.delete(`/api/rental/${id}`);
    return response.data;
}