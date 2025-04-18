import { deleteCookie, getCookie, setCookie } from 'cookies-next';

import { COOKIE_MAX_AGE } from '#lib/constant';

import type { HttpContext } from 'cookies-next';
import type { GetServerSidePropsContext as SSRCtx } from 'next';

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
  const value = getCookie(key, ctx);
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
export function set(key: Key.Token, value: string, ctx: HttpContext): void;
export function set(key: Key, input: unknown, ctx?: HttpContext) {
  let value: Partial<Settings> | string | null = null;
  const options = {
    httpOnly: false,
    maxAge: COOKIE_MAX_AGE,
    path: '/',
    sameSite: 'lax',
    ...ctx,
  } as HttpContext;

  if (key === Key.Settings) {
    value = { ...get(key), ...(input as Partial<Settings>) };
  }
  if (key === Key.Token) {
    value = input as string;
    options.httpOnly = true;
  }
  if (value !== null) {
    void setCookie(
      key,
      typeof value === 'string' ? value : JSON.stringify(value),
      options,
    );
  }
}

export async function destroy(ctx: HttpContext) {
  return deleteCookie(Key.Token, {
    ...ctx,
    httpOnly: true,
    maxAge: COOKIE_MAX_AGE,
    path: '/',
    sameSite: 'lax',
  });
}
