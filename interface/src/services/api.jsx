import axios from "axios";

const api = new axios.create({
    baseURL: `http://localhost:8800`,
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');

    if (token) {
        config.headers.Authorization = token;
    }

    return config;
});



export default api;