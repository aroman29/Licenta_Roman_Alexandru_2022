import {
  API_URLS, API_REQUEST_METHODS, SERVER_RESPONSE, APP_PAGE_URLS,
} from '../../utils/constants';
import { SERVICE_ACTIONS, RESERVATION_ACTIONS } from './ActionTypes';
import { apiRequest, getUrl, authenticationApiRequest } from './apiActions';

const setSelectedService = (selectedLocation) => ({
  type: SERVICE_ACTIONS.SET_SELECTED_SERVICE,
  payload: selectedLocation,
});

const getServices = () => {
  const getLocationSuccess = (locationInfo) => ({
    type: SERVICE_ACTIONS.GET_SERVICES_SUCCESS,
    payload: locationInfo,
  });

  return (dispatch, getState) => dispatch(authenticationApiRequest(API_REQUEST_METHODS.GET,
    API_URLS.getServices))
    .then(async (response) => {
      if (response) {
        await dispatch(getLocationSuccess(response.data));
        const selectedService = response.data.find((service) => service.id === getState().service?.selectedService?.id);
        console.log(selectedService);
        setSelectedService(selectedService);
      }
    });
};

const addService = (address, city, latitude, longitude, reservationLimit) => {
  const addLocationsSuccess = (locationsInfo) => ({
    type: SERVICE_ACTIONS.ADD_SERVICE_SUCCESS,
    payload: locationsInfo,
  });
  const addLocationsFailure = (error) => ({
    type: SERVICE_ACTIONS.ADD_SERVICE_FAILURE,
    error,
  });

  console.log(reservationLimit);

  // eslint-disable-next-line max-len
  return (dispatch, getState) => dispatch(apiRequest(API_REQUEST_METHODS.POST, API_URLS.addService, {
    address: address,
    city: city,
    open: true,
    cars: null,
    lat: latitude,
    lng: longitude,
    reservationLimit: Number(reservationLimit)
  }))
    .then((response) => {
      if (response) {
        // if (!getState().service?.selectedService) {
        //   dispatch(setSelectedService(response.data));
        // }
        

        dispatch(addLocationsSuccess(response.data));


        // dispatch(notificationActions.showNotification(
        //   {
        //     serverResponse: SERVER_RESPONSE.success,
        //     pageUrl: APP_PAGE_URLS.locations,
        //     translationId: 'service.add',
        //   },
        // ));
      }
      return response;
    })
    .catch((error) => {
      dispatch(addLocationsFailure(error));
      return Promise.reject(error);
    });
};

const editService = (id, city, address, latitude, longitude, reservationLimit) => {
  const editServicesSuccess = (locationsInfo) => ({
    type: SERVICE_ACTIONS.EDIT_SERVICE_SUCCESS,
    payload: locationsInfo,
  });
  const editServicesFailure = (error) => ({
    type: SERVICE_ACTIONS.EDIT_SERVICE_FAILURE,
    error,
  });
  return (dispatch) => dispatch(apiRequest(API_REQUEST_METHODS.PUT,
    getUrl(API_URLS.serviceById, { id: id }), {
      id: id,
      address: address,
      city: city,
      open: true,
      lat: latitude,
      lng: longitude,
      reservationLimit: Number(reservationLimit)
    }))
    .then( async (response) => {
      if (response) {
        dispatch(editServicesSuccess(response.data));
        await dispatch(getServices());
      }
      return response;
    })
    .catch((error) => {
      dispatch(editServicesFailure(error));
      return Promise.reject(error);
    });
};

// const getLocation = (locationID) => (dispatch) => dispatch(apiRequest(API_REQUEST_METHODS.GET,
//   getUrl(API_URLS.locationByID, { locID: locationID })))
//   .then((response) => {
//     dispatch(setSelectedLocation(response.data));
//   });

const deleteService = (serviceId) => {
  const deleteLocationsSuccess = (id) => ({
    type: SERVICE_ACTIONS.DELETE_SERVICE_SUCCESS,
    payload: id,
  });
  const deleteLocationsFailure = (error) => ({
    type: SERVICE_ACTIONS.DELETE_SERVICE_FAILURE,
    error,
  });

  return (dispatch) => dispatch(apiRequest(API_REQUEST_METHODS.DELETE,
    getUrl(API_URLS.deleteServiceById, { id: serviceId })))
    .then( async (res) => {
      dispatch(deleteLocationsSuccess(serviceId));
      // await dispatch(getServices());

    })
    .catch((error) => {
      dispatch(deleteLocationsFailure(error));
    });
};

const changeStatusFilter = (payload) => ({
  type: SERVICE_ACTIONS.CHANGE_STATUS_FILTER,
  payload,
});



