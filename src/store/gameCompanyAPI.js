import axiosInstance from "../utils/axiosInstance.js";

export const getGameCompany = async () => {
    const response = await axiosInstance.get('/api/game_company')
    return response.data;
}

export const createGameCompany = async (company) => {
    const response = await axiosInstance('/api/game_company/', company);
    return response.data;
}

export const updateGameCompany = async (company)  => {
    const response = await axiosInstance.put(`/api/game_company/${company.id}`, company);
    return response.data;
}

export const deleteGameCompany = async (companyID) => {
    const response = await axiosInstance.delete(`/api/game_company/${companyID}`);
    return response.data;
}