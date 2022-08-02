import { REGISTER_ACTIONS } from '../../redux/actions/ActionTypes';

const initialState = {
  registerError: '',
};

export const registerReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_ACTIONS.REGISTER_REQUEST:
      return {
        ...initialState,
      };

    case REGISTER_ACTIONS.REGISTER_FAILURE:
      return {
        ...state,
        registerError: action.error,
      };

      case REGISTER_ACTIONS.REGUSTER_DELETE_ERROR:
        return {
          ...state,
          registerError: '',
        };
      
    case REGISTER_ACTIONS.REGISTER_SUCCESS:
      return {
        ...state,
        registerError: '',
      };
  

    default:
      return state;
  }
};

export default registerReducer;
