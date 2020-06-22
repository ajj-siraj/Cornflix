import axios from "axios";
import { apiServerBaseUrl, newsApiKey } from "../config";

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

export const fetchNewsDone = (news) => ({
  type: FETCH_NEWS_DONE,
  news: news
})

export const fetchTopDone = (top) => ({
  type: FETCH_TOP_DONE,
  topMovies: top
})

export const fetchLatestDone = (latest) => ({
  type: FETCH_LATEST_DONE,
  latestMovies: latest
})

//I was here, fetching works but data is not stored in redux Store for some reason.
export const fetchNews = () => (dispatch) => {
  const newsAPI = `https://newsapi.org/v2/everything?q=boxoffice&apiKey=${newsApiKey}&language=en`;
  console.log("INSIDE THE FETCHNEWS DISPATCH");
  fetch(newsAPI)
    .then((res) => res.json())
    .then((res) => res.articles.slice(0, 5))
    .then((res) => {
      dispatch(fetchNewsDone(res));
    })
    .then(() => {
      dispatch(loadingComplete());
    })
    .catch((err) => console.error(err));
};

export const fetchTop = () => (dispatch) => {
  axios
    .get(`${apiServerBaseUrl}/movies/top`, { withCredentials: true })
    .then((res) => {
      dispatch(fetchTopDone(res.data))
    })
    .catch((err) => console.error(err));
};

export const fetchLatest = () => (dispatch) => {
  axios
    .get(`${apiServerBaseUrl}/movies/latest`, { withCredentials: true })
    .then((res) => {
      dispatch(fetchLatestDone(res.data))
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
