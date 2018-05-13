import Axios from 'axios';
import * as React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../AppState';
import { clientId as secretClientId } from '../secrets';
import { AccessToken, OAuthProvider } from './OAuthProvider';

type AuthControllerProps = {
  isAuthenticated: boolean;
}

export type AuthControllerStateUnauthenticated = {
  isAuthenticated: false;
};

export type AuthControllerStateAuthenticated = {
  isAuthenticated: true;
  userInfo: any;
}

export type AuthControllerState = AuthControllerStateAuthenticated | AuthControllerStateUnauthenticated;


export class AuthController extends React.PureComponent<AuthControllerProps, AuthControllerState> {

  public constructor(props: AuthControllerProps) {
    super(props);
    this.state = {
      isAuthenticated: false
    };

    this.onAuthenticated = this.onAuthenticated.bind(this);
  }

  public render() {
    return (
      <div>
        Is Authenticated: {this.state.isAuthenticated.toString()}
        <OAuthProvider
          clientId={secretClientId}
          authorizeUrl='https://accounts.spotify.com/authorize'
          redirectUri='http://localhost:3000'
          scope={['user-read-private', 'user-read-email']}
          component={AuthLink}
          onAuthenticated={this.onAuthenticated}
        />
        {this.state.isAuthenticated ? <pre>{this.state.userInfo}</pre> : null}
      </div>
    );
  }

  private async onAuthenticated(token: AccessToken) {
    const res = await Axios.get('https://api.spotify.com/v1/me', {
      headers: {
        'Authorization': `${token.tokenType} ${token.token}`
      }
    });

    this.setState({ isAuthenticated: true, userInfo: JSON.stringify(res.data, undefined, 2) });
  }

}


const AuthLink = (props: { url: string }) => (
  <div>
    <a href={props.url}>Authenticate</a>
  </div>
);

const mapState = (state: AppState): AuthControllerProps => ({
  isAuthenticated: state.authentication.isAuthenticated
});

export const AuthControllerContainer = connect(mapState)(AuthController);
