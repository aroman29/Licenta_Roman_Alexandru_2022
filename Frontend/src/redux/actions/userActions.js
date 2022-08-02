import {
  API_URLS, API_REQUEST_METHODS, USER_TYPE, CONTRACT_STATUSES,
} from '../../utils/constants';
import { USER_ACTIONS, LOGIN_ACTIONS } from '../../redux/actions/ActionTypes';
import ServiceActions from './ServiceActions';
import reservationActions from './reservationActions';
import carActions from './carActions';
import messageActions from './MessageActions';
import { apiRequest, getUrl, authenticationApiRequest } from './apiActions';


export const getAllUsers = () => {
  const getAllUsersSuccess = (users) => ({
    type: USER_ACTIONS.GET_ALL_USERS_SUCCESS,
    payload: users,
  });
  const getAllUsersFailure = (error) => ({
    type: USER_ACTIONS.GET_ALL_USERS_FAILURE,
    payload: error,
  });

  return (dispatch) => {
    dispatch(apiRequest(API_REQUEST_METHODS.GET, API_URLS.allUsers))
      .then((response) => {
        dispatch(getAllUsersSuccess(response.data));
      })
      .catch((error) => {
        dispatch(getAllUsersFailure(error.message));
      });
  };
};

export const resetUser = () => ({
  type: LOGIN_ACTIONS.LOGOUT,
});

export const getAdminMainData = () => async (dispatch, getState) => {
  if (getState().user.currentUser) {
    
    await dispatch(ServiceActions.getServices());
    await dispatch((messageActions.getMessages()));
    await dispatch(carActions.getCarsJobs());
    await dispatch(carActions.getCars());
    await dispatch(carActions.getCarProblems());
    await dispatch(getAllUsers());
    const services = getState().service.services;
    const selectedLocation = getState().service.selectedService;
    if(selectedLocation == null){
      await dispatch(ServiceActions.setSelectedService(services ? getState().service.services[0] : ''));
    }
    
  }
};

export const getMainData = () => async (dispatch, getState) => {
  if (getState().user.currentUser) {
    await dispatch(ServiceActions.getServices());
    await dispatch(reservationActions.getReservations());
    await dispatch(carActions.getCars());
    await dispatch(carActions.getCarProblems());
    await dispatch((messageActions.getMessages()));
    await dispatch(getAllUsers());
    

  } else {
    await dispatch(ServiceActions.getServices());
    await dispatch(reservationActions.getReservationsUnautorised());
  }
};

export const deleteUser = (id) => {
  const deleteUserSuccess = (user) => ({
    type: USER_ACTIONS.EDIT_USER_SUCCESS,
    payload: user,
  });
  const edeleteUserFailure = (error) => ({
    type: USER_ACTIONS.EDIT_USER_FAILURE,
    error,
  });
  return (dispatch, getState) => dispatch(apiRequest(API_REQUEST_METHODS.PUT,
    getUrl(API_URLS.deleteUserById, {id: id})))
    .then( async(response) => {
      if (response) {
        dispatch(deleteUserSuccess(response.data));
        await dispatch(getAllUsers());
      }
      return response;
    })
    .catch((error) => {
      console.log(error);
      dispatch(edeleteUserFailure(error));
      return Promise.reject(error);
    });
};

