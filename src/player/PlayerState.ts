export type PlayerState = {
  isReady: boolean;
  localDeviceId: string | null;
  currentPlaybackDeviceId: string | null;
  playState: PlayState;
  currentTrackInfo: TrackInfo | null;
  isConnectedToSpotify: boolean;
};

export type PlayState = 'playing' | 'paused' | 'stopped';

export type TrackInfo = {
  name: string;
  artist: string;
  album: string;
  imageUri: string;
};
