import { next } from 'eslint-plugin-mizyind';

import blueprintjs from '@blueprintjs/eslint-plugin';

export default [
  ...next,
  {
    plugins: { '@blueprintjs': blueprintjs },
    rules: blueprintjs.configs.recommended.rules,
  },
];
