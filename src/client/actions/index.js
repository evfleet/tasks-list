import * as actionTypes from './actionTypes';

export const authPass = ({ email, refreshToken }) => ({
  type: actionTypes.AUTH_PASS,
  payload: {
    email,
    refreshToken
  }
});

export const authFail = () => ({
  type: actionTypes.AUTH_FAIL
});