const changeReservationLimit = (limit, id) => {

  const editReservationLimitSuccess = (reservationLimit) => ({
    type: RESERVATION_ACTIONS.EDIT_RESERVATION_LIMIT_SUCCESS,
    payload: reservationLimit,
  });
  const editReservationLimitFailure = (error) => ({
    type: RESERVATION_ACTIONS.EDIT_RESERVATION_LIMIT_FAILURE,
    error,
  });

  console.log(getUrl(API_URLS.editReservationLimit, { serviceId: id }), Number(limit));

  return (dispatch) => dispatch(apiRequest(API_REQUEST_METHODS.PUT,
    getUrl(API_URLS.editReservationLimit, { serviceId: id }), {
      reservationLimit: Number(limit)
    }))
    .then((response) => {
      console.log("miau2");
      if (response) {
        
        dispatch(editReservationLimitSuccess(response.data));
        // await dispatch(getServices());
      }
      return response;
    })
    .catch((error) => {
      console.log(error);
      dispatch(editReservationLimitFailure(error));
      return Promise.reject(error);
    });
};


const addCustomReservationLimit = (serviceId, date, reservationLimit) => {
  const addCustomReservationLimitSuccess = (data) => ({
    type: SERVICE_ACTIONS.ADD_CUSTOM_RESERVATION_LIMIT_SUCCESS,
    payload: data,
  });
  const addCustomReservationLimitFailure = (error) => ({
    type: SERVICE_ACTIONS.ADD_CUSTOM_RESERVATION_LIMIT_FAILURE,
    error,
  });

  return (dispatch, getState) => dispatch(apiRequest(API_REQUEST_METHODS.POST, API_URLS.addCustomReservationLimit, {
    serviceId: serviceId,
    reservationLimit: reservationLimit,
    date: date.toString().substring(0,24)
  }))
    .then((response) => {
      if (response) {
        dispatch(addCustomReservationLimitSuccess(response.data));
      }
      return response;
    })
    .catch((error) => {
      dispatch(addCustomReservationLimitFailure(error));
      return Promise.reject(error);
    });
};

const addWeekCustomReservationLimit = (serviceId, start, day2, day3, day4, day5, day6, end, reservationLimit) => {
  const addWeekCustomReservationLimitSuccess = (locationsInfo) => ({
    type: SERVICE_ACTIONS.ADD_WEEK_CUSTOM_RESERVATION_LIMIT_SUCCESS,
    payload: locationsInfo,
  });
  const addWeekCustomReservationLimitFailure = (error) => ({
    type: SERVICE_ACTIONS.ADD_WEEK_CUSTOM_RESERVATION_LIMIT_FAILURE,
    error,
  });

  return (dispatch, getState) => dispatch(apiRequest(API_REQUEST_METHODS.POST, API_URLS.addCustomReservationLimits, {
    serviceId: serviceId,
    reservationLimit: reservationLimit,
    days: [start.toString().substring(0,24), day2.toString().substring(0,24), day3.toString().substring(0,24), day4.toString().substring(0,24),
       day5.toString().substring(0,24), day6.toString().substring(0,24), end.toString().substring(0,24)],

  }))
    .then((response) => {
      if (response) {
        dispatch(addWeekCustomReservationLimitSuccess(response.data));
      }
      return response;
    })
    .catch((error) => {
      dispatch(addWeekCustomReservationLimitFailure(error));
      return Promise.reject(error);
    });
};

const getLimitByDateInService = (date, service) => {
  const getLimitByDateSuccess = (locationInfo) => ({
    type: SERVICE_ACTIONS.GET_RESERVATION_LIMIT_BY_DATE_SUCCES,
    payload: locationInfo,
  });
  console.log(service);
  const getLimitByDateFailure = (error) => ({
    type: SERVICE_ACTIONS.ADD_WEEK_CUSTOM_RESERVATION_LIMIT_FAILURE,
    error,
  });

  return (dispatch, getState) => dispatch(apiRequest(API_REQUEST_METHODS.POST,
    getUrl(API_URLS.getReservationLimitByServiceId, {serviceId: service}), date))
    .then((response) => {
      if (response) {
        dispatch(getLimitByDateSuccess(response.data));
        return response.data;
      }
    })
    .catch((error) => {
      dispatch(getLimitByDateFailure(error));
      return Promise.reject(error);
    });
};

const getCustomServieLimits = (id) => {
  const getCustomLimitsSuccess = (locationInfo) => ({
    type: SERVICE_ACTIONS.GET_RESERVATION_LIMITS_SUCCES,
    payload: locationInfo,
  });

  return (dispatch, getState) => dispatch(authenticationApiRequest(API_REQUEST_METHODS.GET,
    getUrl(API_URLS.getReservationLimits, {serviceId: id})))
    .then(async (response) => {
      if (response) {
        await dispatch(getCustomLimitsSuccess(response.data));
        return response.data;
      }
    })
    .catch((error) => {
      return Promise.reject(error);
    })
};


export default {
  getServices,
  addService,
  editService,
  setSelectedService,
  deleteService,
  changeStatusFilter,
  changeReservationLimit,
  addCustomReservationLimit,
  addWeekCustomReservationLimit,
  getLimitByDateInService,
  getCustomServieLimits
};
