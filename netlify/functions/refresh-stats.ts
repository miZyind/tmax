import { getStore } from '@netlify/blobs';
import type { Config } from '@netlify/functions';

// This file is bundled by Netlify's function bundler (esbuild), not Next, so it uses relative paths instead of #alias.
import AppConfig from '../../lib/config';
import { STATS_KEY, STATS_STORE, fetchStatsUser } from '../../lib/stats';

/**
 * Fetches stats from GitHub GraphQL every hour and writes them to Netlify Blobs, so /api/stats only reads Blobs
 * and never calls GitHub on the request path (the query alone takes 3s+ and hits the GitHub camo proxy's timeout).
 *
 * On fetch failure the error is thrown so Netlify records a failed run and Blobs keeps the last successful data;
 * on success a summary goes into the blob metadata (the project lint only allows console.error).
 * After the first deploy, press "Run now" on the Functions page in the Netlify UI to populate the data immediately.
 */
export default async function refreshStats(): Promise<void> {
  const user = await fetchStatsUser(AppConfig.GH_TOKEN);

  await getStore(STATS_STORE).setJSON(STATS_KEY, user, {
    metadata: {
      refreshedAt: new Date().toISOString(),
      commits: user.commits.totalCommitContributions,
      repos: user.repositories.totalCount,
    },
  });
}

export const config: Config = { schedule: '@hourly' };
