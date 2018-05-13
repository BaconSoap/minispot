import { Action, ReducerMap } from '../helpers';
import { AuthState } from './AuthState';

const reducers: ReducerMap<AuthState> = {
};

const defaultState: AuthState = {
  isAuthenticated: false
};

export function reducer(state: AuthState = defaultState, action: Action<any>) {
  const handler = reducers[action.type];

  return handler ? handler(state, action) : state;
}
