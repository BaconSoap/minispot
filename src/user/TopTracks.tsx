import { AppState } from 'AppState';
import { AccessToken } from 'authentication/types';
import { playUris } from 'player/PlayerActions';
import * as React from 'react';
import { connect } from 'react-redux';
import { TrackDto } from 'spotifyTypes';
import { loadTopTracks } from './UserActions';

const actions = {
  loadTopTracks,
  playUris,
};

type TopTracksProps = {
  accessToken: AccessToken | null;
  deviceId: string | null;
  isLoaded: boolean;
  tracks: TrackDto[];
};

export class TopTracks extends React.PureComponent<TopTracksProps & typeof actions> {
  public componentDidMount() {
    if (!this.props.isLoaded && this.props.accessToken) {
      this.props.loadTopTracks(this.props.accessToken);
    }
  }

  public componentDidUpdate(prevProps: TopTracksProps) {
    if (!prevProps.accessToken && this.props.accessToken && !this.props.isLoaded) {
      this.props.loadTopTracks(this.props.accessToken);
    }
  }

  public playTrack = (trackUri: string) => {
    this.props.playUris(this.props.deviceId as string, [trackUri]);
  }

  public render() {
    return (
      <ul>
        {this.props.tracks.map(t => (
          <li key={t.uri}>
            {/* tslint:disable-next-line:jsx-no-lambda */}
            <a href='javascript:void(0)' onClick={() => this.playTrack(t.uri)}>
              {t.name} - {t.artists[0].name} - {t.album.name}
            </a>
          </li>
        ))}
      </ul>
    );
  }
}

const mapState = ({ authentication, player, user }: AppState): TopTracksProps => ({
  accessToken: authentication.accessToken,
  deviceId: player.localDeviceId,
  isLoaded: false,
  tracks: user.topTracks,
});

export const TopTracksContainer = connect(mapState, actions)(TopTracks);
