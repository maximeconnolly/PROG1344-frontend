import axiosInstance from "../utils/axiosInstance.js";

export const getPlatform = async () => {
    const response = await axiosInstance('/api/platform/')
    return response.data;
}

export const createPlatformAPI = async (platform) => {
    const response = await axiosInstance.post('/api/platform/', platform);
    return response.data;
}

export const updatePlatformAPI = async (platform) => {
    const response = await axiosInstance.put(`/api/platform/${platform.id}/`, platform);
    return response.data;
}

export const deletePlatformAPI = async (platformId) => {
    const response = await axiosInstance.delete(`/api/platform/${platformId}/`);
    return response.data;
}