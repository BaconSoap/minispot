import { AppState } from 'AppState';
import { Icon } from 'components/Icon';
import * as React from 'react';
import { connect } from 'react-redux';
import { playUris } from './PlayerActions';

const actions = {
  playUris
};

export type ControlPanelProps = {
  deviceId: string | null;
  isReady: boolean;
};


export class ControlPanel extends React.PureComponent<ControlPanelProps & typeof actions> {
  public render() {
    return (
      <div className='minispot-controls'>
        <div className='minispot-control minispot-controls__previous'>
          <Icon type='step-backward' title='Step Backward' size='2x' />
        </div>
        <div className='minispot-control minispot-controls__pause-play'>
          <a href='javascript:void(0)' onClick={this.onPlay}><Icon type='play' title='Pause' size='2x' /></a>
        </div>
        <div className='minispot-control minispot-controls__next'>
          <Icon type='step-forward' title='Skip Song' size='2x' />
        </div>
      </div>
    );
  }

  private onPlay = () => {
    const { isReady, deviceId } = this.props;
    if (isReady && deviceId) {
      // Little Secrets (Passion Pit - Manners)
      this.props.playUris(deviceId, ['spotify:track:3kb38wezoUA8ki5jPYy3t5']);
    }
  }
}

const mapState = (state: AppState): ControlPanelProps => ({
  deviceId: state.player.localDeviceId,
  isReady: state.authentication.isAuthenticated && !!state.player.localDeviceId,
});

export const ControlPanelContainer = connect(mapState, actions)(ControlPanel);
