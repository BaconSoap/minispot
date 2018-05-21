import * as React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../AppState';
import { clientId as secretClientId, redirectUrl } from '../secrets';
import { authenticationSucceeded, loadUserInfo } from './AuthActions';
import { OAuthProvider } from './OAuthProvider';
import { AccessToken, UserInfoDto } from './types';

const actions = {
  authenticationSucceeded,
  loadUserInfo,
};

type AuthControllerProps = {
  accessToken: null | AccessToken;
  isAuthenticated: boolean;
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
      <div>
        Is Authenticated: {this.props.isAuthenticated.toString()}
        <OAuthProvider
          clientId={secretClientId}
          authorizeUrl='https://accounts.spotify.com/authorize'
          redirectUri={redirectUrl}
          scope={['streaming', 'user-read-birthdate', 'user-read-email', 'user-read-private', 'user-read-playback-state']}
          component={AuthLink}
          onAuthenticated={this.onAuthenticated}
        />
        {this.props.isAuthenticated ? <pre>{JSON.stringify(this.props.userInfo, undefined, 2)}</pre> : null}
      </div>
    );
  }

  private async onAuthenticated(token: AccessToken) {
    this.props.authenticationSucceeded(token);
    this.props.loadUserInfo(token);
  }
}

const AuthLink = (props: { url: string }) => (
  <div>
    <a href={props.url}>Authenticate</a>
  </div>
);

const mapState = (state: AppState): AuthControllerProps => ({
  accessToken: state.authentication.accessToken,
  isAuthenticated: state.authentication.isAuthenticated,
  userInfo: state.authentication.userInfo,
});

export const AuthControllerContainer = connect(mapState, actions)(AuthController);
