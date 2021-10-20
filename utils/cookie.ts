import { parseCookies, setCookie } from 'nookies';

import type { GetServerSidePropsContext as Context } from 'next';

export interface Settings {
  animate: boolean;
}

export enum CookieKey {
  Settings = 'SETTINGS',
}

export function get(key: CookieKey.Settings, ctx?: Context): Settings;
export function get<T extends Record<string, unknown>>(
  key: CookieKey,
  ctx?: Context,
) {
  const value = parseCookies(ctx)[key] as string | undefined;

  if (typeof value === 'string') {
    return JSON.parse(value) as T;
  }

  switch (key) {
    case CookieKey.Settings:
      return { animate: true };
    default:
      return null;
  }
}

export function set(key: CookieKey, value: Partial<Settings>) {
  setCookie(null, key, JSON.stringify({ ...get(key), ...value }));
}
