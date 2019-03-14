import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../utils/utility';

const initialState = {
  userId: null,
  token: null,
  preferences: {
    wallpaper: null
  },
  loginError: null,
  signinError: null,
  loading: false
};

const authStart = state => updateObject(state, { error: null, loading: true });

const authSuccess = (state, action) => updateObject(state, {
  token: action.idToken,
  userId: action.userId,
  preferences: action.preferences,
  loginError: null,
  signinError: null,
  loading: false
});

const authSigninFail = (state, action) => updateObject(state, {
  signinError: action.error,
  loading: false
});

const authLoginFail = (state, action) => updateObject(state, {
  loginError: action.error,
  loading: false
});

const authLogout = state => updateObject(state, { token: null, userId: null });

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state, action);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_LOGIN_FAIL:
      return authLoginFail(state, action);
    case actionTypes.AUTH_SIGNIN_FAIL:
      return authSigninFail(state, action);
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state, action);
    default:
      return state;
  }
};

export default reducer;
