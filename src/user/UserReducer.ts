import { UserInfoDto } from 'spotifyTypes';
import { TOP_TRACKS_LOADED, USER_INFO_LOADED } from 'user/UserConstants';
import { Action, ReducerMap } from '../helpers';
import { TopTracksPayload } from './UserActions';
import { UserState } from './UserState';

const reducers: ReducerMap<UserState> = {
  [USER_INFO_LOADED]: (state: UserState, { payload }: Action<UserInfoDto>) => (
    {
      ...state,
      userInfo: payload
    }
  ),
  [TOP_TRACKS_LOADED]: (state: UserState, { payload }: Action<TopTracksPayload>): UserState => ({
    ...state,
    topTracks: payload.tracks,
  })
};

export const defaultState: UserState = {
  topTracks: [],
  userInfo: null,
};

export function reducer(state: UserState = defaultState, action: Action<any>) {
  const handler = reducers[action.type];

  return handler ? handler(state, action) : state;
}
