import * as ActionTypes from './Actions';
import {combineReducers} from 'redux';
import { sessionReducer } from 'redux-react-session';

const loginReducer = (prevState = {isLoggedIn: false}, action) => {
  switch(action.type){
    case ActionTypes.LOGIN_USER:
      return {...prevState, isLoggedIn: true}
    case ActionTypes.LOGOUT_USER:
      return {...prevState, isLoggedIn: false}
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
  session: sessionReducer
})