import posts from '../../apis/posts';
import * as types from './types';
import history from '../../history';

export const loginUser = username => dispatch => {
  dispatch({
    type: types.USER_LOGIN_LOADING
  });
  posts
    .get(`users?username=${username}`)
    .then(res => {
      return res.data[0];
    })
    .then(user => {
      if (user) {
        const { username, id } = user;
        localStorage.setItem('uid', id);
        dispatch({
          type: types.USER_LOGIN,
          payload: { username, id }
        });
        history.push('/posts');
      } else {
        dispatch({
          type: types.USER_LOGIN_FAILED,
          payload: 'User not found'
        });
      }
    })
    .catch(e => {
      dispatch({
        type: types.USER_LOGIN_FAILED,
        payload: 'User not found'
      });
    });
};

export const postFavorite = () => dispatch => {
  posts
    .get('posts?_limit=10')
    .then(res => res.data)
    .then(posts => {
      dispatch({
        type: types.ADD_POSTS,
        payload: posts
      });
    })
    .catch(e => {
      console.log(e);
    });
};

export const addPost = ({ title, body }) => dispatch => {
  dispatch({
    type: types.ADD_POST_LOADING
  });
  posts
    .post('posts', {
      title,
      body
    })
    .then(res => res.data)
    .then(post => {
      if (post) {
        dispatch({
          type: types.ADD_POST,
          payload: {
            userId: localStorage.getItem('uid'),
            title,
            body
          }
        });
        history.push('/posts');
      } else {
        dispatch({
          type: types.ADD_POST_FAILED,
          payload: 'Cannot add post'
        });
      }
    })
    .catch(e => {
      dispatch({
        type: types.ADD_POST_FAILED,
        payload: 'Cannot add post'
      });
    });
};

export const addComment = (postId, comment) => dispatch => {
  dispatch({
    type: types.ADD_COMMENT_LOADING,
    payload: postId
  });
  posts
    .post('comments', {
      postId,
      body: comment
    })
    .then(res => {
      if (res.data) {
        dispatch({
          type: types.ADD_COMMENT,
          payload: { postId, comment }
        });
      } else {
        dispatch({
          type: types.ADD_COMMENT_FAILED,
          payload: 'Cannot Add Comment'
        });
      }
    })
    .catch(e => {
      dispatch({
        type: types.ADD_COMMENT_FAILED,
        payload: 'Cannot Add Comment'
      });
    });
};
