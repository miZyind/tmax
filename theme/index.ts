import vars from './blueprint-vars.json';

const theme = {
  vars,
  queries: {
    mobileS: '@media (max-width: 320px)',
    mobileM: '@media (max-width: 375px)',
    mobileL: '@media (max-width: 425px)',
    tablet: '@media (max-width: 768px)',
    laptop: '@media (max-width: 1024px)',
    desktop: '@media (max-width: 2560px)',
  },
  clipPaths: {
    hexagon: 'polygon(0 25%, 50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%)',
  },
} as const;

export type Theme = typeof theme;

export default theme;
