import { AccessToken, UserInfoDto } from './types';

export type AuthState = {
  isAuthenticated: boolean;
  accessToken: AccessToken | null;
  userInfo: UserInfoDto | null;
};
