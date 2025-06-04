import axiosInstance from "../utils/axiosInstance.js";

export const getSalesAPI = async () => {
    const response = await axiosInstance.get(`/api/transaction/`);
    return response.data;
}

export const createSalesAPI = async (sale) => {
    const response = await axiosInstance.post(`/api/transaction/`, sale);
    return response.data;
}

export const updateSalesAPI = async (sale) => {
    const response = await axiosInstance.put(`/api/transaction/${sale.id}/`, sale);
    return response.data;
}
export const deleteSalesAPI = async (saleId) => {
    const response = await axiosInstance.delete(`/api/transaction/${saleId}`);
    return response.data;
}