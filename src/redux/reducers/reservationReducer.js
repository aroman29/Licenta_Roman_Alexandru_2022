import { RESERVATION_ACTIONS } from '../actions/ActionTypes';

const initialState = {
  reservations: [],
  reservationApiError: '',
};

export const reservationReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESERVATION_ACTIONS.GET_RESERVATION_SUCCESS:
      return {
        ...state,
        cars: action.payload,
      };
      case RESERVATION_ACTIONS.GET_RESERVATION_FAILURE:
        return {
          ...state,
          carApiError: action.payload
        };
    case RESERVATION_ACTIONS.ADD_RESERVATION_SUCCESS:
      return {
        ...state,
        // services: [...state.services, action.payload],
        reservationApiError: false,
      };
    case RESERVATION_ACTIONS.ADD_RESERVATION_FAILURE:
      return {
        ...state,
        reservationApiError: action.error,
      };

    default:
      return state;
  }
};

export default reservationReducer;
