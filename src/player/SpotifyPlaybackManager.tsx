import { AppState } from 'AppState';
import { AccessToken } from 'authentication/types';
import { setDeviceId } from 'player/PlayerActions';
import * as React from 'react';
import { connect } from 'react-redux';

const actions = {
  setDeviceId
};

export type SpotifyPlaybackManagerProps = {
  isReady: boolean;
  accessToken: AccessToken | null;
  isPremium: boolean;
};

export class SpotifyPlaybackManager extends React.Component<SpotifyPlaybackManagerProps & typeof actions, { isConnected: boolean }> {

  public constructor(p: SpotifyPlaybackManagerProps & typeof actions) {
    super(p);

    this.state = {
      isConnected: false
    };
  }

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
    player.addListener('player_state_changed', state => { console.log(state); });
    player.addListener('ready', ({ device_id }) => {
      // tslint:disable-next-line:no-console
      console.log('Ready with Device ID', device_id);
      this.props.setDeviceId(device_id);
    });
    player.connect();

    this.setState({ isConnected: true });
  }

  public render() {
    const { isReady, accessToken, isPremium } = this.props;
    const { isConnected } = this.state;
    return (
      <>
        {isReady && <div>Player is ready</div>}
        {accessToken && <div>User is authenticated</div>}
        {isPremium && <div>User is a premium member</div>}
        {isConnected && <div>Player connected</div>}
      </>
    );
  }
}

const mapState = (state: AppState): SpotifyPlaybackManagerProps => ({
  accessToken: state.authentication.accessToken,
  isPremium: state.authentication.userInfo ? state.authentication.userInfo.product === 'premium' : false,
  isReady: state.player.isReady,
});

export const SpotifyPlaybackManagerContainer = connect(mapState, actions)(SpotifyPlaybackManager);
