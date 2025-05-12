import axios from "axios";

export const loginAPi = async (credentials) => {
    const response = await axios.post("http://localhost:8000/api/token/", credentials);
    return response.data;
}