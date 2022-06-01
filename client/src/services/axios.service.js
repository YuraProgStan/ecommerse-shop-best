import axios from "axios";
import baseURL from "../constants/urls";
const axiosService = axios.create({baseURL})

axiosService.interceptors.request.use(config => {
    // const token = localStorage.getItem('token');
    // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyOTNhZDgwNDI2M2M5OGRjMzZlMDJlMSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1MzkzOTM3NSwiZXhwIjoxNjU0MDI1Nzc1fQ.K7fVVJu8phYp0jl1W5xFiBjbIjtyUbvLkNtf38TI8W0';
    const token = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.accessToken;
    if (token) {
        config.headers.token = `Bearer ${token}`;
    }
    return config;
})

export {axiosService}