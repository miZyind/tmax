import fs from 'fs';
import path from 'path';
import satori from 'satori';

import type { ReactNode } from 'react';

const DATA = {
  width: 800,
  height: 300,
  fonts: [
    {
      name: 'Inter_18pt-Regular',
      data: fs.readFileSync(
        path.join(process.cwd(), 'public/Inter_18pt-Regular.ttf'),
      ),
    },
  ],
};
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
            display: 'flex',
            flex: 1,
            padding: '4px 8px',
            background: '#30363d',
            justifyContent: 'center',
          },
          children: v.name,
        },
      },
      {
        type: 'div',
        props: {
          style: {
            display: 'flex',
            flex: 1,
            padding: '4px 8px',
            background: v.color,
            justifyContent: 'center',
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
    style: { display: 'flex', justifyContent: 'space-between' },
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
          borderRadius: '12px',
          flexDirection: 'column',
          backgroundColor: '#0d1117',
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
                      backgroundColor: '#161b22',
                    },
                    children: [
                      {
                        type: 'div',
                        props: {
                          style: {
                            flex: 1,
                            gap: '12px',
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
                      width: '50%',
                      display: 'flex',
                      padding: '16px',
                      backgroundColor: '#161b22',
                    },
                    children: [
                      {
                        type: 'div',
                        props: {
                          style: {
                            gap: '16px',
                            display: 'flex',
                            flexDirection: 'column',
                          },
                          children: [
                            {
                              type: 'div',
                              props: {
                                style: {
                                  fontSize: '20px',
                                  color: '#e3b341',
                                },
                                children: 'Most Used Languages',
                              },
                            },
                            {
                              type: 'div',
                              props: {
                                style: {
                                  height: '10px',
                                  display: 'flex',
                                },
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
                                  display: 'flex',
                                  flexWrap: 'wrap',
                                  width: '100%',
                                },
                                children: languages.map((lang) => ({
                                  type: 'div',
                                  props: {
                                    style: {
                                      display: 'flex',
                                      alignItems: 'center',
                                      width: '50%',
                                      marginBottom: '12px',
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
                                            marginRight: '8px',
                                          },
                                        },
                                      },
                                      {
                                        type: 'span',
                                        props: {
                                          style: { fontSize: '14px' },
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
          },
        ],
      },
    } as unknown as ReactNode,
    DATA,
  );

  res.setHeader('Content-Type', 'image/svg+xml');
  res.setHeader('Cache-Control', 'public, max-age=3600');

  return res.send(svg);
}
