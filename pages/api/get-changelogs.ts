import useSWR from 'swr';

import Config from '#lib/config';
import { CHANGELOG_TRACKING_LIST } from '#lib/constant';
import { Key } from '#lib/cookie';
import fetcher from '#lib/fetcher';

import type { Changelog } from '#lib/model';

interface Changelogs {
  changelogs: Changelog[];
  limit: number;
  remaining: number;
}

const normalizeName = (name: string) => name.replace('plugin-nextjs-', '');
const getChangelogs = async (token?: string) => {
  const limits: number[] = [];
  const remainings: number[] = [];
  const changelogs = await Promise.all(
    CHANGELOG_TRACKING_LIST.map(async (repo) => {
      const [, name] = repo.split('/');
      const response = await fetch(
        `${Config.GH_API_URL}/repos/${repo}/releases?per_page=5`,
        {
          headers:
            typeof token === 'string'
              ? { Authorization: `token ${token}` }
              : {},
        },
      );
      let releases: Changelog['releases'] = [];

      limits.push(Number(response.headers.get('x-ratelimit-limit')));
      remainings.push(Number(response.headers.get('x-ratelimit-remaining')));

      if (response.ok) {
        releases = (await response.json()) as Changelog['releases'];
      }

      return {
        name,
        releases: releases.map((data) => ({
          ...data,
          tag_name: normalizeName(data.tag_name),
        })),
      };
    }),
  );

  return {
    changelogs,
    limit: Math.max(...limits),
    remaining: Math.min(...remainings),
  };
};

export const useChangelogs = (hasToken: boolean) =>
  useSWR<Changelogs>(
    '/api/get-changelogs',
    (url: string) => (hasToken ? fetcher<Changelogs>(url) : getChangelogs()),
    { revalidateOnFocus: false },
  ).data;

export default async function handler(...[{ cookies }, res]: Handler) {
  res.json(await getChangelogs(cookies[Key.Token]));
}
