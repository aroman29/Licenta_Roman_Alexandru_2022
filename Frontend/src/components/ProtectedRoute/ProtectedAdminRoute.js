import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { APP_PAGE_URLS, USER_TYPE } from '../../utils/constants';

function ProtectedAdminRoute({ component: Component, ...rest }) {
  const isUserLogged = useSelector((state) => state.login.loggedIn);
  const userRole = useSelector((state) => state.user.currentUser)?.role;

  return (
    <Route
      {...rest}
      render={(props) => {
        if (isUserLogged && (userRole.toString() === USER_TYPE.admin.toString() || userRole.toString() === USER_TYPE.staff.toString())) {
          return <Component {...props} />;
        }
        return <Redirect to={`/${APP_PAGE_URLS.login}`} />;
      }}
    />
  );
}

ProtectedAdminRoute.propTypes = {
  component: PropTypes.func.isRequired,
};

export default ProtectedAdminRoute;
