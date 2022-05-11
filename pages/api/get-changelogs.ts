import useSWR from 'swr';

import { CHANGELOG_TRACING_LIST } from '#utils/constant';

import type { NextApiHandler } from 'next';
import type { Changelog } from '#utils/model';

export const useChangelogs = () =>
  useSWR<Changelog[]>('/api/get-changelogs').data;

const handler: NextApiHandler = async (_, res) => {
  res.json(
    await Promise.all(
      CHANGELOG_TRACING_LIST.map(async (repo) => {
        const [, name] = repo.split('/');
        const response = await fetch(
          `https://api.github.com/repos/${repo}/releases?per_page=5`,
        );

        return {
          name,
          releases: (await response.json()) as Changelog['releases'],
        };
      }),
    ),
  );
};

export default handler;
