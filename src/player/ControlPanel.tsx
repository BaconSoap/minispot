import { AppState } from 'AppState';
import { Icon } from 'components/Icon';
import * as React from 'react';
import { connect } from 'react-redux';
import { pause, playUris } from './PlayerActions';

const actions = {
  pause,
  playUris,
};

export type ControlPanelProps = {
  deviceId: string | null;
  isReady: boolean;
  trackInfo: { trackName: string } | null;
  isPaused: boolean;
};


export class ControlPanel extends React.PureComponent<ControlPanelProps & typeof actions> {
  public render() {

    const pausePlayIcon = this.props.isPaused ? 'play' : 'pause';
    return (
      <div className='minispot-controls'>
        <div className='minispot-control minispot-controls__previous'>
          <Icon type='step-backward' title='Step Backward' size='2x' />
        </div>
        <div className='minispot-control minispot-controls__pause-play'>
          <a href='javascript:void(0)' onClick={this.onPlay}><Icon type={pausePlayIcon} title='Pause' size='2x' /></a>
        </div>
        <div className='minispot-control minispot-controls__next'>
          <Icon type='step-forward' title='Skip Song' size='2x' />
        </div>
      </div>
    );
  }

  private onPlay = () => {
    const { isReady, deviceId, trackInfo, isPaused } = this.props;
    if (!(isReady && deviceId)) {
      return;
    }

    if (!trackInfo) {
      // Little Secrets (Passion Pit - Manners)
      this.props.playUris(deviceId, ['spotify:track:3kb38wezoUA8ki5jPYy3t5']);
      return;
    }

    if (!isPaused) {
      this.props.pause();
      return;
    }

    this.props.playUris(deviceId);
  }
}

const mapState = ({ player, authentication }: AppState): ControlPanelProps => ({
  deviceId: player.localDeviceId,
  isPaused: player.isReady && !player.isPlaying,
  isReady: authentication.isAuthenticated && !!player.localDeviceId,
  trackInfo: player.currentTrackInfo,
});

export const ControlPanelContainer = connect(mapState, actions)(ControlPanel);
