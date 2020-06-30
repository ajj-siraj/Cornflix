import * as ActionTypes from './Actions';
import {combineReducers} from 'redux';
// import { sessionReducer } from 'redux-react-session';

const contentLoadReducer = (prevState = {loadedCount: 0}, action) => {
  switch(action.type){
    case ActionTypes.CONTENT_LOADED:
      let newState = prevState.loadedCount >= 4 ? prevState : {...prevState, loadedCount: prevState.loadedCount+1};
      return newState
    default:
      return prevState;
  }
}

const loginReducer = (prevState = {isLoggedIn: false}, action) => {
  switch(action.type){
    case ActionTypes.LOGIN_USER:
      return {...prevState, ...action.user, isLoggedIn: true}
    case ActionTypes.LOGOUT_USER:
      return {...prevState, isLoggedIn: false}
    default:
      return prevState;
  }
}

const loadingReducer = (prevState = {isLoading: true}, action) => {
  switch(action.type){
    case ActionTypes.LOADING_COMPLETE:
      return {...prevState, isLoading: false};
    default:
      return prevState;
  }
}

const tabReducer = (prevState = {tab: "profile"}, action) => {
  switch(action.type){
    case ActionTypes.UPDATE_TAB:
      return {...prevState, tab: action.tab};
    default:
      return prevState;
  }
}

const fetchReducer = (prevState = {news: [], topMovies: [], latestMovies: []}, action) => {
  switch(action.type){

    case ActionTypes.FETCH_NEWS_DONE:
      return {...prevState, news: action.news};
    case ActionTypes.FETCH_TOP_DONE:
      return {...prevState, topMovies: action.topMovies};
    case ActionTypes.FETCH_LATEST_DONE:
      return {...prevState, latestMovies: action.latestMovies};
    default:
      return prevState;
  }
}

const validateReducer = (prevState = {}, action) => {
  switch(action.type){
    case ActionTypes.VERIFIED:
      return prevState;
    default:
      return prevState;
  }
}
// const logoutReducer = (prevState = {user: {isLoggedIn: false}}, action) => {
//   switch(action.type){
//     case ActionTypes.LOGOUT_USER:
//       return {...prevState, user: {isLoggedIn: false}}
//     default:
//       return prevState;
//   }
// }

export default combineReducers({
  loginStatus: loginReducer,
  loadingStatus: loadingReducer,
  validateStatus: validateReducer,
  tab: tabReducer,
  data: fetchReducer,
  loadedCount: contentLoadReducer
})