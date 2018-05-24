import * as React from 'react';
import { connect } from 'react-redux';
import { loadUserInfo } from 'user/UserActions';
import { AppState } from '../AppState';
import { clientId as secretClientId, redirectUrl } from '../secrets';
import { authenticationSucceeded } from './AuthActions';
import { OAuthProvider } from './OAuthProvider';
import { AccessToken, UserInfoDto } from './types';

const actions = {
  authenticationSucceeded,
  loadUserInfo,
};

type AuthControllerProps = {
  accessToken: null | AccessToken;
  userInfo: UserInfoDto | null;
};

export class AuthController extends React.PureComponent<AuthControllerProps & typeof actions> {

  public constructor(props: AuthControllerProps & typeof actions) {
    super(props);

    this.onAuthenticated = this.onAuthenticated.bind(this);
  }

  public componentDidMount() {
    if (this.props.accessToken && !this.props.userInfo) {
      this.props.loadUserInfo(this.props.accessToken);
    }
  }

  public render() {
    return (
      <OAuthProvider
        clientId={secretClientId}
        authorizeUrl='https://accounts.spotify.com/authorize'
        redirectUri={redirectUrl}
        scope={['streaming', 'user-read-birthdate', 'user-read-email', 'user-read-private', 'user-read-playback-state']}
        component={AuthLink}
        onAuthenticated={this.onAuthenticated}
      />
    );
  }

  private async onAuthenticated(token: AccessToken) {
    this.props.authenticationSucceeded(token);
    this.props.loadUserInfo(token);
  }
}

const AuthLink = (props: { url: string }) => (
  <div className='authentication-container'>
    <a href={props.url}>Authenticate</a>
  </div>
);

const mapState = (state: AppState): AuthControllerProps => ({
  accessToken: state.authentication.accessToken,
  userInfo: state.user.userInfo,
});

export const AuthControllerContainer = connect(mapState, actions)(AuthController);
