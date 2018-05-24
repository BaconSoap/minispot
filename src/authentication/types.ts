export type AccessToken = {
  token: string;
  expiresInSeconds: number;
  expiresAtTime: number;
  tokenType: 'Bearer';
};
