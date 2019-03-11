import axios from '../../axios-instance';

import * as actionTypes from './actionTypes';

export const authStart = () => ({
  type: actionTypes.AUTH_START
});

export const authSuccess = (token, userId) => ({
  type: actionTypes.AUTH_SUCCESS,
  idToken: token,
  userId
});

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
  name = 'not set',
  isSignup
) => (dispatch) => {
  dispatch(authStart());
  const authData = {
    email,
    password,
    name
  };

  const url = isSignup ? 'login/' : 'signin/';

  axios
    .post(url, authData)
    .then((response) => {
      const expirationDate = new Date(
        new Date().getTime() + response.data.expiresIn * 1000
      );
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('expirationDate', expirationDate);
      localStorage.setItem('userId', response.data.userId);
      dispatch(authSuccess(response.data.token, response.data.userId));
      dispatch(checkAuthTimeout(response.data.expiresIn));
    })
    .catch((err) => {
      if (isSignup) dispatch(authLoginFail(err.response.data.error));
      else dispatch(authSigninFail(err.response.data.error));
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

      axios.post('checkToken/', { token, userId })
        .then(() => {
          dispatch(authSuccess(token, userId));
          dispatch(
            checkAuthTimeout(
              (expirationDate.getTime() - new Date().getTime()) / 1000
            )
          );
        })
        .catch(() => {
          dispatch(logout());
        });
    }
  }
};
