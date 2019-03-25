import axios from '../../axios-instance';

import * as actionTypes from './actionTypes';

export const authStart = () => ({
  type: actionTypes.AUTH_START
});

export const authSuccess = (token, userId, preferences) => {
  axios.defaults.headers.common.Authorization = token;
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    preferences,
    userId
  };
};

export const authSigninFail = error => ({
  type: actionTypes.AUTH_SIGNIN_FAIL,
  error
});

export const authLoginFail = error => ({
  type: actionTypes.AUTH_LOGIN_FAIL,
  error
});

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('userId');
  localStorage.removeItem('preferences');
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

export const checkAuthTimeout = expirationTime => (dispatch) => {
  setTimeout(() => {
    dispatch(logout());
  }, expirationTime * 1000);
};

export const auth = (
  email,
  password,
  isSignup,
  name = 'not set'
) => (dispatch) => {
  dispatch(authStart());
  const authData = {
    email,
    password,
    name
  };

  const url = isSignup ? 'auth/login/' : 'auth/signin/';

  axios
    .post(url, authData)
    .then((response) => {
      const {
        token, userId, expiresIn, preferences
      } = response.data;

      const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
      localStorage.setItem('token', token);
      localStorage.setItem('expirationDate', expirationDate);
      localStorage.setItem('userId', userId);
      localStorage.setItem('preferences', JSON.stringify(preferences));
      dispatch(authSuccess(token, userId, preferences));
      dispatch(checkAuthTimeout(expiresIn));
    })
    .catch((err) => {
      const errorMsg = err.response ? err.response.data.error : err;
      if (isSignup) dispatch(authLoginFail(errorMsg));
      else dispatch(authSigninFail(errorMsg));
    });
};

export const authCheckState = () => (dispatch) => {
  const token = localStorage.getItem('token');
  if (!token) {
    dispatch(logout());
  } else {
    const expirationDate = new Date(localStorage.getItem('expirationDate'));
    if (expirationDate <= new Date()) {
      dispatch(logout());
    } else {
      const userId = localStorage.getItem('userId');
      const preferences = JSON.parse(localStorage.getItem('preferences'));

      dispatch(authSuccess(token, userId, preferences));
      dispatch(
        checkAuthTimeout(
          (expirationDate.getTime() - new Date().getTime()) / 1000
        )
      );
    }
  }
};
