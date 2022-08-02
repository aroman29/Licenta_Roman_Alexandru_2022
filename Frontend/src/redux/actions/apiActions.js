import axios from 'axios';
import { HTTP_STATUS_CODES } from '../../utils/constants';

export const getUrl = (apiUrl, identifier) => {
  let newUrl = apiUrl;
  const keyName = Object.keys(identifier);
  keyName.forEach((key) => { newUrl = newUrl.replace(`:${key}`, identifier[key]); });
  return newUrl;
};

export const apiRequest = (method, url, data = {}, silent = false) => (dispatch, getState) => {
  const axiosCall = axios({
    method,
    url: `${process.env.REACT_APP_API_URL}${url}`,
    // url: 'http://localhost:8081',
    headers: {
      Authorization: `Bearer ${getState().login.accessToken}`,
    },
    data,
  });


  return axiosCall.then(() => axiosCall)
    .catch((err) => {
      if (err.response.status === HTTP_STATUS_CODES.unauthorized) {
      }

      return Promise.reject(err);
    })

};

export const authenticationApiRequest = (method, url, data = {}, silent = false) => (dispatch, getState) => {
  const axiosCall = axios({
    method,
    url: `${process.env.REACT_APP_API_URL}${url}`,
    data,
  });

  return axiosCall.then(() => axiosCall)
    .catch((err) => {
      if (err.response.status === HTTP_STATUS_CODES.unauthorized) {
        // dispatch(logoutAction.invalidTokenLogout());
      }

      return Promise.reject(err);
    })

};

export default { apiRequest, authenticationApiRequest };
