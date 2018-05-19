import Axios from 'axios';
import { Dispatch } from 'redux';
import { Action, baseSpotifyUri, getAxiosConfig } from '../helpers';
import { AUTHENTICATION_SUCCEEDED, USER_INFO_LOADED } from './AuthConstants';
import { AccessToken, UserInfoDto } from './types';

export const authenticationSucceeded = (token: AccessToken): Action<AccessToken> => ({
  payload: token,
  type: AUTHENTICATION_SUCCEEDED,
});

export const loadUserInfo = (token: AccessToken) => (
  async (dispatch: Dispatch<Action<UserInfoDto>>) => {
    const res = await Axios.get(`${baseSpotifyUri}/me`, getAxiosConfig(token));

    const res2 = await Axios.get(`${baseSpotifyUri}/me/player`, getAxiosConfig(token));

    // tslint:disable-next-line:no-console
    console.log(res2.data);

    const userInfo = res.data as UserInfoDto;

    dispatch({
      payload: userInfo,
      type: USER_INFO_LOADED,
    });
  }
);
