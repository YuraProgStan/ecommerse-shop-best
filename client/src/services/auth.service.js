import {axiosService} from "./axios.service";
import {urls} from "../constants/urls";

export const authService = {
    login: (user) => axiosService.post(`${urls.auth}/login`, user),
    getById: (id) => axiosService.get(`${urls.products}/find/${id}`)
}