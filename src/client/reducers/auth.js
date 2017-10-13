import * as actionTypes from 'actions/actionTypes';

const initialState = {
  isLoggedIn: false,
  email: null,
  refreshToken: null
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.AUTH_PASS:
      return {
        isLoggedIn: true,
        email: payload.email,
        refreshToken: payload.refreshToken
      };

    case actionTypes.AUTH_FAIL:
      return initialState;

    default:
      return state;
  }
};