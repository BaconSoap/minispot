import { AccessToken } from './types';

export type AuthState = {
  isAuthenticated: boolean;
  accessToken: AccessToken | null;
};
