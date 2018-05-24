import { TrackDto, UserInfoDto } from 'spotifyTypes';

export type UserState = {
  topTracks: TrackDto[];
  userInfo: UserInfoDto | null;
};
