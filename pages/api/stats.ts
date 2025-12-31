/* eslint-disable no-sequences, @typescript-eslint/no-magic-numbers */
import { XMLBuilder } from 'fast-xml-parser';
import { orderBy, sumBy, take } from 'lodash';

import DATA from '#data/stats.json';
import Config from '#lib/config';
import fetcher from '#lib/fetcher';

interface PLang {
  name: string;
  color: string;
  size: number;
}

const BG = '#1f2430';
const BG_BOX = '#30363d';
const FG_NATIVE = '#3182ce';
const FG_FLUENT = '#e53e3e';

export default async function handler(...[, res]: Handler) {
  const response = await fetcher<{ data?: typeof DATA }>(
    'https://api.github.com/graphql',
    {
      method: 'POST',
      body: JSON.stringify({
        query: `#graphql
        query data($name: String!) {
          user(login: $name) {
            commits: contributionsCollection { totalCommitContributions }
            repositoriesContributedTo(first: 1, contributionTypes: [COMMIT, ISSUE, PULL_REQUEST, REPOSITORY]) { totalCount }
            pullRequests(first: 1) { totalCount }
            mergedPullRequests: pullRequests(states: MERGED) { totalCount }
            openIssues: issues(states: OPEN) { totalCount }
            closedIssues: issues(states: CLOSED) { totalCount }
            repositories(first: 100, ownerAffiliations: OWNER) {
              name
              totalCount
              nodes {
                stargazers { totalCount }
                languages(first: 10, orderBy: {field: SIZE, direction: DESC}) {
                  edges { size, node { color name } }
                }
              }
            }
          }
        }
      `,
        variables: { name: 'miZyind' },
      }),
      headers: {
        Authorization: `Bearer ${Config.GH_TOKEN}`,
      },
    },
  );
  const data = response.data ? response.data.user : DATA.user;

  res
    .setHeader('Cache-Control', 'public, max-age=3600')
    .setHeader('Content-Type', 'image/svg+xml')
    .send(
      new XMLBuilder({
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
                    (v, o) => v + o.stargazers.totalCount,
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
                    .reduce<Record<string, PLang | undefined>>(
                      (v, { node: { name, color }, size }) => (
                        (v[name] = {
                          name,
                          color,
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
                  const percent = parseFloat(
                    ((size / totalSize) * 100).toFixed(2),
                  );

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
      }),
    );
}
