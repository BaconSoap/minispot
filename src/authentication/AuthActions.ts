import Axios from 'axios';
import { Dispatch } from 'redux';
import { Action } from '../helpers';
import { AUTHENTICATION_SUCCEEDED, USER_INFO_LOADED } from './AuthConstants';
import { AccessToken, UserInfoDto } from './types';

export const authenticationSucceeded = (token: AccessToken): Action<AccessToken> => ({
  payload: token,
  type: AUTHENTICATION_SUCCEEDED,
});

export const loadUserInfo = (token: AccessToken) => (
  async (dispatch: Dispatch<Action<UserInfoDto>>) => {
    const res = await Axios.get('https://api.spotify.com/v1/me', {
      headers: {
        'Authorization': `${token.tokenType} ${token.token}`
      }
    });

    const userInfo = res.data as UserInfoDto;

    dispatch({
      payload: userInfo,
      type: USER_INFO_LOADED,
    })
  }
)
