import { API_REQUEST_METHODS, API_URLS } from '../../utils/constants';
import { LOGIN_ACTIONS,USER_ACTIONS } from './ActionTypes';
import { apiRequest, authenticationApiRequest } from './apiActions';
import ServiceActions from './ServiceActions';

const login = (username, password) => {
  const loginRequest = () => ({
    type: LOGIN_ACTIONS.LOGIN_REQUEST,
  });

  const setToken = (accessToken) => ({
    type: LOGIN_ACTIONS.SET_TOKEN,
    accessToken,
  });

  const loginFailure = (error) => ({
    type: LOGIN_ACTIONS.LOGIN_FAILURE,
    error,
  });

  return (dispatch, getState) => {
    // axios call
    let accessToken = null;
    dispatch(loginRequest());

    return dispatch(authenticationApiRequest(API_REQUEST_METHODS.POST, API_URLS.authenticate, {
      email: username,
      password: password,
    }))
      .then(async (response) => {
        
        if (response.data?.jwt) {
          accessToken = response.data.jwt;
          console.log(response.data.usersDTO);
          await dispatch(setToken(accessToken));
          await dispatch(setCurrentUser(response.data.usersDTO));
          console.log(response.data?.jwt);
          
          await dispatch(ServiceActions.getServices());
          const services = getState().service.services;
          const selectedLocation = getState().service.selectedService;
          if(selectedLocation == null && response.data.usersDTO.role.toString() !== "0"){
            const service = getState().service.services.find((service) => service.id === response.data.usersDTO?.serviceId);
            await dispatch(ServiceActions.setSelectedService(service));
          } else {
            await dispatch(ServiceActions.setSelectedService(services ? services[0] : ""));
          }
          
          } else {
            dispatch(loginFailure("Could not sign in."));
          }
          return response.data.usersDTO;
      })
      .catch((error) => {
        dispatch(loginFailure(error));
      });
  };
};

const loginSuccess = () => ({
  type: LOGIN_ACTIONS.LOGIN_SUCCESS,
});

const deleteError = () => ({
  type: LOGIN_ACTIONS.DELETE_ERROR,
});

const setCurrentUser = (userDetails) => ({
  type: USER_ACTIONS.GET_USER_SUCCESS,
  payload: userDetails,
});

const logout = () => {
  const logoutSuccess = () => ({
    type: LOGIN_ACTIONS.LOGOUT,
  });
  return (dispatch) => dispatch(logoutSuccess());
};

export default { login, logout, loginSuccess, setCurrentUser,deleteError };
