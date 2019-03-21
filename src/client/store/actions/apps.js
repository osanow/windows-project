import * as actionTypes from './actionTypes';

export const appOpen = () => ({
  type: actionTypes.APP_OPEN
});

export const appClose = () => ({
  type: actionTypes.APP_CLOSE
});

export const appMaximalize = () => ({
  type: actionTypes.APP_MAXIMALIZE
});

export const appHide = () => ({
  type: actionTypes.APP_HIDE
});

export const appShow = () => ({
  type: actionTypes.APP_SHOW
});
