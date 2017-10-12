import { REHYDRATE } from 'redux-persist/constants';

const initialState = {
  rehydrated: false,
  isLoading: true,
  auth: {

  }
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case REHYDRATE:
      return {
        ...state,
        rehydrated: true
      };

    default:
      return state;
  }
};