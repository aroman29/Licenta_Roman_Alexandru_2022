import {
  API_URLS, API_REQUEST_METHODS, SERVER_RESPONSE, APP_PAGE_URLS, COMBUSTIBLE, STATUSSES
} from '../../utils/constants';
import { MESSAGE_ACTIONS  } from './ActionTypes';
import { compareExactDates } from '../../utils/utils';
import { apiRequest, getUrl, authenticationApiRequest } from './apiActions';

const getMessages = () => {
  const getMessagesSuccess = (message) => ({
    type: MESSAGE_ACTIONS.GET_MESSAGES_SUCCESS,
    payload: message,
  });
  const getMessagesError = (error) => ({
    type: MESSAGE_ACTIONS.GET_MESSAGES_FAILURE,
    error
  });

  return (dispatch, getState) => dispatch(apiRequest(API_REQUEST_METHODS.GET,
    API_URLS.getMessages))
    .then((response) => {
      if (response) {
        const sortedMessages = response.data.sort(compareExactDates);

        dispatch(getMessagesSuccess(sortedMessages));
        // return sortedMessages;
      }
    })
    .catch((error) => {
      dispatch(getMessagesError(error));
      return Promise.reject(error);
    });
};

const addMessage = (senderId, receiverId, message, time) => {
  const addMessageSuccess = (message) => ({
    type: MESSAGE_ACTIONS.ADD_MESSAGE_SUCCESS,
    payload: message,
  });
  const addMessageFailure = (error) => ({
    type: MESSAGE_ACTIONS.ADD_MESSAGE_FAILURE,
    error,
  });

  // eslint-disable-next-line max-len
  return (dispatch, getState) => dispatch(apiRequest(API_REQUEST_METHODS.POST, API_URLS.insertMessage, {
    message: message.toString(),
    seen: false,
    datetime: time,
    senderId: senderId.toString(),
    receiverId: receiverId.toString(),
    active: true

  }))
    .then((response) => {
      if (response) {
        
        dispatch(addMessageSuccess(response.data));

      }
      return response;
    })
    .catch((error) => {
      dispatch(addMessageFailure(error));
      return Promise.reject(error);
    });
};

const addChatPartnerSuccess = (userId) => ({
  type: MESSAGE_ACTIONS.ADD_CHAT_PARTNER_SUCCESS,
  payload: userId,
});

export const seenMessage = (id) => {
  const seenMessageSuccess = (user) => ({
    type: MESSAGE_ACTIONS.SEEN_MESSAGE_SUCCESS,
    payload: user,
  });
  const seenMessageFailure = (error) => ({
    type: MESSAGE_ACTIONS.SEEN_MESSAGE_FAILURE,
    error,
  });
  return (dispatch, getState) => dispatch(apiRequest(API_REQUEST_METHODS.PUT,
    getUrl(API_URLS.seenMessageById, {id: id})))
    .then( async(response) => {
      if (response) {
        dispatch(seenMessageSuccess(response.data));
        // await dispatch(getMessages());
      }
      return response;
    })
    .catch((error) => {
      dispatch(seenMessageFailure(error));
      return Promise.reject(error);
    });
};

export default { getMessages, addMessage, addChatPartnerSuccess, seenMessage };