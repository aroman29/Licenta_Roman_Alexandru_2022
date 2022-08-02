import { USER_ACTIONS } from '../actions/ActionTypes';

const initialState = {
  currentUser: null,
  users: null,
  getUserError: false,
};

export const currentUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_ACTIONS.GET_USER_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
      };
    case USER_ACTIONS.GET_USER_FAILURE:
      return {
        ...state,
        getUserError: action.payload,
      };
    case USER_ACTIONS.GET_ALL_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload,
      };
    case USER_ACTIONS.GET_ALL_USERS_FAILURE:
      return {
        ...state,
        getUserError: action.payload,
      };
    default:
      return state;
  }
};

export default currentUserReducer;
