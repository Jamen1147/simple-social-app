import * as actionTypes from '../actions/types';
import _ from 'lodash';

export default (
  state = { posts: {}, errMsg: null, isLoading: false },
  action
) => {
  switch (action.type) {
    case actionTypes.ADD_POSTS:
      return {
        posts: { ...state.posts, ..._.mapKeys(action.payload, 'id') },
        errMsg: null,
        isLoading: false
      };
    case actionTypes.ADD_POST:
      const post = {
        id: Object.values(state.posts).length + 1,
        ...action.payload
      };
      return {
        errMsg: null,
        isLoading: false,
        posts: { ...state.posts, ..._.mapKeys([post], 'id') }
      };
    case actionTypes.ADD_POST_LOADING:
      return { ...state, errMsg: null, isLoading: true };
    case actionTypes.ADD_POST_FAILED:
      return { ...state, errMsg: action.payload, isLoading: false };
    default:
      return state;
  }
};
