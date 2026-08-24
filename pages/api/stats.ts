/* eslint-disable no-sequences */
import { getStore } from '@netlify/blobs';
import XMLBuilder from 'fast-xml-builder';
import { orderBy, sumBy, take } from 'lodash';

import DATA from '#data/stats.json';
import {
  STATS_KEY,
  STATS_STORE,
  type StatsUser,
  isStatsUser,
} from '#lib/stats';

interface PLang {
  name: string;
  color: string;
  size: number;
}

type Source = 'blob' | 'fallback';

const BG = '#1f2430';
const BG_BOX = '#30363d';
const FG_NATIVE = '#3182ce';
const FG_FLUENT = '#e53e3e';
const LANG_FALLBACK_COLOR = '#8b949e';
const IGNORED_NODES = ['Mathematica', 'JavaScript', 'CSS'];
// Time cap for reading Blobs: past it use the fallback, keeping the origin well below GitHub camo's timeout.
const BLOB_TIMEOUT = 2000;
// Bundled stats.json as fallback so a full SVG is returned right away when Blobs is empty or unavailable.
const FALLBACK: StatsUser = DATA.user;

async function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(
      () => reject(new Error(`Timed out after ${ms}ms`)),
      ms,
    );

    promise.then(resolve, reject).finally(() => clearTimeout(timer));
  });
}

/**
 * Never call the GitHub API on the request path (the query takes 3s+ and hits camo's timeout).
 * netlify/functions/refresh-stats.ts writes the data to Blobs on a schedule; this only reads and strictly validates the shape.
 */
async function loadStats(): Promise<{ user: StatsUser; source: Source }> {
  try {
    const user: unknown = await withTimeout(
      getStore(STATS_STORE).get(STATS_KEY, { type: 'json' }),
      BLOB_TIMEOUT,
    );

    if (isStatsUser(user)) {
      return { user, source: 'blob' };
    }
  } catch {
    // Local dev (no Blobs environment), Blobs temporarily unavailable, or a timeout: always use the fallback.
  }

  return { user: FALLBACK, source: 'fallback' };
}

