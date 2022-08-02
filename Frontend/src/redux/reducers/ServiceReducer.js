import { SERVICE_ACTIONS } from '../actions/ActionTypes';

const initialState = {
  services: [],
  selectedService: null,
  addServiceError: '',
  deleteServiceError: '',
};

export const serviceReducer = (state = initialState, action) => {
  switch (action.type) {
    case SERVICE_ACTIONS.GET_SERVICES_SUCCESS:
      return {
        ...state,
        services: action.payload,
      };
      case SERVICE_ACTIONS.GET_SERVICES_FAILURE:
        return {
          ...state,
        };
    case SERVICE_ACTIONS.ADD_SERVICE_SUCCESS:
      return {
        ...state,
        services: [...state.services, action.payload],
        addServiceError: false,
      };
    case SERVICE_ACTIONS.ADD_SERVICE_FAILURE:
      return {
        ...state,
        addServiceError: action.error,
      };
    case SERVICE_ACTIONS.SET_SELECTED_SERVICE:
      return {
        ...state,
        selectedService: action.payload,
      };
    case SERVICE_ACTIONS.DELETE_SERVICE_SUCCESS:
      return {
        ...state,
        services: [...state.services.filter((service) => action.payload !== service.id)],
        deleteServiceError: false,
      };
    case SERVICE_ACTIONS.DELETE_SERVICE_FAILURE:
      return {
        ...state,
        deleteServiceError: action.error,
      };
    default:
      return state;
  }
};

export default serviceReducer;
