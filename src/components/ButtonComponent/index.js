import React from 'react';
import styles from './index.module.scss';

const Button = ({ name, onClick, isLoading, style }) => {
  return (
    <button className={styles.btn} onClick={onClick} style={style}>
      {isLoading ? 'Loading...' : name}
    </button>
  );
};

export default Button;
