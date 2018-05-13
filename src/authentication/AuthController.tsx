import * as React from 'react';
import { OauthSender } from 'react-oauth-flow';
import { connect } from 'react-redux';
import { AppState } from '../AppState';
import { clientId } from '../secrets';

type AuthControllerProps = {
  isAuthenticated: boolean;
}

export class AuthController extends React.PureComponent<AuthControllerProps> {
  public render() {
    return (
      <div>
        Is Authenticated: {this.props.isAuthenticated.toString()}
        <OauthSender
          clientId={clientId}
          authorizeUrl='https://accounts.spotify.com/authorize'
          redirectUri='http://localhost:3000'
          args={{
            scope: 'user-read-private user-read-email'
          }}
          // tslint:disable-next-line:jsx-no-lambda
          render={(props: any) => (
            <a href={props.url}>Authenticate</a>
          )}
        />
      </div>
    );
  }
}

const mapState = (state: AppState): AuthControllerProps => ({
  isAuthenticated: state.authentication.isAuthenticated
});

export const AuthControllerContainer = connect(mapState)(AuthController);
