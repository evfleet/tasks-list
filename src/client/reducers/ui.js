import { REHYDRATE } from 'redux-persist/constants';

import * as actionTypes from 'actions/actionTypes';

const initialState = {
  ready: false,
  rehydrated: false
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case REHYDRATE:
      return {
        ...state,
        rehydrated: true
      };

    case actionTypes.AUTH_PASS:
    case actionTypes.AUTH_FAIL:
      return {
        ...state,
        ready: true
      };

    default:
      return state;
  }
};