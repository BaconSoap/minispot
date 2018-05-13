declare module "react-oauth-flow" {
  export type OauthSenderProps = {
    authorizeUrl: string;
    clientId: string;
    redirectUri: string;
    state?: any;
    render?: any;
    args?: { [paramName: string]: string | string[] };
  };
  export class OauthSender extends React.Component<OauthSenderProps> { }
}
