import * as ActionTypes from './Actions';
import {combineReducers} from 'redux';
// import { sessionReducer } from 'redux-react-session';

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
  validateStatus: validateReducer
})