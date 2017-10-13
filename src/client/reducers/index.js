import { REHYDRATE } from 'redux-persist/constants';

import * as actionTypes from 'actions/actionTypes';

const initialState = {
  isLoading: true,
  rehydrated: false,
  auth: {
    isLoggedIn: false,
    email: null,
    refreshToken: null
  }
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  console.log(type, payload);

  switch (type) {
    case REHYDRATE:
      return {
        ...state,
        rehydrated: true
      };

    case actionTypes.AUTH_PASS:
      return {
        ...state,
        isLoading: false,
        auth: {
          isLoggedIn: true,
          email: payload.email,
          refreshToken: payload.refreshToken
        }
      };

    case actionTypes.AUTH_FAIL:
      return {
        ...state,
        isLoading: false,
        auth: {
          isLoggedIn: false,
          email: null,
          refreshToken: null
        }
      };

    default:
      return state;
  }
};