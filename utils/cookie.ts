import { destroyCookie, parseCookies, setCookie } from 'nookies';

import { COOKIE_MAX_AGE } from '#utils/constant';

import type {
  NextApiResponse,
  GetServerSidePropsContext as SSRCtx,
} from 'next';

interface Ctx {
  res: NextApiResponse;
}

export interface Settings {
  animate: boolean;
}

export enum Key {
  Settings = 'SETTINGS',
  Token = 'TOKEN',
}

export function get(key: Key.Settings, ctx?: SSRCtx): Settings;
export function get(key: Key.Token, ctx?: SSRCtx): string | null;
export function get(key: Key, ctx?: SSRCtx) {
  const value = parseCookies(ctx)[key];
  const hasValue = typeof value === 'string';

  switch (key) {
    case Key.Settings:
      return hasValue ? (JSON.parse(value) as Settings) : { animate: true };
    case Key.Token:
      return hasValue ? value : null;
    default:
      return null;
  }
}

export function set(key: Key.Settings, value: Partial<Settings>): void;
export function set(key: Key.Token, value: string, ctx: Ctx): void;
export function set(key: Key, input: unknown, ctx: Ctx | null = null) {
  let value: Partial<Settings> | string | null = null;
  const options = {
    httpOnly: false,
    maxAge: COOKIE_MAX_AGE,
    path: '/',
    sameSite: 'lax',
  };

  if (key === Key.Settings) {
    value = { ...get(key), ...(input as Partial<Settings>) };
  }
  if (key === Key.Token) {
    value = input as string;
    options.httpOnly = true;
  }
  if (value !== null) {
    setCookie(
      ctx,
      key,
      typeof value === 'string' ? value : JSON.stringify(value),
      options,
    );
  }
}

export function destroy(res: Ctx['res']) {
  return destroyCookie({ res }, Key.Token, {
    httpOnly: true,
    maxAge: COOKIE_MAX_AGE,
    path: '/',
    sameSite: 'lax',
  });
}
