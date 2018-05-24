import { Action, ReducerMap } from '../helpers';
import { AUTHENTICATION_SUCCEEDED } from './AuthConstants';
import { AuthState } from './AuthState';
import { AccessToken } from './types';

const reducers: ReducerMap<AuthState> = {
  [AUTHENTICATION_SUCCEEDED]: (state: AuthState, action: Action<AccessToken>) => (
    {
      ...state,
      accessToken: action.payload,
      isAuthenticated: true
    }
  )
};

export const defaultState: AuthState = {
  accessToken: null,
  isAuthenticated: false,
};

export function reducer(state: AuthState = defaultState, action: Action<any>) {
  const handler = reducers[action.type];

  return handler ? handler(state, action) : state;
}
