import { parse, stringify } from 'qs';
import * as React from 'react';
import { isValidToken, saveAuth } from './AuthStorageUtils';
import { AccessToken } from './types';

export type ProviderRenderProps = { url: string };

export type OAuthProviderProps = {
  authorizeUrl: string;
  clientId: string;
  redirectUri: string;
  state?: any;
  component: React.ComponentType<ProviderRenderProps>;
  scope: string[]
  onAuthenticated: (token: AccessToken) => void;
};

export class OAuthProvider extends React.Component<OAuthProviderProps> {

  public async componentDidMount() {
    if (location.hash[0] !== '#') { return; }
    const hash = location.hash.split('#');
    const parsed = parse(hash[1]);
    const expiresInSeconds = parseInt(parsed.expires_in, 10);

    const normalized: AccessToken = {
      expiresAtTime: new Date(new Date().getTime() + expiresInSeconds * 1000).getTime(),
      expiresInSeconds,
      token: parsed.access_token,
      tokenType: 'Bearer',
    };

    if (!isValidToken(normalized)) {
      throw new Error(`bad token received from spotify: ${JSON.stringify(normalized)}`);
    }

    saveAuth(normalized);

    history.pushState('', document.title, window.location.pathname + window.location.search);
    this.props.onAuthenticated(normalized);
  }

  public render() {
    const { clientId, redirectUri, authorizeUrl, scope, component } = this.props;

    const authParams = {
      client_id: clientId,
      redirect_uri: redirectUri,
      response_type: 'token',
      scope: scope.join(' ')
    };

    const url = `${authorizeUrl}?${stringify(authParams)}`;
    return React.createElement(component, {
      url
    });
  }
}
