import {axiosService} from "./axios.service";
import {urls} from "../constants/urls";

export const productService = {
    getAll: (cat) => axiosService.get(
        cat
            ? `${urls.products}?category=${cat}`
            : `${urls.products}`
    ),
    getById: (id) => axiosService.get(`${urls.products}/find/${id}`)
}