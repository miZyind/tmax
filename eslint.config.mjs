import { next } from 'eslint-plugin-mizyind';

import blueprintjs from '@blueprintjs/eslint-plugin';
import react from 'eslint-plugin-react';

// eslint-plugin-react@7.37.5 尚未支援 ESLint 10(內部使用已移除的 context.getFilename
// / context.getSourceCode 等 API),載入任何 react/* 規則都會直接 crash。
// 在 upstream(eslint-plugin-mizyind)修正前,先把所有 react/* 規則關閉,
// 讓 Next、TypeScript、import、react-hooks 等其餘規則照常運作。
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
