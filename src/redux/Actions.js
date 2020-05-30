import axios from "axios";
import { apiServerBaseUrl } from "../config";
import cogoToast from "cogo-toast";

//action types
export const LOGIN_USER = "LOGIN_USER";
export const LOGOUT_USER = "LOGOUT_USER";
export const LOADING_COMPLETE = "LOADING_COMPLETE";
export const VERIFIED = "VERIFIED";
export const NO_USER = "NO_USER";
export const UPDATE_TAB = "UPDATE_TAB";
// export const FAVORITE_ADD_ERROR = "FAVORITE_ADD_ERROR";
// export const FAVORITE_ADD_SUCCESS = "FAVORITE_ADD_SUCCESS";

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

export const trackTab = (tab) => ({
  type: UPDATE_TAB,
  tab,
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

// export const addFavorite = (movieid) => {
//   axios
//     .post(`${apiServerBaseUrl}/favorites`, movieid, {
//       withCredentials: true,
//       validateStatus: (status) => status < 500,
//     })
//     .then((res) => {
//       if (!res.data.success) {
//         cogoToast.error(res.data.message);
//         return { type: FAVORITE_ADD_ERROR };
//       }
//       cogoToast.success(res.data.message);
//       return { type: FAVORITE_ADD_SUCCESS };
//     })
//     .catch(() => {
//       cogoToast.error(res.data.message);
//       return { type: FAVORITE_ADD_ERROR };
//     });
// };
