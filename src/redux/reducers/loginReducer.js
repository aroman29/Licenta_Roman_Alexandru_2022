import { LOGIN_ACTIONS, REGISTER_ACTIONS } from '../../redux/actions/ActionTypes';

const initialState = {
  loggedIn: false,
  loginError: '',
  accessToken: null,
  logoutRequest: false,
};

export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    
    case LOGIN_ACTIONS.LOGIN_REQUEST:
      return {
        ...initialState,
      };
    case LOGIN_ACTIONS.LOGIN_SUCCESS:
      return {
        ...state,
        loggedIn: true,
        loginError: '',
      };
    case LOGIN_ACTIONS.LOGIN_FAILURE:
      return {
        ...state,
        loginError: action.error,
      };

    case LOGIN_ACTIONS.DELETE_ERROR:
      return {
        ...state,
        loginError: '',
      };

    // case REGISTER_ACTIONS.REGISTER_REQUEST:
    //   return {
    //     ...initialState,
    //   };
    case LOGIN_ACTIONS.SET_TOKEN:
      return {
        ...state,
        accessToken: action.accessToken,
      };
    case REGISTER_ACTIONS.REGISTER_SUCCESS:
      return {
        ...state,
      };
    // case UPDATE_USER_ACTIONS.UPDATE_USER_SUCCESS:
    //   return {
    //     ...state,
    //     loggedIn: true,
    //   };
    case LOGIN_ACTIONS.INVALID_TOKEN:
      return {
        ...state,
        loggedIn: false,
        accessToken: null,
      };
    case LOGIN_ACTIONS.REQUEST_LOGOUT:
      return {
        ...state,
        logoutRequest: true,
      };
    default:
      return state;
  }
};

export default loginReducer;
