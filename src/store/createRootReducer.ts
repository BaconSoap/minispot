import { combineReducers } from 'redux';
import { reducer as authentication } from '../authentication/AuthReducer';

export const createRootReducer = () => {
  return combineReducers({
    authentication
  });
}
