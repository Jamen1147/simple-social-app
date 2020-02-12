import * as actionTypes from '../actions/types';

export default (
  state = {
    username: null,
    id: null,
    loggedIn: false,
    errMsg: null,
    isLoading: false
  },
  action
) => {
  switch (action.type) {
    case actionTypes.USER_LOGIN:
      const { username, id } = action.payload;
      return {
        ...state,
        username,
        id,
        loggedIn: true,
        isLoading: false,
        errMsg: null
      };
    case actionTypes.USER_LOGIN_LOADING:
      return { ...state, loggedIn: false, errMsg: null, isLoading: true };
    case actionTypes.USER_LOGIN_FAILED:
      return {
        ...state,
        loggedIn: false,
        errMsg: action.payload,
        isLoading: false
      };
    default:
      return state;
  }
};
