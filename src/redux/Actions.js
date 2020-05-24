//action types
export const LOGIN_USER = 'LOGIN_USER';
export const LOGOUT_USER = 'LOGOUT_USER';

//action creators
export const loginUser = (user) => ({
  type: LOGIN_USER,
  user
});

export const logoutUser = () => ({
  type: LOGOUT_USER
})