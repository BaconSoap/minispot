import { Icon } from 'components/Icon';
import * as React from 'react';

export class ControlPanel extends React.PureComponent {
  public render() {
    return (
      <div className='minispot-controls'>
        <div className='minispot-control minispot-controls__previous'>
          <Icon type='step-backward' title='Step Backward' size='2x' />
        </div>
        <div className='minispot-control minispot-controls__pause-play'>
          <Icon type='play' title='Pause' size='2x' />
        </div>
        <div className='minispot-control minispot-controls__next'>
          <Icon type='step-forward' title='Skip Song' size='2x' />
        </div>
      </div>
    );
  }
}
