import * as React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../AppState';

type AuthControllerProps = {
  isAuthenticated: boolean;
}

export class AuthController extends React.PureComponent<AuthControllerProps> {
  public render() {
    return (
      <div>
        Is Authenticated: {this.props.isAuthenticated.toString()}
      </div>
    );
  }
}

const mapState = (state: AppState): AuthControllerProps => ({
  isAuthenticated: state.authentication.isAuthenticated
});

export const AuthControllerContainer = connect(mapState)(AuthController);
