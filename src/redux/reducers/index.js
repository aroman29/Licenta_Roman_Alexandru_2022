import { LOGIN_ACTIONS } from '../actions/ActionTypes';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { currentUserReducer } from './userReducer';
import { loginReducer } from './loginReducer';
import { registerReducer } from './registerReducer';
import { serviceReducer } from './ServiceReducer';
import { carReducer } from './carReducer';
import { reservationReducer } from './reservationReducer'
import { messageReducer } from './MessageReducer'

const combinedReducer = combineReducers({
  login: loginReducer,
  user: currentUserReducer,
  service: serviceReducer,
  car: carReducer,
  reservation: reservationReducer,
  register: registerReducer,
  message: messageReducer,

});

const rootReducer = (state, action) => {
  if (action.type === LOGIN_ACTIONS.LOGOUT) {
    storage.removeItem('persist:root');
    return combinedReducer(undefined, action);
  }

  return combinedReducer(state, action);
};

export default rootReducer;
