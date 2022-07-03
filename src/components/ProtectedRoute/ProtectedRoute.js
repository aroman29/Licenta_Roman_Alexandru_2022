import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { APP_PAGE_URLS } from '../../utils/constants';

function ProtectedRoute({ component: Component, ...rest }) {
  const isUserLogged = useSelector((state) => state.login.loggedIn);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (isUserLogged) {
          return <Component {...props} />;
        }
        return <Redirect to={`/${APP_PAGE_URLS.login}`} />;
      }}
    />
  );
}

ProtectedRoute.propTypes = {
  component: PropTypes.func.isRequired,
};

export default ProtectedRoute;
