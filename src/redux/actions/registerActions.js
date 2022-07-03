import { REGISTER_ACTIONS } from '../../redux/actions/ActionTypes';
import {
  API_URLS, API_REQUEST_METHODS, NEW_TENANT_PASSWORD, USER_TYPE, GMAIL_SERVICE_ID,
  USER_ID, EMAIL_TEMPLATE_ID, SERVER_RESPONSE,
} from '../../utils/constants';
import { apiRequest, getUrl, authenticationApiRequest } from './apiActions';

const register = (payload) => {
  const registerSuccess = (accessToken) => ({
    type: REGISTER_ACTIONS.REGISTER_SUCCESS,
    accessToken,
  });

  const registerRequest = () => ({
    type: REGISTER_ACTIONS.REGISTER_REQUEST,
  });

  const registerFailure = (error) => ({
    type: REGISTER_ACTIONS.REGISTER_FAILURE,
    error,
  });
  
  return (dispatch) => {
  
    // dispatch(registerRequest());
    const data = {
      email: payload.username,
      password: payload.password,
      firstName: payload.firstName,
      lastName: payload.lastName,
      role: payload.userRole,
      phoneNumber: payload.phone,
      idCard: payload.idCard,
      active: true,
      serviceId: payload.serviceId
    };

    console.log(data);

    
    return dispatch(authenticationApiRequest(API_REQUEST_METHODS.POST, API_URLS.register, data))
      .then(async (response) => {
        dispatch(registerSuccess(response.data.accessToken));
        // await dispatch(getUser());
        // dispatch(loginActions.loginSuccess());

        return Promise.resolve(response);
      })
      .catch((error) => {
        dispatch(registerFailure(error));

        return Promise.reject(error);
      });
  };
};


const deleteError = () => ({
  type: REGISTER_ACTIONS.DELETE_ERROR,
});

export default { register, deleteError };
