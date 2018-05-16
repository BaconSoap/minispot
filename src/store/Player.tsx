import { Icon } from 'components/Icon';
import * as React from 'react';
import { connect } from 'react-redux';

export class Player extends React.PureComponent {
  public render() {
    return (
      <div className='minispot-player'>
        <div className='song-info'>
          <div className='song-info__album-art'
            style={{ backgroundImage: 'url(https://i.scdn.co/image/de1c3166528adc912b746cac1f28ccd501801218)' }}
          />
          <div className='song-info__song'>
            Blackstar
          </div>
          <div className='song-info__album'>Blackstar</div>
          <div className='song-info__artist'>David Bowie</div>
        </div>
        <div className='minispot-controls'>
          <div className='minispot-control minispot-controls__previous'>
            <Icon type='step-backward' title='Step Backward' size='2x' />
          </div>
          <div className='minispot-control minispot-controls__pause-play'>
            <Icon type='pause' title='Pause' size='2x' />
          </div>
          <div className='minispot-control minispot-controls__next'>
            <Icon type='step-forward' title='Skip Song' size='2x' />
          </div>
        </div>
      </div>
    );
  }
}

export const PlayerContainer = connect()(Player);
