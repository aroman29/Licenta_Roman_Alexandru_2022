import {
  API_URLS, API_REQUEST_METHODS, SERVER_RESPONSE, APP_PAGE_URLS, COMBUSTIBLE, STATUSSES
} from '../../utils/constants';
import { CAR_ACTIONS, CAR_REPAIR_ACTIONS } from './ActionTypes';
import { apiRequest, getUrl, authenticationApiRequest } from './apiActions';

const getCars = () => {
  const getCarsSuccess = (car) => ({
    type: CAR_ACTIONS.GET_CARS_SUCCESS,
    payload: car,
  });
  const getCarsError = (car) => ({
    type: CAR_ACTIONS.GET_CARS_FAILURE,
    payload: car,
  });

  return (dispatch, getState) => dispatch(apiRequest(API_REQUEST_METHODS.GET,
    API_URLS.getCars))
    .then((response) => {
      if (response) {
        const cars = response.data.map((car) => {
          let newCar = car;
          newCar.combustible = COMBUSTIBLE[car.combustible];
          newCar.status = STATUSSES[car.status];
          return newCar;
        })
        dispatch(getCarsSuccess(cars));
      }
    })
    .catch((error) => {
      dispatch(getCarsError(error));
    });
};

const getCarsJobsByCarId = (id) => {
  const getCarJobsSuccess = (carjob) => ({
    type: CAR_REPAIR_ACTIONS.ADD_CAR_REPAIR_SUCCESS,
    payload: carjob,
  });
  const getCarJobsError = (error) => ({
    type: CAR_REPAIR_ACTIONS.ADD_CAR_REPAIR_FAILURE,
    error,
  });

  return (dispatch, getState) => dispatch(apiRequest(API_REQUEST_METHODS.GET,
    getUrl(API_URLS.getCarRepairsByCarId, {carId: id})))
    .then((response) => {
      if (response) {
        dispatch(getCarJobsSuccess(response.data));
        return response.data;
        
      }
    })
    .catch((error) => {
      dispatch(getCarJobsError(error));
    });
};

const getCarsJobs = (id) => {
  const getCarJobsSuccess = (carjob) => ({
    type: CAR_REPAIR_ACTIONS.GET_CARS_REPAIR_SUCCESS,
    payload: carjob,
  });
  const getCarJobsError = (error) => ({
    type: CAR_REPAIR_ACTIONS.GET_CARS_REPAIR_FAILURE,
    error,
  });

  return (dispatch, getState) => dispatch(apiRequest(API_REQUEST_METHODS.GET,
    API_URLS.getCarjobs))
    .then(async (response) => {
      if (response) {
        await dispatch(getCarJobsSuccess(response.data));
        return response.data;
        
      }
    })
    .catch((error) => {
      dispatch(getCarJobsError(error));
    });
};

const addCarRepair = (data, carId) => {
  const addCarRepairSuccess = (repair) => ({
    type: CAR_REPAIR_ACTIONS.ADD_CAR_REPAIR_SUCCESS,
    payload: repair,
  });
  const addCarRepairFailure = (error) => ({
    type: CAR_REPAIR_ACTIONS.ADD_CAR_REPAIR_FAILURE,
    error,
  });

  // eslint-disable-next-line max-len
  return (dispatch, getState) => dispatch(apiRequest(API_REQUEST_METHODS.POST, API_URLS.insertCarRepair, {
    name: data.name,
    description: data.description,
    price: Number(data.price),
    duration: data.duration,
    carId: carId
  }))
    .then((response) => {
      if (response) {
        
        dispatch(addCarRepairSuccess(response.data));

      }
      return response;
    })
    .catch((error) => {
      dispatch(addCarRepairFailure(error));
      return Promise.reject(error);
    });
};


const editCarStatus = (id, stat) => {
  const editCarSuccess = (car) => ({
    type: CAR_ACTIONS.EDIT_CAR_SUCCESS,
    payload: car,
  });
  const editCarFailure = (error) => ({
    type: CAR_ACTIONS.EDIT_CAR_FAILURE,
    error,
  });
  return (dispatch, getState) => dispatch(apiRequest(API_REQUEST_METHODS.POST,
    API_URLS.carStatusEditById, {
      carId: id,
      status: Number(stat)
    }))
    .then( async(response) => {
      if (response) {
        dispatch(editCarSuccess(response.data));
        await dispatch(getCars());
      }
      return response;
    })
    .catch((error) => {
      console.log(error);
      dispatch(editCarFailure(error));
      return Promise.reject(error);
    });
};

const deleteCarJob = (carJobid) => {
  const editCarSuccess = (car) => ({
    type: CAR_ACTIONS.EDIT_CAR_SUCCESS,
    payload: car,
  });
  const editCarFailure = (error) => ({
    type: CAR_ACTIONS.EDIT_CAR_FAILURE,
    error,
  });
  return (dispatch, getState) => dispatch(apiRequest(API_REQUEST_METHODS.POST,
    API_URLS.carDelete, {
      id: carJobid

    }))
    .then( async(response) => {
      if (response) {
        dispatch(editCarSuccess(response.data));
        await dispatch(getCarsJobs());
      }
      return response;
    })
    .catch((error) => {
      console.log(error);
      dispatch(editCarFailure(error));
      return Promise.reject(error);
    });
};

const getCarProblems = () => {
  const getCarProblemsSuccess = (car) => ({
    type: CAR_ACTIONS.GET_CAR_PROBLEMS_SUCCESS,
    payload: car,
  });
  const getCarProblemsError = (car) => ({
    type: CAR_ACTIONS.GET_CAR_PROBLEMS_FAILURE,
    payload: car,
  });

  return (dispatch, getState) => dispatch(apiRequest(API_REQUEST_METHODS.GET,
    API_URLS.getCarProblems))
    .then((response) => {
      if (response) {
        // const cars = response.data.map((car) => {
        //   let newCar = car;
        //   newCar.combustible = COMBUSTIBLE[car.combustible];
        //   newCar.status = STATUSSES[car.status];
        //   return newCar;
        // })
        dispatch(getCarProblemsSuccess(response.data));
        return response.data;
      }
    })
    .catch((error) => {
      dispatch(getCarProblemsError(error));
    });
};


export default { getCars, addCarRepair, editCarStatus, getCarsJobsByCarId, getCarsJobs, deleteCarJob, getCarProblems };