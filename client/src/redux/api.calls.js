import {loginFailure, loginStart, loginSuccess} from "./slices/user.slice";
import {authService} from "../services/auth.service";

export const login = async (dispatch, user) => {
    dispatch(loginStart());
    try {
        const res = await authService.login(user);
        dispatch(loginSuccess(res.data));
    } catch (err) {
        dispatch(loginFailure())
    }
}