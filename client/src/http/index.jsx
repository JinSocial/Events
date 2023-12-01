import axios from "axios";
import UserService from "services/UserService";

export const API_URL = "http://localhost:5080/api";

const $api = axios.create({
    baseURL: API_URL,
//    withCredentials: true
});

$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config
});

$api.interceptors.response.use((config) => {
    return config;
}, async (error) => {
    if (error.response.status === 401 && error.config) {
        UserService.logout();
    }
    throw error;
});

export default $api;