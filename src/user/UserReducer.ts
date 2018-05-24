import { UserInfoDto } from 'authentication/types';
import { USER_INFO_LOADED } from 'user/UserConstants';
import { Action, ReducerMap } from '../helpers';
import { UserState } from './UserState';

const reducers: ReducerMap<UserState> = {
  [USER_INFO_LOADED]: (state: UserState, { payload }: Action<UserInfoDto>) => (
    {
      ...state,
      userInfo: payload
    }
  ),
};

export const defaultState: UserState = {
  userInfo: null,
};

export function reducer(state: UserState = defaultState, action: Action<any>) {
  const handler = reducers[action.type];

  return handler ? handler(state, action) : state;
}
