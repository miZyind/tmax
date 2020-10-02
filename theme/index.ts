import vars from './blueprint-vars.json';

const theme = {
  vars,
  hexagon: 'polygon(0 25%, 50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%)',
};

export type Theme = typeof theme;

export default theme;
