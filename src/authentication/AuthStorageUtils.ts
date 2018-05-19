import { AccessToken } from './types';

export const AUTH_STORAGE_KEY = 'minispot.accessToken';

export const saveAuth = (token: AccessToken) => {
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(token));
};

export const loadAuth = (): AccessToken | null => {
  const fromStorage = localStorage.getItem(AUTH_STORAGE_KEY);
  if (!fromStorage) {
    return null;
  }

  try {
    const deserialized: AccessToken = JSON.parse(fromStorage);
    if (!isValidToken(deserialized)) {
      return null;
    }

    return deserialized;
  } catch {
    return null;
  }

  // @ts-ignore
  throw new Error('unknown code path when loading access token');
};

export const isValidToken = (accessToken: AccessToken): boolean => {
  const { expiresAtTime, expiresInSeconds, token, tokenType } = accessToken;
  if (!expiresAtTime || !expiresInSeconds || !token || !tokenType) {
    return false;
  }

  if (new Date().getTime() > expiresAtTime) {
    return false;
  }

  return true;
};
