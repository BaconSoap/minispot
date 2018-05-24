import { combineReducers } from 'redux';
import { reducer as authentication } from '../authentication/AuthReducer';
import { reducer as player } from '../player/PlayerReducer';
import { reducer as user } from '../user/UserReducer';

export const createRootReducer = () => {
  return combineReducers({
    authentication,
    player,
    user,
  });
};
