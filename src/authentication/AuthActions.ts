import { Action } from '../helpers';
import { AUTHENTICATION_SUCCEEDED } from './AuthConstants';
import { AccessToken } from './types';

export const authenticationSucceeded = (token: AccessToken): Action<AccessToken> => ({
  payload: token,
  type: AUTHENTICATION_SUCCEEDED,
});
