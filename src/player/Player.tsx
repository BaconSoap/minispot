import { SongInfoContainer } from 'player/SongInfo';
import * as React from 'react';
import { ControlPanelContainer } from './ControlPanel';

export class Player extends React.PureComponent {
  public render() {
    return (
      <div className='minispot-player'>
        <SongInfoContainer />
        <ControlPanelContainer />
      </div>
    );
  }
}
