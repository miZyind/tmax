import vars from './blueprint-vars.json';

const theme = {
  vars,
  sizes: {
    mobileS: '320px',
    mobileM: '375px',
    mobileL: '425px',
    tablet: '768px',
    laptop: '1024px',
    desktop: '2560px',
  },
  clipPaths: {
    hexagon: 'polygon(0 25%, 50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%)',
  },
} as const;

export type Theme = typeof theme;

export default theme;
