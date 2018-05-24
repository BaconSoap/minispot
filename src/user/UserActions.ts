import { AccessToken, UserInfoDto } from 'authentication/types';
import Axios from 'axios';
import { Action, baseSpotifyUri, getAxiosConfig } from 'helpers';
import { Dispatch } from 'redux';
import { USER_INFO_LOADED } from './UserConstants';

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
