import { AppState } from 'AppState';
import { AccessToken, UserInfoDto } from 'authentication/types';
import * as React from 'react';
import { connect } from 'react-redux';

type DebugInfoProps = {
  accessToken: AccessToken | null;
  isPremium: boolean;
  isReady: boolean;
  isConnectedToSpotify: boolean;
  userInfo: UserInfoDto | null;
};

export class DebugInfo extends React.PureComponent<DebugInfoProps> {
  public render() {
    const { isReady, accessToken, isPremium, isConnectedToSpotify } = this.props;

    return (
      <>
        <hr className='debug-divider' />
        <h3>Debug Info</h3>
        {isReady && <div>Player is ready</div>}
        {accessToken && <div>User is authenticated</div>}
        {isPremium && <div>User is a premium member</div>}
        {isConnectedToSpotify && <div>Player connected</div>}
        {this.props.userInfo ? <pre>{JSON.stringify(this.props.userInfo, undefined, 2)}</pre> : null}
      </>
    );
  }
}

const mapState = ({ player, authentication }: AppState): DebugInfoProps => ({
  accessToken: authentication.accessToken,
  isConnectedToSpotify: player.isConnectedToSpotify,
  isPremium: authentication.userInfo ? authentication.userInfo.product === 'premium' : false,
  isReady: player.isReady,
  userInfo: authentication.userInfo
});

export const DebugInfoContainer = connect(mapState)(DebugInfo);
