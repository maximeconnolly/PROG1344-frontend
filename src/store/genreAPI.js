import axiosInstance from "../utils/axiosInstance.js";

export const getGenreAPI = async () => {
    const response = await axiosInstance.get("/api/genre/");
    return response.data;

}

export const createGenreAPI = async (data) => {
    const response = await axiosInstance.post("/api/genre/", data);
    return response.data;
}

export const updateGenreAPI = async (data) => {
    const response = await axiosInstance.put(`/api/genre/${data.id}/`, data);
    return response.data;
}
export const deleteGenreAPI = async (id) => {
    const response = await axiosInstance.delete(`/api/genre/${id}/`);
    return response.data;
}