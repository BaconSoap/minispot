import { Action, ActionWithoutPayload, ReducerMap } from 'helpers';
import { DeviceIdPayload, IsConnectedToSpotifyPayload, PlayStatePayload, TrackInfoPayload } from './PlayerActions';
import { PLAYER_READY, SET_DEVICE_ID, SET_IS_CONNECTED_TO_SPOTIFY, SET_PLAY_STATE, SET_TRACK_INFO } from './PlayerConstants';
import { PlayerState } from './PlayerState';

const reducers: ReducerMap<PlayerState> = {
  [PLAYER_READY]: (state: PlayerState, action: ActionWithoutPayload): PlayerState => ({
    ...state,
    isReady: true
  }),
  [SET_DEVICE_ID]: (state: PlayerState, action: Action<DeviceIdPayload>): PlayerState => ({
    ...state,
    currentPlaybackDeviceId: action.payload,
    localDeviceId: action.payload,
  }),
  [SET_PLAY_STATE]: (state: PlayerState, { payload }: Action<PlayStatePayload>): PlayerState => ({
    ...state,
    playState: payload,
  }),
  [SET_TRACK_INFO]: (state: PlayerState, { payload }: Action<TrackInfoPayload>): PlayerState => ({
    ...state,
    currentTrackInfo: payload
  }),
  [SET_IS_CONNECTED_TO_SPOTIFY]: (state: PlayerState, { payload }: Action<IsConnectedToSpotifyPayload>): PlayerState => ({
    ...state,
    isConnectedToSpotify: payload
  }),
};

const defaultState: PlayerState = {
  currentPlaybackDeviceId: null,
  currentTrackInfo: null,
  isConnectedToSpotify: false,
  isReady: false,
  localDeviceId: null,
  playState: 'stopped',
};

export function reducer(state: PlayerState = defaultState, action: Action<any>) {
  const handler = reducers[action.type];

  return handler ? handler(state, action) : state;
}
