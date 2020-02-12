import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, isLoggedIn, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (isLoggedIn) {
          return <Component {...props} />;
        } else {
          return <Redirect to={'/'} />;
        }
      }}
    />
  );
};

const mapStateToProps = state => ({
  isLoggedIn: state.user.loggedIn
});

export default connect(mapStateToProps)(ProtectedRoute);
