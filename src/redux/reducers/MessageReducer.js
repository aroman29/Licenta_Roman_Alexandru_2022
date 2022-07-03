import { MESSAGE_ACTIONS } from '../actions/ActionTypes';

const initialState = {
  messages: [],
  partnerId: null,
  messagesApiError: null
};

export const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case MESSAGE_ACTIONS.GET_MESSAGES_SUCCESS:
      return {
        ...state,
        messages: action.payload,
        messagesApiError: null
      };
    case MESSAGE_ACTIONS.GET_MESSAGES_FAILURE:
      return {
        ...state,
        messages: action.payload
      };

    case MESSAGE_ACTIONS.ADD_MESSAGE_SUCCESS:
      return {
        ...state,
        messages: [...state.messages, action.payload],
        carApiError: null
      };
    case MESSAGE_ACTIONS.ADD_MESSAGE_FAILURE:
      return {
        ...state,
        carApiError: action.payload
      };

    case MESSAGE_ACTIONS.ADD_CHAT_PARTNER_SUCCESS:
      return {
        ...state,
        partnerId: action.payload,
      };

    case MESSAGE_ACTIONS.SEEN_MESSAGE_SUCCESS:
      return {
        ...state,
        mesasges: [...state.messages.map((message) => {
          if (message.id === action.payload.id) {
            return action.payload;
          }
          return message;
        })],
      };

    default:
      return state;
  }
};

export default messageReducer;
