import React, { useState } from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../../redux/actions';

import Button from '../ButtonComponent';

import styles from './index.module.scss';

const Login = ({ loginUser, user }) => {
  const [username, setUsername] = useState('');

  const handleLogin = evt => {
    evt.preventDefault();
    if (username) {
      loginUser(username);
      setUsername('');
    }
  };

  const onInputChange = evt => {
    setUsername(evt.target.value);
  };

  return (
    <div>
      <div className={styles.header}>
        <div className={styles['header__text-box']}>
          <h1 className={styles['heading-primary']}>
            <span className={styles['heading-primary--main']}>Post App</span>
            <span className={styles['heading-primary--sub']}>Login</span>
          </h1>
          <form className='form'>
            <div className={styles.form__group}>
              <input
                id='username'
                type='text'
                className={styles.form__input}
                placeholder='username = Bret'
                onChange={onInputChange}
                value={username}
              />
            </div>
            <div className={styles.form__group}>
              <input
                id='password'
                type='password'
                className={styles.form__input}
                placeholder='password = any'
              />
            </div>
            <Button
              onClick={handleLogin}
              name='Login'
              isLoading={user.isLoading}
            />
            {user.errMsg && <div>{user.errMsg}</div>}
          </form>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  loginUser: username => dispatch(loginUser(username))
});

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
