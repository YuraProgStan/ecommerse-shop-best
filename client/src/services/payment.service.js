import {axiosService} from "./axios.service";
import {urls} from "../constants/urls";

export const paymentService = {
    postPay: (paymentInfo) => axiosService.post(`${urls.checkout}/payment`,paymentInfo)
}

// export const paymentService = {
//     postPay: (paymentInfo) => axios.create({baseURL,
//         headers:{
//             'authorization':`Bearer ${process.env.REACT_APP_STRIPE_KEY}`
//         }}
//     ).post(`${urls.checkout}/payment`,paymentInfo)
// }