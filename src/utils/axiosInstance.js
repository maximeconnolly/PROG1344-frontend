import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:8000"
})

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token") || null;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;

    },
    (error) => {
        return Promise.reject(error);
    }
);
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        const refreshToken = localStorage.getItem('refreshToken');

        if (error.response?.status === 401 && refreshToken && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const {data} = await axios.post('http://localhost:8000/api/token/refresh/', {
                    refresh: refreshToken,
                });

                localStorage.setItem('token', data.access);
                axiosInstance.defaults.headers.Authorization = `Bearer ${data.access}`;
                originalRequest.headers.Authorization = `Bearer ${data.access}`;

                return axiosInstance(originalRequest);
            } catch (refreshError) {
                localStorage.removeItem('token');
                localStorage.removeItem('refreshToken');
                window.location.href = '/';
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;