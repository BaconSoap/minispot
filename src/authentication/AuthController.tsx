import * as React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../AppState';
import { clientId as secretClientId } from '../secrets';
import { OAuthProvider } from './OAuthProvider';

type AuthControllerProps = {
  isAuthenticated: boolean;
}

export class AuthController extends React.PureComponent<AuthControllerProps> {
  public render() {
    return (
      <div>
        Is Authenticated: {this.props.isAuthenticated.toString()}
        <OAuthProvider
          clientId={secretClientId}
          authorizeUrl='https://accounts.spotify.com/authorize'
          redirectUri='http://localhost:3000'
          scope={['user-read-private', 'user-read-email']}
          component={AuthLink}
        />
      </div>
    );
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
