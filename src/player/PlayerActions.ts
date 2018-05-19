import { AppState } from 'AppState';
import Axios from 'axios';
import { Action, ActionWithoutPayload, baseSpotifyUri, getAxiosConfig } from 'helpers';
import { Dispatch } from 'react-redux';
import { PLAYER_READY, SET_DEVICE_ID, SET_PLAY_STATE } from './PlayerConstants';

export const playerReady = (): ActionWithoutPayload => ({
  type: PLAYER_READY
});


export type PlayStatePayload = {
  isPlaying: boolean;
  trackName: string;
};

export const playUris = (deviceId: string, uris?: string[], contextUri?: string) => {
  return async (dispatch: Dispatch, getState: () => AppState) => {
    const accessToken = getState().authentication.accessToken;
    if (!accessToken) {
      return dispatch({
        type: 'NOT_AUTHENTICATED'
      });
    }

    await Axios.put(`${baseSpotifyUri}/me/player/play`, {
      context_udi: contextUri,
      uris
    }, {
        ...getAxiosConfig(accessToken),
        params: {
          device_id: deviceId
        }
      });


    const action: Action<PlayStatePayload> = {
      payload: {
        isPlaying: true,
        trackName: 'Little Secrets',
      },
      type: SET_PLAY_STATE,
    };
    return dispatch(action);
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

    dispatch({
      payload: {
        isPlaying: false,
        trackName: 'Little Secrets',
      },
      type: SET_PLAY_STATE
    });

    return;
  };
};


export type DeviceIdPayload = string;
export const setDeviceId = (deviceId: string) => ({
  payload: deviceId,
  type: SET_DEVICE_ID,
});
