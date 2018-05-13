import Axios from 'axios';
import { parse, stringify } from 'qs';
import * as React from 'react';

export type ProviderRenderProps = { url: string };

export type OAuthProviderProps = {
  authorizeUrl: string;
  clientId: string;
  redirectUri: string;
  state?: any;
  component?: React.ComponentType<ProviderRenderProps>;
  scope: string[]
};

export type AccessToken = {
  token: string;
  expiresInSeconds: number;
  tokenType: 'Bearer';
}

export type OAuthProviderStateUnauthenticated = {
  isAuthenticated: false;
};

export type OAuthProviderStateAuthenticated = {
  isAuthenticated: true;
  userInfo: any;
}

export type OAuthProviderState = OAuthProviderStateAuthenticated | OAuthProviderStateUnauthenticated;

export class OAuthProvider extends React.Component<OAuthProviderProps, OAuthProviderState> {
  public constructor(props: OAuthProviderProps) {
    super(props);

    this.state = {
      isAuthenticated: false,
    };
  }
  public async componentDidMount() {
    if (location.hash[0] !== '#') { return; }
    const hash = location.hash.split('#');
    const parsed = parse(hash[1]);
    const normalized: AccessToken = {
      expiresInSeconds: parseInt(parsed.expires_in, 10),
      token: parsed.access_token,
      tokenType: 'Bearer',
    }

    const res = await Axios.get('https://api.spotify.com/v1/me', {
      headers: {
        'Authorization': `${normalized.tokenType} ${normalized.token}`
      }
    });

    this.setState({ isAuthenticated: true, userInfo: JSON.stringify(res.data) });
    history.pushState('', document.title, window.location.pathname + window.location.search);
  }
  public render() {
    const { clientId, redirectUri, authorizeUrl, scope } = this.props;

    const authParams = {
      client_id: clientId,
      redirect_uri: redirectUri,
      response_type: 'token',
      scope: scope.join(' ')
    };

    const url = `${authorizeUrl}?${stringify(authParams)}`;

    return (
      <>
        <a href={url}>Click to authorize</a>
        <div>{this.state.isAuthenticated ? '(' + this.state.userInfo.toString() + ')' : ''}</div>
      </>
    );
  }
}
