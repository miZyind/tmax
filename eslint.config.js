const blueprintjs = require('@blueprintjs/eslint-plugin');

module.exports = [
  ...require('eslint-plugin-mizyind').configs.next,
  {
    plugins: { '@blueprintjs': blueprintjs },
    rules: blueprintjs.configs.recommended.rules,
  },
];
