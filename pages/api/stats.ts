import fs from 'fs';
import path from 'path';
import satori from 'satori';

import type { ReactNode } from 'react';

const INTER_REGULAR = fs.readFileSync(
  path.join(process.cwd(), 'public/fonts/Inter-Regular.ttf'),
);
const INTER_BOLD = fs.readFileSync(
  path.join(process.cwd(), 'public/fonts/Inter-Bold.ttf'),
);
const LANGS = [
  { name: 'MANDARIN', level: 'NATIVE', color: '#3182ce' },
  { name: 'HOKKIEN', level: 'NATIVE', color: '#3182ce' },
  { name: 'ENGLISH', level: 'FLUENT', color: '#e53e3e' },
  { name: 'VIETNAMESE', level: 'FLUENT', color: '#e53e3e' },
].map((v) => ({
  type: 'div',
  props: {
    style: {
      flex: 1,
      display: 'flex',
      fontSize: '12px',
    },
    children: [
      {
        type: 'div',
        props: {
          style: {
            flex: 1,
            display: 'flex',
            padding: '4px 8px',
            justifyContent: 'center',
            backgroundColor: '#30363d',
          },
          children: v.name,
        },
      },
      {
        type: 'div',
        props: {
          style: {
            flex: 1,
            display: 'flex',
            padding: '4px 8px',
            justifyContent: 'center',
            backgroundColor: v.color,
          },
          children: v.level,
        },
      },
    ],
  },
}));
const STATS = [
  ['Total Stars Earned:', '225'],
  ['Total Commits:', '49'],
  ['Total PRs:', '8'],
  ['Total Issues:', '14'],
  ['Contributed to:', '1'],
].map(([k, v]) => ({
  type: 'div',
  props: {
    style: {
      display: 'flex',
      fontSize: '12px',
      fontWeight: 700,
      justifyContent: 'space-between',
    },
    children: [
      { type: 'span', props: { children: k } },
      { type: 'span', props: { children: v } },
    ],
  },
}));
const languages = [
  { name: 'TypeScript', percent: 61.69, color: '#3178c6' },
  { name: 'Lua', percent: 24.34, color: '#000080' },
  { name: 'JavaScript', percent: 5.02, color: '#f1e05a' },
  { name: 'Rust', percent: 3.64, color: '#dea584' },
  { name: 'C#', percent: 2.79, color: '#178600' },
  { name: 'Go', percent: 2.51, color: '#00add8' },
];

export default async function handler(...[, res]: Handler) {
  const svg = await satori(
    {
      type: 'div',
      props: {
        style: {
          gap: '16px',
          width: '100%',
          color: 'white',
          display: 'flex',
          padding: '16px',
          fontFamily: 'Inter',
          borderRadius: '12px',
          flexDirection: 'column',
          backgroundColor: '#1f2430',
        },
        children: [
          {
            type: 'div',
            props: {
              style: { display: 'flex', gap: '16px' },
              children: LANGS,
            },
          },
          {
            type: 'div',
            props: {
              style: { display: 'flex', gap: '16px' },
              children: [
                {
                  type: 'div',
                  props: {
                    style: {
                      flex: 1,
                      gap: '16px',
                      display: 'flex',
                      padding: '16px',
                      alignItems: 'center',
                      backgroundColor: '#30363d',
                    },
                    children: [
                      {
                        type: 'div',
                        props: {
                          style: {
                            flex: 1,
                            gap: '16px',
                            display: 'flex',
                            flexDirection: 'column',
                          },
                          children: STATS,
                        },
                      },
                      {
                        type: 'div',
                        props: {
                          style: {
                            flex: 1,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          },
                          children: [
                            {
                              type: 'div',
                              props: {
                                style: {
                                  width: '100px',
                                  height: '100px',
                                  display: 'flex',
                                  color: '#fbbf24',
                                  borderRadius: '50%',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  fontSize: '32px',
                                  fontWeight: 'bold',
                                  border: '6px solid #fbbf24',
                                },
                                children: 'A',
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  type: 'div',
                  props: {
                    style: {
                      flex: 1,
                      gap: '16px',
                      display: 'flex',
                      padding: '16px',
                      flexDirection: 'column',
                      backgroundColor: '#30363d',
                    },
                    children: [
                      {
                        type: 'div',
                        props: {
                          style: {
                            fontSize: '18px',
                            fontWeight: 700,
                            color: '#e3b341',
                          },
                          children: 'Most Used Languages',
                        },
                      },
                      {
                        type: 'div',
                        props: {
                          style: { height: '10px', display: 'flex' },
                          children: languages.map((lang) => ({
                            type: 'div',
                            props: {
                              style: {
                                width: `${lang.percent}%`,
                                backgroundColor: lang.color,
                              },
                            },
                          })),
                        },
                      },
                      {
                        type: 'div',
                        props: {
                          style: {
                            height: '84px',
                            rowGap: '12px',
                            display: 'flex',
                            flexWrap: 'wrap',
                            flexDirection: 'column',
                          },
                          children: languages.map((lang) => ({
                            type: 'div',
                            props: {
                              style: {
                                gap: '8px',
                                width: '50%',
                                height: '20px',
                                display: 'flex',
                                alignItems: 'center',
                              },
                              children: [
                                {
                                  type: 'div',
                                  props: {
                                    style: {
                                      width: '10px',
                                      height: '10px',
                                      borderRadius: '50%',
                                      backgroundColor: lang.color,
                                    },
                                  },
                                },
                                {
                                  type: 'div',
                                  props: {
                                    style: {
                                      fontSize: '12px',
                                      lineHeight: '20px',
                                    },
                                    children: `${lang.name} ${lang.percent}%`,
                                  },
                                },
                              ],
                            },
                          })),
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    } as unknown as ReactNode,
    {
      width: 1000,
      height: 251,
      fonts: [
        { name: 'Inter', weight: 400, data: INTER_REGULAR },
        { name: 'Inter', weight: 700, data: INTER_BOLD },
      ],
    },
  );

  res
    .setHeader('Content-Type', 'image/svg+xml')
    // .setHeader('Cache-Control', 'public, max-age=3600')
    .send(svg);
}
