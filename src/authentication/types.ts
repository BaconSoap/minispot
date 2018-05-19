export type AccessToken = {
  token: string;
  expiresInSeconds: number;
  tokenType: 'Bearer';
};

export type UserInfoDto = {
  country: string;
  display_name: string;
  email: string;
  external_urls: ExternalUrlsDto;
  followers: FollowersDto;
  href: string;
  id: string;
  images: ImageDto[];
  product: string;
  type: string;
  uri: string;
};

export type ExternalUrlsDto = {
  spotify: string;
};

export type FollowersDto = {
  href: null;
  total: number;
};

export type ImageDto = {
  height: null;
  url: string;
  width: null;
};
