import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import image from './image';

export default combineReducers({
  alert,
  auth,
  image
});
