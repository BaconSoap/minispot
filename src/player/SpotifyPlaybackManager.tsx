import { AppState } from 'AppState';
import { AccessToken } from 'authentication/types';
import { shallowEquals, spotifyTrackToTrackInfo } from 'helpers';
import { setDeviceId, setIsConnectedToSpotify, setPlayState, setTrackInfo } from 'player/PlayerActions';
import * as React from 'react';
import { connect } from 'react-redux';
import { PlayState, TrackInfo } from './PlayerState';

const actions = {
  setDeviceId,
  setIsConnectedToSpotify,
  setPlayState,
  setTrackInfo,
};

export type SpotifyPlaybackManagerProps = {
  accessToken: AccessToken | null;
  currentTrackInfo: TrackInfo | null;
  isReady: boolean;
  playState: PlayState;
};

export class SpotifyPlaybackManager extends React.Component<SpotifyPlaybackManagerProps & typeof actions> {
  public componentDidUpdate(prevProps: SpotifyPlaybackManagerProps) {
    if (this.props.isReady && this.props.accessToken) {
      if (!(prevProps.accessToken && prevProps.isReady)) {
        return this.onPlayerReady();
      }
    }
  }

  public onPlayerReady() {
    if (!this.props.accessToken) { return; }
    const token = this.props.accessToken.token;

    const player = new Spotify.Player({
      getOAuthToken: cb => { cb(token); },
      name: 'MiniSpot player',
    });

    // tslint:disable-next-line:no-console
    player.addListener('player_state_changed', this.handleStateChange);
    player.addListener('ready', ({ device_id }) => {
      // tslint:disable-next-line:no-console
      console.log('Ready with Device ID', device_id);
      this.props.setDeviceId(device_id);
    });
    player.connect();

    this.props.setIsConnectedToSpotify(true);
  }

  public render() {
    return null;
  }

  private handleStateChange = (state: Spotify.PlaybackState) => {
    const newInfo = spotifyTrackToTrackInfo(state.track_window.current_track);

    if (!shallowEquals(this.props.currentTrackInfo, newInfo)) {
      this.props.setTrackInfo(newInfo);
    }

    if (state.paused && this.props.playState === 'playing') {
      this.props.setPlayState('paused');
    }

    if (!state.paused && this.props.playState !== 'playing') {
      this.props.setPlayState('playing');
    }
  }
}

const mapState = ({ player, authentication }: AppState): SpotifyPlaybackManagerProps => ({
  accessToken: authentication.accessToken,
  currentTrackInfo: player.currentTrackInfo,
  isReady: player.isReady,
  playState: player.playState,
});

export const SpotifyPlaybackManagerContainer = connect(mapState, actions)(SpotifyPlaybackManager);
