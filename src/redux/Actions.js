import axios from "axios";
import { apiServerBaseUrl } from "../config";

//action types
export const LOGIN_USER = "LOGIN_USER";
export const LOGOUT_USER = "LOGOUT_USER";
export const LOADING_COMPLETE = "LOADING_COMPLETE";
export const VERIFIED = "VERIFIED";
export const NO_USER = "NO_USER";

//action creators
export const loginUser = (user) => ({
  type: LOGIN_USER,
  user,
});

export const logoutUser = () => ({
  type: LOGOUT_USER,
});

export const loadingComplete = () => ({
  type: LOADING_COMPLETE,
});

export const validateUser = () => (dispatch) => {
  axios
    .get(`${apiServerBaseUrl}/users/validatesession`, { withCredentials: true })
    .then((res) => {
      if (!res.data.success) {
        return { type: NO_USER };
      }

      dispatch(loginUser(res.data.user));
      return { type: VERIFIED };
    })
    .catch(() => ({ type: NO_USER }));
};
