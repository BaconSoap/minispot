import { Action, ActionWithoutPayload, ReducerMap } from 'helpers';
import { DeviceIdPayload, PlayStatePayload } from './PlayerActions';
import { PLAYER_READY, SET_DEVICE_ID, SET_PLAY_STATE } from './PlayerConstants';
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
    currentTrackInfo: {
      trackName: payload.trackName
    },
    isPlaying: payload.isPlaying,
  })
};

const defaultState: PlayerState = {
  currentPlaybackDeviceId: null,
  currentTrackInfo: null,
  isPlaying: false,
  isReady: false,
  localDeviceId: null,
};

export function reducer(state: PlayerState = defaultState, action: Action<any>) {
  const handler = reducers[action.type];

  return handler ? handler(state, action) : state;
}