function render(data: StatsUser): string {
  return new XMLBuilder({
    suppressEmptyNode: true,
    ignoreAttributes: false,
    attributeNamePrefix: '@',
  }).build({
    svg: {
      '@xmlns': 'http://www.w3.org/2000/svg',
      '@width': 1000,
      '@height': 263,
      style: {
        '#text': `
            .nlang { fill: #fff; font: 12px Sans-Serif }
            .stat { fill: #fff; font: 12px Sans-Serif }
            .rank { font: 800 24px Sans-Serif }
            .plang-title { fill: #f4cd7c; font: 600 18px Sans-Serif }
            .plang-name { fill: #fff; font: 400 11px Sans-Serif }
            .ani { animation-timing-function: ease-in-out; animation-fill-mode: forwards }
            .ani-c { filter: grayscale(100%); animation-name: ani-c; animation-duration: 1s }
            .ani-o { opacity: 0; animation-name: ani-o; animation-duration: 1s }
            #mask rect { width: 0; animation: ani-s 1s ease-in-out forwards }
            @keyframes ani-c { to { filter: grayscale(0%) } }
            @keyframes ani-o { to { opacity: 1 } }
            @keyframes ani-s { to { width: 100% } }
          `,
      },
      defs: {
        radialGradient: {
          '@id': 'rank',
          stop: [
            {
              '@offset': 0,
              '@stop-color': '#f4cd7cff',
              animate: {
                '@attributeName': 'stop-color',
                '@to': '#f4cd7c00',
                '@dur': '1s',
                '@fill': 'freeze',
              },
            },
            {
              '@offset': 1,
              '@stop-color': '#f4cd7c00',
              animate: {
                '@attributeName': 'stop-color',
                '@to': '#f4cd7cff',
                '@dur': '1s',
                '@fill': 'freeze',
              },
            },
          ],
        },
      },
      rect: { '@rx': 15, '@width': '100%', '@height': '100%', '@fill': BG },
      g: [
        {
          '@class': 'nlang',
          '@text-anchor': 'middle',
          '@dominant-baseline': 'central',
          path: [
            { '@d': 'M16 16h115v25H16z', '@fill': BG_BOX },
            {
              '@d': 'M131 16h115v25H131z',
              '@fill': FG_NATIVE,
              '@class': 'ani ani-c',
            },
            { '@d': 'M262 16h115v25H262z', '@fill': BG_BOX },
            {
              '@d': 'M377 16h115v25H377z',
              '@fill': FG_NATIVE,
              '@class': 'ani ani-c',
            },
            { '@d': 'M508 16h115v25H508z', '@fill': BG_BOX },
            {
              '@d': 'M623 16h115v25H623z',
              '@fill': FG_FLUENT,
              '@class': 'ani ani-c',
            },
            { '@d': 'M754 16h115v25H754z', '@fill': BG_BOX },
            {
              '@d': 'M869 16h115v25H869z',
              '@fill': FG_FLUENT,
              '@class': 'ani ani-c',
            },
          ],
          text: [
            { '@x': 73.5, '@y': 28.5, '#text': 'MANDARIN' },
            {
              '@x': 188.5,
              '@y': 28.5,
              '#text': 'NATIVE',
              '@class': 'ani ani-o',
            },
            { '@x': 319.5, '@y': 28.5, '#text': 'HOKKIEN' },
            {
              '@x': 434.5,
              '@y': 28.5,
              '#text': 'NATIVE',
              '@class': 'ani ani-o',
            },
            { '@x': 565.5, '@y': 28.5, '#text': 'ENGLISH' },
            {
              '@x': 680.5,
              '@y': 28.5,
              '#text': 'FLUENT',
              '@class': 'ani ani-o',
            },
            { '@x': 811.5, '@y': 28.5, '#text': 'VIETNAMESE' },
            {
              '@x': 926.5,
              '@y': 28.5,
              '#text': 'FLUENT',
              '@class': 'ani ani-o',
            },
          ],
        },
        {
          '@class': 'stat',
          '@dominant-baseline': 'hanging',
          path: { '@d': 'M16 57h476v190H16z', '@fill': BG_BOX },
          text: [
            {
              '@x': 32,
              '@y': 78,
              '#text': 'Total Stars Earned:',
              '@class': 'ani ani-o',
              '@style': 'animation-duration: 0.2s',
            },
            {
              '@x': 222,
              '@y': 78,
              '#text': data.repositories.nodes.reduce(
                (v, o) => v + o.stargazerCount,
                0,
              ),
              '@class': 'ani ani-o',
              '@style': 'animation-duration: 0.2s',
            },
            {
              '@x': 32,
              '@y': 113,
              '#text': 'Total Commits:',
              '@class': 'ani ani-o',
              '@style': 'animation-duration: 0.2s; animation-delay: 0.2s',
            },
            {
              '@x': 222,
              '@y': 113,
              '#text': data.commits.totalCommitContributions,
              '@class': 'ani ani-o',
              '@style': 'animation-duration: 0.2s; animation-delay: 0.2s',
            },
            {
              '@x': 32,
              '@y': 148,
              '#text': 'Total Pull Requests:',
              '@class': 'ani ani-o',
              '@style': 'animation-duration: 0.2s; animation-delay: 0.4s',
            },
            {
              '@x': 222,
              '@y': 148,
              '#text':
                data.pullRequests.totalCount +
                data.mergedPullRequests.totalCount,
              '@class': 'ani ani-o',
              '@style': 'animation-duration: 0.2s; animation-delay: 0.4s',
            },
            {
              '@x': 32,
              '@y': 183,
              '#text': 'Total Participated Issues:',
              '@class': 'ani ani-o',
              '@style': 'animation-duration: 0.2s; animation-delay: 0.6s',
            },
            {
              '@x': 222,
              '@y': 183,
              '#text':
                data.openIssues.totalCount + data.closedIssues.totalCount,
              '@class': 'ani ani-o',
              '@style': 'animation-duration: 0.2s; animation-delay: 0.6s',
            },
            {
              '@x': 32,
              '@y': 218,
              '#text': 'Total Contributed Repos:',
              '@class': 'ani ani-o',
              '@style': 'animation-duration: 0.2s; animation-delay: 0.8s',
            },
            {
              '@x': 222,
              '@y': 218,
              '#text': data.repositoriesContributedTo.totalCount,
              '@class': 'ani ani-o',
              '@style': 'animation-duration: 0.2s; animation-delay: 0.8s',
            },
          ],
          g: {
            '@text-anchor': 'middle',
            '@dominant-baseline': 'central',
            circle: {
              '@cx': 377,
              '@cy': 152,
              '@r': 57.5,
              '@fill': 'url(#rank)',
            },
            text: {
              '@class': 'rank ani ani-o',
              '@x': 377,
              '@y': 152,
              '#text': 'A',
            },
          },
        },
        (() => {
          const langs = take(
            orderBy(
              data.repositories.nodes
                .filter((node) => node.languages.edges.length)
                .flatMap((node) => node.languages.edges)
                .filter((edge) => !IGNORED_NODES.includes(edge.node.name))
                .reduce<Record<string, PLang | undefined>>(
                  (v, { node: { name, color }, size }) => (
                    (v[name] = {
                      name,
                      color: color ?? LANG_FALLBACK_COLOR,
                      size: v[name] ? v[name].size + size : size,
                    }),
                    v
                  ),
                  {},
                ),
              'size',
              'desc',
            ),
            6,
          ) as PLang[];
          const totalSize = sumBy(langs, 'size');
          const { rect, g } = langs.reduce<{
            rect: unknown[];
            g: unknown[];
            percent: number;
          }>(
            (v, { name, color, size }, i) => {
              const xPos = 529 + (i >= 3 ? 225 : 0);
              const yPos = 149 + (i % 3) * 34.7;
              const percent = parseFloat(((size / totalSize) * 100).toFixed(2));

              v.rect.push({
                '@x': i ? `${v.percent.toFixed(2)}%` : undefined,
                '@width': `${percent}%`,
                '@height': 10,
                '@fill': color,
                '@mask': 'url(#mask)',
              });
              v.g.push({
                '@class': 'ani ani-o',
                '@style': `animation-duration: ${(1 / 6).toFixed(2)}s; animation-delay: ${((1 / 6) * i).toFixed(2)}s`,
                circle: {
                  '@cx': xPos,
                  '@cy': yPos,
                  '@r': 5,
                  '@fill': color,
                },
                text: {
                  '@class': 'plang-name',
                  '@x': xPos + 13,
                  '@y': yPos,
                  '@dominant-baseline': 'central',
                  '#text': `${name} ${percent}%`,
                },
              });
              v.percent += percent;

              return v;
            },
            { rect: [], g: [], percent: 0 },
          );

          return {
            '@dominant-baseline': 'hanging',
            path: { '@d': 'M508 57h476v190H508z', '@fill': BG_BOX },
            text: {
              '@class': 'plang-title ani ani-o',
              '@x': 524,
              '@y': 78,
              '#text': 'Most Used Languages',
            },
            svg: {
              '@x': 524,
              '@y': 113,
              '@width': 444,
              mask: {
                '@id': 'mask',
                rect: { '@height': 10, '@fill': '#fff' },
              },
              rect,
            },
            g,
          };
        })(),
      ],
    },
  });
}

