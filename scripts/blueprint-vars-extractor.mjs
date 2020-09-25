import { writeFileSync } from 'fs';
import { resolve } from 'path';
import sass from 'sass-extract';

const rendered = sass.renderSync(
  { file: 'node_modules/@blueprintjs/core/lib/scss/variables.scss' },
  { plugins: ['serialize'] },
);

const parsed = Object.entries(rendered.vars.global).reduce(
  (styles, [key, { value }]) => {
    styles[key] = value;

    return styles;
  },
  {},
);

const TARGET_FOLDER = 'theme';
const TARGET_FILENAME = 'blueprint-vars.json';

writeFileSync(resolve(TARGET_FOLDER, TARGET_FILENAME), JSON.stringify(parsed));
