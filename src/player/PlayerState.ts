export type PlayerState = {
  isReady: boolean;
  localDeviceId: string | null;
  currentPlaybackDeviceId: string | null;
  isPlaying: boolean;
  currentTrackInfo: { trackName: string } | null;
};
