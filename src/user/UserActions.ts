import { AccessToken } from 'authentication/types';
import Axios from 'axios';
import { Action, baseSpotifyUri, getAxiosConfig } from 'helpers';
import { Dispatch } from 'redux';
import { SpotifyPaged, TrackDto, UserInfoDto } from 'spotifyTypes';
import { TOP_TRACKS_LOADED, USER_INFO_LOADED } from './UserConstants';

export const loadUserInfo = (token: AccessToken) => (
  async (dispatch: Dispatch<Action<UserInfoDto>>) => {
    const res = await Axios.get(`${baseSpotifyUri}/me`, getAxiosConfig(token));

    const userInfo = res.data as UserInfoDto;

    dispatch({
      payload: userInfo,
      type: USER_INFO_LOADED,
    });
  }
);

export type TopTracksPayload = {
  tracks: TrackDto[]
};

export const loadTopTracks = (token: AccessToken) => (
  async (dispatch: Dispatch<Action<TopTracksPayload>>) => {
    const res = await Axios.get(`${baseSpotifyUri}/me/top/tracks`, {
      ...getAxiosConfig(token),
      params: {
        'time_range': 'short_term'
      }
    });

    const data = res.data as SpotifyPaged<TrackDto>;

    // tslint:disable-next-line:no-console
    console.log(data);

    dispatch({
      payload: {
        tracks: data.items,
      },
      type: TOP_TRACKS_LOADED,
    });
  }
);
