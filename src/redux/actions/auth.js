import axios from 'axios';
import { setAlert, removeAllAlerts } from './alert';
import {
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT
} from './types';

import setAuthToken from '../../utils/setAuthToken';
import { toast } from 'react-toastify';

// Load User
export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get('/api/auth');

    toast.info(`ברוך הבא, ${res.data.name}`);

    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

// Login User
export const login = (email, password) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post(
      'http://localhost:5000/api/auth',
      body,
      config
    );

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });

    console.log(res.data);

    dispatch(removeAllAlerts());
    dispatch(loadUser());
  } catch (err) {
    console.log(err.response);
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: LOGIN_FAIL
    });
  }
};

// Logout / Clear Profile
export const logout = () => dispatch => {
  dispatch({
    type: LOGOUT
  });
};
