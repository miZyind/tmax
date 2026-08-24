/**
 * Shared definitions for GitHub stats: GraphQL query, types, validation, and the Netlify Blobs store/key.
 *
 * Data flow: netlify/functions/refresh-stats.ts (scheduled) calls fetchStatsUser and writes to Blobs;
 * pages/api/stats.ts only reads Blobs (falling back to data/stats.json), so the request path never touches the GitHub API
 * (the query alone takes 3s+ and would always hit the GitHub camo proxy's timeout on the request path).
 *
 * This file deliberately imports no #alias modules so both Netlify's function bundler and Next can use it directly.
 */

export const STATS_STORE = 'stats';
export const STATS_KEY = 'user';
export const STATS_LOGIN = 'miZyind';

export interface StatsLanguageEdge {
  size: number;
  node: { name: string; color: string | null };
}

export interface StatsRepository {
  name: string;
  stargazerCount: number;
  languages: { edges: StatsLanguageEdge[] };
}

export interface StatsUser {
  commits: { totalCommitContributions: number };
  repositoriesContributedTo: { totalCount: number };
  pullRequests: { totalCount: number };
  mergedPullRequests: { totalCount: number };
  openIssues: { totalCount: number };
  closedIssues: { totalCount: number };
  repositories: { totalCount: number; nodes: StatsRepository[] };
}

interface GraphQLResponse {
  data?: { user?: unknown } | null;
  errors?: { message?: string }[];
  message?: string;
}

// Note: star counts must use stargazerCount (scalar), not stargazers { totalCount } (connection).
// A fine-grained PAT gets FORBIDDEN on the latter, and GitHub then nulls out the whole repository node.
const QUERY = `#graphql
  query data($name: String!) {
    user(login: $name) {
      commits: contributionsCollection { totalCommitContributions }
      repositoriesContributedTo(first: 1, contributionTypes: [COMMIT, ISSUE, PULL_REQUEST, REPOSITORY]) { totalCount }
      pullRequests(first: 1) { totalCount }
      mergedPullRequests: pullRequests(states: MERGED) { totalCount }
      openIssues: issues(states: OPEN) { totalCount }
      closedIssues: issues(states: CLOSED) { totalCount }
      repositories(first: 100, ownerAffiliations: OWNER) {
        totalCount
        nodes {
          name
          stargazerCount
          languages(first: 10, orderBy: {field: SIZE, direction: DESC}) {
            edges { size, node { color name } }
          }
        }
      }
    }
  }
`;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function hasCount(value: unknown, key: string): boolean {
  return isRecord(value) && typeof value[key] === 'number';
}

function isStatsLanguageEdge(value: unknown): value is StatsLanguageEdge {
  return (
    isRecord(value) &&
    typeof value.size === 'number' &&
    isRecord(value.node) &&
    typeof value.node.name === 'string' &&
    (typeof value.node.color === 'string' || value.node.color === null)
  );
}

function isStatsRepository(value: unknown): value is StatsRepository {
  return (
    isRecord(value) &&
    typeof value.name === 'string' &&
    typeof value.stargazerCount === 'number' &&
    isRecord(value.languages) &&
    Array.isArray(value.languages.edges) &&
    value.languages.edges.every(isStatsLanguageEdge)
  );
}

/**
 * Strictly validate the data shape. Any null repository node (GitHub's behaviour on insufficient permissions)
 * marks the payload invalid, so a TypeError never surfaces at render time.
 */
export function isStatsUser(value: unknown): value is StatsUser {
  return (
    isRecord(value) &&
    hasCount(value.commits, 'totalCommitContributions') &&
    hasCount(value.repositoriesContributedTo, 'totalCount') &&
    hasCount(value.pullRequests, 'totalCount') &&
    hasCount(value.mergedPullRequests, 'totalCount') &&
    hasCount(value.openIssues, 'totalCount') &&
    hasCount(value.closedIssues, 'totalCount') &&
    isRecord(value.repositories) &&
    typeof value.repositories.totalCount === 'number' &&
    Array.isArray(value.repositories.nodes) &&
    value.repositories.nodes.every(isStatsRepository)
  );
}

/**
 * Fetch stats from GitHub GraphQL. Any HTTP error, GraphQL errors or shape mismatch is thrown,
 * leaving it to the caller to decide whether to keep the previous data.
 */
export async function fetchStatsUser(
  token: string,
  timeoutMs = 8000,
): Promise<StatsUser> {
  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    signal: AbortSignal.timeout(timeoutMs),
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query: QUERY, variables: { name: STATS_LOGIN } }),
  });

  if (!response.ok) {
    throw new Error(`GitHub GraphQL responded ${response.status}`);
  }

  const json = (await response.json()) as GraphQLResponse;

  if (json.errors?.length) {
    throw new Error(
      `GitHub GraphQL errors: ${json.errors.map((error) => error.message ?? 'unknown').join('; ')}`,
    );
  }

  const user = json.data?.user;

  if (!isStatsUser(user)) {
    throw new Error(
      `GitHub GraphQL returned an unexpected shape${json.message ? ` (${json.message})` : ''}`,
    );
  }

  return user;
}
