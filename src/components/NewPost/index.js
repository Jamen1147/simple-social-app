import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addPost } from '../../redux/actions';

import Button from '../ButtonComponent';

import styles from './index.module.scss';

const NewPost = ({ isLoading, errMsg, addPost }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const sendForm = e => {
    e.preventDefault();
    if (title && body) {
      addPost({ title, body });
      setTitle('');
      setBody('');
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles['wrapper__text-box']}>
        <form className='form'>
          <div className={styles.form__group}>
            <input
              type='text'
              className={styles.form__input}
              placeholder='Title'
              onChange={e => setTitle(e.target.value)}
              value={title}
            />
          </div>
          <div className={styles.form__group}>
            <textarea
              rows='4'
              className={styles.form__input}
              placeholder='Body'
              onChange={e => setBody(e.target.value)}
              value={body}
              style={{ resize: 'none' }}
            />
          </div>
          <Button name='Post' isLoading={isLoading} onClick={sendForm} />

          {errMsg && <div>{errMsg}</div>}
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  isLoading: state.posts.isLoading,
  errMsg: state.posts.errMsg
});

const mapDispatchToPros = dispatch => ({
  addPost: form => dispatch(addPost(form))
});
export default connect(mapStateToProps, mapDispatchToPros)(NewPost);
