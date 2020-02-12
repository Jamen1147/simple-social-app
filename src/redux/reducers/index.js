import { combineReducers } from 'redux';
import userReducer from './userReducer';
import postsReducer from './postsReducer';
import commentsReducer from './commentsReducer';

export default combineReducers({
  user: userReducer,
  posts: postsReducer,
  comments: commentsReducer
});
