import { AppState } from 'AppState';
import Axios from 'axios';
import { Action, ActionWithoutPayload, baseSpotifyUri, getAxiosConfig, rsaaHeaders } from 'helpers';
import { Dispatch } from 'react-redux';
import { RSAA, RSAAction } from 'redux-api-middleware';
import { PLAYER_READY, SET_DEVICE_ID, SET_IS_CONNECTED_TO_SPOTIFY, SET_PLAY_STATE, SET_TRACK_INFO } from './PlayerConstants';
import { PlayState, TrackInfo } from './PlayerState';

export const playerReady = (): ActionWithoutPayload => ({
  type: PLAYER_READY
});

export type PlayStatePayload = PlayState;
export const setPlayState = (state: PlayState): Action<PlayStatePayload> => ({
  payload: state,
  type: SET_PLAY_STATE
});

export const playUris = (deviceId: string, uris?: string[], contextUri?: string) => {
  return async (dispatch: Dispatch, getState: () => AppState) => {
    const accessToken = getState().authentication.accessToken;
    if (!accessToken) {
      return dispatch({
        type: 'NOT_AUTHENTICATED'
      });
    }

    let body: any = {};

    if (contextUri && uris && uris.length === 1) {
      body = {
        context_uri: contextUri,
        offset: {
          uri: uris[0]
        }
      };
    } else {
      body = {
        context_uri: contextUri,
        uris
      };
    }

    await Axios.put(`${baseSpotifyUri}/me/player/play`,
      body,
      {
        ...getAxiosConfig(accessToken),
        params: {
          device_id: deviceId
        }
      });

    return dispatch(setPlayState('playing'));
  };
};

export const pause = () => {
  return async (dispatch: Dispatch, getState: () => AppState) => {
    const accessToken = getState().authentication.accessToken;

    if (!accessToken) {
      return dispatch({
        type: 'NOT_AUTHENTICATED'
      });
    }

    await Axios.put(`${baseSpotifyUri}/me/player/pause`, undefined, getAxiosConfig(accessToken));

    dispatch(setPlayState('paused'));

    return;
  };
};

export const skip = (): RSAAction<'SKIP_REQUEST', 'SKIP_SUCCESS', 'SKIP_FAILURE'> => ({
  [RSAA]: {
    endpoint: `${baseSpotifyUri}/me/player/next`,
    headers: rsaaHeaders,
    method: 'POST',
    types: ['SKIP_REQUEST', 'SKIP_SUCCESS', 'SKIP_FAILURE']
  }
});

export const previous = (): RSAAction<'PREVIOUS_REQUEST', 'PREVIOUS_SUCCESS', 'PREVIOUS_FAILURE'> => ({
  [RSAA]: {
    endpoint: `${baseSpotifyUri}/me/player/previous`,
    headers: rsaaHeaders,
    method: 'POST',
    types: ['PREVIOUS_REQUEST', 'PREVIOUS_SUCCESS', 'PREVIOUS_FAILURE']
  }
});

export type TrackInfoPayload = TrackInfo;
export const setTrackInfo = (info: TrackInfo): Action<TrackInfoPayload> => ({
  payload: info,
  type: SET_TRACK_INFO,
});

export type DeviceIdPayload = string;
export const setDeviceId = (deviceId: string) => ({
  payload: deviceId,
  type: SET_DEVICE_ID,
});

export type IsConnectedToSpotifyPayload = boolean;
export const setIsConnectedToSpotify = (isConnectedToSpotify: boolean): Action<IsConnectedToSpotifyPayload> => ({
  payload: isConnectedToSpotify,
  type: SET_IS_CONNECTED_TO_SPOTIFY
});
