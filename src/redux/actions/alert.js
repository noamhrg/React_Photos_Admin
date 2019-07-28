import { SET_ALERT, REMOVE_ALERT, REMOVE_ALL_ALERTS } from './types';
import uuid from 'uuid';

const alertTranslation = {
  'Invalid credentials': 'שם משתמש או סיסמה שגויים'
};

export const setAlert = (msg, alertType, timeout = 5000) => dispatch => {
  msg = alertTranslation.hasOwnProperty(msg) ? alertTranslation[msg] : msg;
  // Crate an alert id
  const id = uuid.v4();
  // Dispatch an action
  dispatch({
    type: SET_ALERT,
    payload: {
      msg,
      alertType,
      id
    }
  });
  // Dispatch remove alert action
  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
};

export const removeAllAlerts = () => dispatch => {
  dispatch({
    type: REMOVE_ALL_ALERTS
  });
};
