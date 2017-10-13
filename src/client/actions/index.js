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

export const registerPass = () => ({
  type: actionTypes.REGISTER_PASS
});

export const registerFail = () => ({
  type: actionTypes.REGISTER_FAIL
});

export const loginPass = () => ({
  type: actionTypes.LOGIN_PASS
});

export const loginFail = () => ({
  type: actionTypes.LOGIN_FAIL
});

export const logout = () => ({
  type: actionTypes.LOGOUT
});

export const verificationPass = ({ email }) => ({
  type: actionTypes.VERIFICATION_PASS,
  payload: {
    email
  }
});

export const verificationFail = ({ email }) => ({
  type: actionTypes.VERIFICATION_FAIL,
  payload: {
    email
  }
});