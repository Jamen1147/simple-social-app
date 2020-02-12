import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { postFavorite, addComment } from '../../redux/actions';
import history from '../../history';

import Button from '../ButtonComponent';

import styles from './index.module.scss';

const CommentForm = ({ postId, addComment, comments }) => {
  const [input, setInput] = useState('');
  const onInputChange = evt => {
    setInput(evt.target.value);
  };
  const handleSubmit = evt => {
    evt.preventDefault();
    if (input) {
      addComment(postId, input);
      setInput('');
    }
  };
  return (
    <form className='form'>
      <div className={styles.form__group}>
        <input
          required
          type='text'
          className={styles.form__input}
          placeholder='any comments'
          value={input}
          onChange={onInputChange}
        />
      </div>
      <Button
        onClick={handleSubmit}
        name='Add Comment'
        isLoading={comments.isLoadingForPost === postId}
      />
    </form>
  );
};

const Post = ({ post, comments, addComment }) => {
  return (
    <React.Fragment>
      <div className={styles['heading-primary']}>
        <span className={styles['heading-primary--main']}>{post.title}</span>
        <span className={styles['heading-primary--sub']}>{post.body}</span>
      </div>
      <hr />
      {comments.comments
        .filter(c => c.postId === post.id)
        .map(c => (
          <div key={c.id} className={styles['heading-primary']}>
            <span className={styles['heading-primary--sub']}>{c.comment}</span>
          </div>
        ))}
      <CommentForm
        postId={post.id}
        addComment={addComment}
        comments={comments}
      />
      {comments.errMsg && <div>{comments.errMsg}</div>}
    </React.Fragment>
  );
};

const PostList = ({ posts, comments, postFavorite, addComment }) => {
  useEffect(() => {
    postFavorite();
  }, [postFavorite]);

  const addNewPost = () => {
    history.push('/posts/new');
  };
  if (posts.length) {
    return (
      <div className={styles.wrapper}>
        <Button
          onClick={addNewPost}
          name='New Post'
          style={{ marginBottom: '3rem' }}
        />
        <div>
          {posts.map(p => (
            <div key={p.id} className={styles.wrapper__item}>
              <Post post={p} comments={comments} addComment={addComment} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return <div className={styles.wrapper}></div>;
};

const mapDispatchToPros = dispatch => ({
  postFavorite: () => dispatch(postFavorite()),
  addComment: (postId, input) => dispatch(addComment(postId, input))
});

const mapStateToProps = state => ({
  posts: Object.values(state.posts.posts),
  comments: state.comments
});

export default connect(mapStateToProps, mapDispatchToPros)(PostList);
