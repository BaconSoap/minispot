import { AppState } from 'AppState';
import Axios from 'axios';
import { ActionWithoutPayload, baseSpotifyUri, getAxiosConfig } from 'helpers';
import { Dispatch } from 'react-redux';
import { PLAYER_READY, SET_DEVICE_ID } from './PlayerConstants';

export const playerReady = (): ActionWithoutPayload => ({
  type: PLAYER_READY
});

export const playUris = (deviceId: string, uris?: string[], contextUri?: string) => {
  return async (dispatch: Dispatch, getState: () => AppState) => {
    const accessToken = getState().authentication.accessToken;
    if (!accessToken) {
      return dispatch({
        type: 'NOT_AUTHENTICATED'
      });
    }

    if ((!uris || uris.length === 0) && !contextUri) {
      return;
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

    return;
  };
};


export type DeviceIdPayload = string;
export const setDeviceId = (deviceId: string) => ({
  payload: deviceId,
  type: SET_DEVICE_ID,
});
