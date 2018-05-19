import { Action, ActionWithoutPayload, ReducerMap } from 'helpers';
import { PLAYER_READY } from './PlayerConstants';
import { PlayerState } from './PlayerState';

const reducers: ReducerMap<PlayerState> = {
  [PLAYER_READY]: (state: PlayerState, action: ActionWithoutPayload): PlayerState => ({
    ...state,
    isReady: true
  })
};

const defaultState: PlayerState = {
  currentPlaybackDeviceId: null,
  isReady: false,
  localDeviceId: null,
};

export function reducer(state: PlayerState = defaultState, action: Action<any>) {
  const handler = reducers[action.type];

  return handler ? handler(state, action) : state;
}
