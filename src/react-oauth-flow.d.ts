declare module "react-oauth-flow" {
  export type AuthArgs = { [paramName: string]: string | string[] };
  export type SenderRenderProps = { url: string };
  export type SenderRenderProp = (props: SenderRenderProps) => React.ReactNode;

  export type OauthSenderProps = {
    authorizeUrl: string;
    clientId: string;
    redirectUri: string;
    state?: any;
    args?: AuthArgs;
    render?: SenderRenderProp;
    component?: React.ComponentType<SenderRenderProps>;
  };
  export class OauthSender extends React.Component<OauthSenderProps> { }

  export type ReceiverRenderProps = {
    processing: boolean;
    state: any | null;
    error?: Error
  };

  export type ReceiverRenderProp = (props: ReceiverRenderProp) => React.ReactNode;
  export type OnAuthSuccess = (accessToken: string, result: { response: any, state: any | null }) => void;
  export type OnAuthError = (error: Error) => void;

  export type OauthReceiverProps = {
    tokenUrl: string;
    clientId: string;
    clientSecret: string;
    redirectUri: string;
    args?: AuthArgs;
    location?: { search: string };
    querystring?: string;
    render?: ReceiverRenderProp;
    component?: React.ComponentType<SenderRenderProps>;
    onAuthSuccess?: OnAuthSuccess;
    onAuthError?: OnAuthError;
  };
  export class OauthReceiver extends React.Component<OauthReceiverProps> { }
}
