import { LOGIN_ACTIONS } from './ActionTypes';

const logout = () => {
  console.log("logout")
  const logoutSuccess = () => ({
    type: LOGIN_ACTIONS.LOGOUT,
  });
  return (dispatch) => dispatch(logoutSuccess());
};

const requestLogout = () => ({
  type: LOGIN_ACTIONS.REQUEST_LOGOUT,
});

const invalidTokenLogout = () => ({
  type: LOGIN_ACTIONS.INVALID_TOKEN,
});

export default { logout, invalidTokenLogout, requestLogout };
