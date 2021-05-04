import { parseCookies, setCookie } from 'nookies';

export enum CookieKey {
  Settings = 'SETTINGS',
}

export function getCookie<T>(key: CookieKey) {
  const value = parseCookies()[key] as string | undefined;

  return typeof value === 'string' ? (JSON.parse(value) as T) : null;
}

export function setClientCookie(key: CookieKey, value: unknown) {
  setCookie(null, key, JSON.stringify(value));
}
