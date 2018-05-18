import * as React from 'react';
import { connect } from 'react-redux';
import { ControlPanel } from './ControlPanel';

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
        <ControlPanel />
      </div>
    );
  }
}

export const PlayerContainer = connect()(Player);
