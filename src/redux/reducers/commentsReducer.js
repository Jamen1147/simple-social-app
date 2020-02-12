import * as actionTypes from '../actions/types';

export default (
  state = {
    comments: [],
    errMsg: null,
    isLoadingForPost: null
  },
  action
) => {
  switch (action.type) {
    case actionTypes.ADD_COMMENT:
      action.payload.id = state.length + 1;
      return {
        comments: [...state.comments, action.payload],
        isLoadingForPost: null,
        errMsg: null
      };
    case actionTypes.ADD_COMMENT_LOADING:
      return { ...state, errMsg: null, isLoadingForPost: action.payload };
    case actionTypes.ADD_COMMENT_FAILED:
      return { ...state, errMsg: action.payload, isLoadingForPost: null };
    default:
      return state;
  }
};
