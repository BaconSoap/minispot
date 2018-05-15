import { Action, ReducerMap } from '../helpers';
import { AUTHENTICATION_SUCCEEDED, USER_INFO_LOADED } from './AuthConstants';
import { AuthState } from './AuthState';
import { AccessToken, UserInfoDto } from './types';

const reducers: ReducerMap<AuthState> = {
  [AUTHENTICATION_SUCCEEDED]: (state: AuthState, action: Action<AccessToken>) => (
    {
      ...state,
      accessToken: action.payload,
      isAuthenticated: true
    }
  ),
  [USER_INFO_LOADED]: (state: AuthState, { payload }: Action<UserInfoDto>) => (
    {
      ...state,
      userInfo: payload
    }
  ),
};

const defaultState: AuthState = {
  accessToken: null,
  isAuthenticated: false,
  userInfo: null,
};

export function reducer(state: AuthState = defaultState, action: Action<any>) {
  const handler = reducers[action.type];

  return handler ? handler(state, action) : state;
}
