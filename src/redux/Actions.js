import axios from "axios";
import { apiServerBaseUrl, newsApiKey } from "../config";
import {store} from "../index";

//action types
export const LOGIN_USER = "LOGIN_USER";
export const LOGOUT_USER = "LOGOUT_USER";
export const LOADING_COMPLETE = "LOADING_COMPLETE";
export const VERIFIED = "VERIFIED";
export const NO_USER = "NO_USER";
export const UPDATE_TAB = "UPDATE_TAB";

export const FETCH_NEWS = "FETCH_NEWS";
export const FETCH_TOP = "FETCH_TOP";
export const FETCH_LATEST = "FETCH_LATEST";
export const FETCH_NEWS_DONE = "FETCH_NEWS_DONE";
export const FETCH_TOP_DONE = "FETCH_TOP_DONE";
export const FETCH_LATEST_DONE = "FETCH_LATEST_DONE";

export const CONTENT_LOADED = "CONTENT_LOADED";

// export const FAVORITE_ADD_ERROR = "FAVORITE_ADD_ERROR";
// export const FAVORITE_ADD_SUCCESS = "FAVORITE_ADD_SUCCESS";

//action creators

export const contentLoadedDispatch = () => (dispatch) => {
  console.log("LOADED COUNT: ", store.getState().loadedCount);
  dispatch(contentLoaded());
  store.getState().loadedCount.loadedCount === 3 && dispatch(loadingComplete());
  return;
}

export const contentLoaded = () =>  {
  console.log("STORE: ", store.getState());
  return {type: CONTENT_LOADED};
};

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

export const fetchNewsDone = (news) => ({
  type: FETCH_NEWS_DONE,
  news: news,
});

export const fetchTopDone = (top) => ({
  type: FETCH_TOP_DONE,
  topMovies: top,
});

export const fetchLatestDone = (latest) => ({
  type: FETCH_LATEST_DONE,
  latestMovies: latest,
});

//Remember to add a timeout feature and re-initiate requests in case of a weak connection (like mine)
//Also dispatch loadingComplete only when:
//1 - All requests have finished loading with either success or failure.
//2 - Or specified timeout exceeded with some requests (no response received).
export const fetchNews = () => (dispatch) => {
  const newsAPI = `${apiServerBaseUrl}/news`;

  fetch(newsAPI)
    .then((res) => res.json())
    .then((res) => {
      dispatch(fetchNewsDone(res.data));
    })
    .then(() => {
      dispatch(contentLoadedDispatch());
    })
    .catch((err) => console.error(err));
};

export const fetchTop = () => (dispatch) => {
  axios
    .get(`${apiServerBaseUrl}/movies/top`, { withCredentials: true })
    .then((res) => {
      dispatch(fetchTopDone(res.data));
    })
    .then(() => {
      dispatch(contentLoadedDispatch());
    })
    .catch((err) => console.error(err));
};

export const fetchLatest = () => (dispatch) => {
  axios
    .get(`${apiServerBaseUrl}/movies/latest`, { withCredentials: true })
    .then((res) => {
      dispatch(fetchLatestDone(res.data));
    })
    .then(() => {
      dispatch(contentLoadedDispatch());
    })
    .catch((err) => console.error(err));
};

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
