import {
  AUTH_ERROR,
  USER_LOADED,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT
} from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuth: null,
  loading: true
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuth: true,
        loading: false,
        user: payload
      };

    case LOGIN_SUCCESS:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        ...payload,
        isAuth: true,
        loading: false
      };

    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuth: false,
        loading: false
      };

    default:
      return state;
  }
}
