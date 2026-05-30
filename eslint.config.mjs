import { next } from 'eslint-plugin-mizyind';

import blueprintjs from '@blueprintjs/eslint-plugin';
import react from 'eslint-plugin-react';

// eslint-plugin-react@7.37.5 does not support ESLint 10 yet (it uses the removed context.getFilename
// / context.getSourceCode APIs), so loading any react/* rule crashes outright.
// Until upstream (eslint-plugin-mizyind) fixes it, disable every react/* rule
// so the remaining Next, TypeScript, import and react-hooks rules keep working.
const disabledReactRules = Object.fromEntries(
  Object.keys(react.rules).map((name) => [`react/${name}`, 'off']),
);

export default [
  ...next,
  {
    plugins: { '@blueprintjs': blueprintjs },
    rules: blueprintjs.configs.recommended.rules,
  },
  { rules: disabledReactRules },
];
