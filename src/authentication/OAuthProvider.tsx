import { parse, stringify } from 'qs';
import * as React from 'react';
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
    const normalized: AccessToken = {
      expiresInSeconds: parseInt(parsed.expires_in, 10),
      token: parsed.access_token,
      tokenType: 'Bearer',
    }

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
    })
  }
}
