export type PlayerState = {
  isReady: boolean;
  localDeviceId: string | null;
  currentPlaybackDeviceId: string | null;
  playState: PlayState;
  currentTrackInfo: { trackName: string } | null;
};

export type PlayState = 'playing' | 'paused' | 'stopped';
