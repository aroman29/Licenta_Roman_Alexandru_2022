import {
  API_URLS, API_REQUEST_METHODS, SERVER_RESPONSE, APP_PAGE_URLS,
} from '../../utils/constants';
import { RESERVATION_ACTIONS } from './ActionTypes';
import { apiRequest, getUrl, authenticationApiRequest } from './apiActions';
import carActions from './carActions';

const getReservations = () => {
  const getReservationSuccess = (reservation) => ({
    type: RESERVATION_ACTIONS.GET_RESERVATION_SUCCESS,
    payload: reservation,
  });
  const getReservationError = (reservation) => ({
    type: RESERVATION_ACTIONS.GET_RESERVATION_FAILURE,
    payload: reservation,
  });

  return (dispatch, getState) => dispatch(apiRequest(API_REQUEST_METHODS.GET,
    API_URLS.getReservations))
    .then((response) => {
      if (response) {
        dispatch(getReservationSuccess(response.data));
      }
    })
    .catch((error) => {
      dispatch(getReservationError(error));
    });
};

const getReservationsUnautorised = () => {
  const getReservationSuccess = (reservation) => ({
    type: RESERVATION_ACTIONS.GET_RESERVATION_SUCCESS,
    payload: reservation,
  });
  const getReservationError = (reservation) => ({
    type: RESERVATION_ACTIONS.GET_RESERVATION_FAILURE,
    payload: reservation,
  });

  return (dispatch, getState) => dispatch(authenticationApiRequest(API_REQUEST_METHODS.GET,
    API_URLS.getReservations))
    .then((response) => {
      if (response) {
        dispatch(getReservationSuccess(response.data));
      }
    })
    .catch((error) => {
      dispatch(getReservationError(error));
    });
};

const addReservation = (data) => {

  console.log("000");

  const addReservationSuccess = (reservation) => ({
    type: RESERVATION_ACTIONS.ADD_RESERVATION_SUCCESS,
    payload: reservation,
  });
  const addReservationError = (reservation) => ({
    type: RESERVATION_ACTIONS.ADD_RESERVATION_FAILURE,
    payload: reservation,
  });


  const dataObject = {
    mark: data.mark,
    model: data.model,
    generation: data.generation,
    combustible: data.combustible,
    fabricationDate: data.fabricationDate,
    date: data.date,
    serviceId: data.serviceId,
    userId: data.userId,
    option0: data.option0,
    option1: data.option1,
    option2: data.option2,
    option3: data.option3,
    option4: data.option4,
    option5: data.option5,
    notes: data.notes,
  }

  return (dispatch, getState) => dispatch(apiRequest(API_REQUEST_METHODS.POST, API_URLS.reservationInsert, dataObject))
    .then(async (response) => {
      console.log("222");
      if (response) {

        dispatch(addReservationSuccess(response.data));
        await dispatch(carActions.getCars());
        await dispatch(carActions.getCarProblems());


      }
      return response;
    })
    .catch((error) => {
      dispatch(addReservationError(error));
      return Promise.reject(error);
    });
};


export default { getReservations, addReservation, getReservationsUnautorised };