import { CAR_ACTIONS, CAR_REPAIR_ACTIONS } from '../actions/ActionTypes';

const initialState = {
  cars: [],
  carJobs: [],
  problems: [],
  carApiError: '',
};

export const carReducer = (state = initialState, action) => {
  switch (action.type) {
    case CAR_ACTIONS.GET_CARS_SUCCESS:
      return {
        ...state,
        cars: action.payload,
        carApiError: ''
      };
    case CAR_ACTIONS.GET_CARS_FAILURE:
      return {
        ...state,
        carApiError: action.payload
      };

    case CAR_ACTIONS.GET_CAR_PROBLEMS_SUCCESS:
      return {
        ...state,
        problems: action.payload,
        carApiError: ''
      };
    case CAR_ACTIONS.GET_CAR_PROBLEMS_FAILURE:
      return {
        ...state,
        carApiError: action.payload
      };

    case CAR_REPAIR_ACTIONS.GET_CARS_REPAIR_SUCCESS:
      return {
        ...state,
        carJobs: action.payload,
        carApiError: ''
      };
    case CAR_REPAIR_ACTIONS.GET_CARS_REPAIR_FAILURE:
      return {
        ...state,
        carApiError: action.payload
      };

    case CAR_REPAIR_ACTIONS.ADD_CAR_REPAIR_SUCCESS:
      return {
        ...state,
        carJobs: [...state.carJobs, action.payload],
        carApiError: ''
      };
      case CAR_REPAIR_ACTIONS.ADD_CAR_REPAIR_FAILURE:
        return {
          ...state,
          carApiError: action.payload
        };


    default:
      return state;
  }
};

export default carReducer;