export default async function handler(...[, res]: Handler) {
  const loaded = await loadStats();
  let { source } = loaded;
  let svg: string;

  try {
    svg = render(loaded.user);
  } catch {
    // Still return a full SVG on an unexpected data shape, never a 500 (camo renders any non-200 as a broken image).
    svg = render(FALLBACK);
    source = 'fallback';
  }

  res
    // Every header is set only after the data is ready, so an exception never leaks cache headers onto an error response.
    // Browser-side cache.
    .setHeader('Cache-Control', 'public, max-age=3600')
    // Netlify normalizes stale-while-revalidate out of the standard Cache-Control (in production
    // only public,max-age=3600 survives), so the CDN-specific header is used to enable
    // "durable + stale-while-revalidate": after expiry the CDN (Netlify edge and the downstream GitHub
    // camo) serves the stale image and revalidates in the background. durable stores the response in Netlify's
    // global durable cache, so it can be served without invoking the function again.
    .setHeader(
      'Netlify-CDN-Cache-Control',
      'public, durable, max-age=3600, stale-while-revalidate=86400',
    )
    .setHeader(
      'CDN-Cache-Control',
      'public, max-age=3600, stale-while-revalidate=86400',
    )
    .setHeader('Content-Type', 'image/svg+xml')
    // Makes the data source visible in production: blob = live data written by the schedule, fallback = data/stats.json.
    .setHeader('X-Stats-Source', source)
    .send(svg);
}
