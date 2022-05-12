import useSWR from 'swr';

import type { NextApiHandler } from 'next';
import type { Changelog } from '#utils/model';

// Import { CHANGELOG_TRACING_LIST } from '#utils/constant';

const STATIC_DATA = [
  {
    name: 'husky',
    releases: [
      {
        id: 66351739,
        url: 'https://api.github.com/repos/typicode/husky/releases/66351739',
        tag_name: 'v8.0.1',
        published_at: '2022-05-09T09:53:13Z',
        body: '* fix: use POSIX equality operator ',
      },
      {
        id: 66324291,
        url: 'https://api.github.com/repos/typicode/husky/releases/66324291',
        tag_name: 'v8.0.0',
        published_at: '2022-05-08T21:38:48Z',
        body: "## What's Changed\r\n\r\n### Feats\r\n* feat: add `husky -` prefix to logged global error messages by @joshbalfour in https://github.com/typicode/husky/pull/1092\r\n* feat: show `PATH` when command not found to improve debuggability\r\n* feat: drop Node 12 support\r\n* feat: skip install if `$HUSKY=0`\r\n\r\n### Fixes\r\n* fix: hook script use `/usr/bin/env sh` instead of direct path of `sh` by @skhaz in https://github.com/typicode/husky/pull/1051\r\n* fix: actually set 'husky_skip_init' as readonly in `./husky.sh` by @hyperupcall in https://github.com/typicode/husky/pull/1104\r\n* fix: force `basename`/`dirname` to treat `$0` as an argument by @mataha in https://github.com/typicode/husky/pull/1132\r\n* fix: remove `git.io` links by @renbaoshuo in https://github.com/typicode/husky/pull/1136\r\n\r\n### Docs\r\n* docs: fix uninstall via npm by @pddpd in https://github.com/typicode/husky/pull/1033\r\n* docs: add dog emoji as favicon by @jamiehaywood in https://github.com/typicode/husky/pull/1095\r\n* docs: replace deprecated `npx --no-install` option with `npx --no` by @sibiraj-s in https://github.com/typicode/husky/pull/1070\r\n* docs: add `pnpm` installation by @MohamadKh75 in https://github.com/typicode/husky/pull/1139\r\n\r\n### Chore\r\n* chore: update workflows by @tiziodcaio in https://github.com/typicode/husky/pull/1125\r\n\r\n",
      },
      {
        id: 51754542,
        url: 'https://api.github.com/repos/typicode/husky/releases/51754542',
        tag_name: 'v7.0.4',
        published_at: '2021-10-21T02:26:12Z',
        body: '_No changes. Husky v7.0.3 was reverted, this version is the same as v7.0.2._',
      },
      {
        id: 48392722,
        url: 'https://api.github.com/repos/typicode/husky/releases/48392722',
        tag_name: 'v7.0.2',
        published_at: '2021-08-25T01:24:15Z',
        body: 'Fix pre-commit hook in WebStorm (#1023)',
      },
      {
        id: 45763233,
        url: 'https://api.github.com/repos/typicode/husky/releases/45763233',
        tag_name: 'v7.0.1',
        published_at: '2021-07-06T11:04:21Z',
        body: '- Fix gracefully fail if Git command is not found #1003 (same as in v6)',
      },
    ],
  },
  {
    name: 'eslint',
    releases: [
      {
        id: 66269196,
        url: 'https://api.github.com/repos/eslint/eslint/releases/66269196',
        tag_name: 'v8.15.0',
        published_at: '2022-05-06T21:25:44Z',
        body: '## Features\n* [`ab37d3b`](https://github.com/eslint/eslint/commit/ab37d3ba302856007beb833c34b56658a34bbb5d) feat: add `enforceInClassFields` option to no-underscore-dangle (#15818) (Roberto Cestari)\n\n## Bug Fixes\n* [`8bf9440`](https://github.com/eslint/eslint/commit/8bf9440ac47907ffd27aba095428908e7ddeae8a) fix: "use strict" should not trigger strict mode in ES3 (#15846) (Milos Djermanovic)\n\n## Documentation\n* [`28116cc`](https://github.com/eslint/eslint/commit/28116ccce4b99da3d5aa9b8994dd3652df7b1cab) docs: update AST node names link in no-restricted-syntax (#15843) (Milos Djermanovic)\n* [`272965f`](https://github.com/eslint/eslint/commit/272965feda8adfbf5bfa0e01b37df27ce70fc9fd) docs: fix h1 heading on formatters page (#15834) (Milos Djermanovic)\n* [`a798166`](https://github.com/eslint/eslint/commit/a7981669fffe33deaf4fbe295f660edc8ccad4cd) docs: update example for running individual rule tests (#15833) (Milos Djermanovic)\n* [`57e732b`](https://github.com/eslint/eslint/commit/57e732be4e349470fad3e3cc44d96bf0746a598b) docs: mark `SourceCode#getJSDocComment` deprecated in working-with-rules (#15829) (Milos Djermanovic)\n* [`9a90abf`](https://github.com/eslint/eslint/commit/9a90abf59e31247c03a24ca789cd6157504f63ed) docs: update docs directory in working-with-rules (#15830) (Milos Djermanovic)\n* [`810adda`](https://github.com/eslint/eslint/commit/810addac9b958c03d69f5f8f21d47ff7fb4c5db6) docs: add more examples for prefer-object-spread (#15831) (coderaiser)\n* [`06b1edb`](https://github.com/eslint/eslint/commit/06b1edb68f251558601bf68d47e6bbde693089c9) docs: clarify no-control-regex rule (#15808) (Milos Djermanovic)\n* [`9ecd42f`](https://github.com/eslint/eslint/commit/9ecd42f36462331a0d697e74323a4d24f0cf02fc) docs: Fixed typo in code comment (#15812) (Addison G)\n* [`de992b7`](https://github.com/eslint/eslint/commit/de992b7016e3d91092de7748f0375943ad2c77f0) docs: remove links to 2fa document (#15804) (Milos Djermanovic)\n* [`5222659`](https://github.com/eslint/eslint/commit/52226593974fc7fcb60f1be73b165863b3d1a7fb) docs: fix \'Related Rules\' heading in no-constant-binary-expression (#15799) (Milos Djermanovic)\n* [`e70ae81`](https://github.com/eslint/eslint/commit/e70ae8116256e5b69c6eac1ed71c0fa33a8e6d7a) docs: Update README team and sponsors (ESLint Jenkins)\n\n## Chores\n* [`1ba6a92`](https://github.com/eslint/eslint/commit/1ba6a926eedcfe725900ed95cf029cff02d0355a) chore: upgrade @eslint/eslintrc@1.2.3 (#15847) (Milos Djermanovic)\n* [`8167aa7`](https://github.com/eslint/eslint/commit/8167aa7d43d00f1a0e8400f73c0dd66798fd4c56) chore: bump version of minimatch due to security issue PRISMA-2022-0039 (#15774) (Jan Opravil)\n* [`b8995a4`](https://github.com/eslint/eslint/commit/b8995a40087f3a1e4e87c239951f91ddaac73571) chore: Implement docs site (#15815) (Nicholas C. Zakas)\n* [`6494e3e`](https://github.com/eslint/eslint/commit/6494e3e8916f0a07226bdd8c8f6b2c5f0884bf6b) chore: update link in `codeql-analysis.yml` (#15817) (Milos Djermanovic)\n* [`36503ec`](https://github.com/eslint/eslint/commit/36503ec8b6fca292be8e584792fc2ad056df4d2f) chore: enable no-constant-binary-expression in eslint-config-eslint (#15807) (唯然)',
      },
      {
        id: 65118873,
        url: 'https://api.github.com/repos/eslint/eslint/releases/65118873',
        tag_name: 'v8.14.0',
        published_at: '2022-04-22T20:39:48Z',
        body: '## Features\n* [`ab6363d`](https://github.com/eslint/eslint/commit/ab6363dffb9dfd9c6a9abb5292fc712745fe7a64) feat: Add rule no-constant-binary-expression (#15296) (Jordan Eldredge)\n\n## Bug Fixes\n* [`35fa1dd`](https://github.com/eslint/eslint/commit/35fa1dd8932ef3e55c37ec0e4b73b5d88f187e69) fix: allow project paths to have URL-encoded characters (#15795) (Milos Djermanovic)\n* [`413f1d5`](https://github.com/eslint/eslint/commit/413f1d55f0ad05b6fe75bdde6df423253806797d) fix: update `astUtils.isDirectiveComment` with `globals` and `exported` (#15775) (Milos Djermanovic)\n\n## Build Related\n* [`c2407e8`](https://github.com/eslint/eslint/commit/c2407e81caf2d50325d9aa09bae70d38615ddf2c) build: add node v18 (#15791) (唯然)\n\n## Chores\n* [`735458c`](https://github.com/eslint/eslint/commit/735458cc96d4ecdb4ed97448b63ed4a579890b13) chore: add static frontmatter to no-constant-binary-expression docs (#15798) (Milos Djermanovic)\n* [`db28f2c`](https://github.com/eslint/eslint/commit/db28f2c9ea6b654f615daf2f7e6f1a2034b85062) chore: Add static frontmatter to docs (#15782) (Nicholas C. Zakas)\n* [`3bca59e`](https://github.com/eslint/eslint/commit/3bca59e30de73fb82d4def262ae1df72089df80d) chore: markdownlint autofix on commit (#15783) (Nicholas C. Zakas)',
      },
      {
        id: 64007958,
        url: 'https://api.github.com/repos/eslint/eslint/releases/64007958',
        tag_name: 'v8.13.0',
        published_at: '2022-04-08T21:27:57Z',
        body: '## Features\n* [`274acbd`](https://github.com/eslint/eslint/commit/274acbd56537f6b8199da1ac9e7bced74ae81b56) feat: fix no-eval logic for `this` in arrow functions (#15755) (Milos Djermanovic)\n\n## Bug Fixes\n* [`97b57ae`](https://github.com/eslint/eslint/commit/97b57ae3ebae9150456f5516c64b6d2ba75b4038) fix: invalid operator in operator-assignment messages (#15759) (Milos Djermanovic)\n\n## Documentation\n* [`c32482e`](https://github.com/eslint/eslint/commit/c32482e4fd4ad09f3d5fd960dc1fb7c1b4e56f23) docs: Typo in space-infix-ops docs  (#15754) (kmin-jeong)\n* [`f2c2d35`](https://github.com/eslint/eslint/commit/f2c2d350425268efa4b78ee6e0a2df8860e0efad) docs: disambiguate types `FormatterFunction` and `LoadedFormatter` (#15727) (Francesco Trotta)\n\n## Chores\n* [`bb4c0d5`](https://github.com/eslint/eslint/commit/bb4c0d530a231a8a14ed70ad61c06e284bbaaef0) chore: Refactor docs to work with docs.eslint.org (#15744) (Nicholas C. Zakas)\n* [`d36f12f`](https://github.com/eslint/eslint/commit/d36f12f71b3e4f9e9552f1054d7a75be4dc03671) chore: remove `lib/init` from eslint config (#15748) (Milos Djermanovic)\n* [`a59a4e6`](https://github.com/eslint/eslint/commit/a59a4e6e9217b3cc503c0a702b9e3b02b20b980d) chore: replace `trimLeft`/`trimRight` with `trimStart`/`trimEnd` (#15750) (Milos Djermanovic)',
      },
      {
        id: 62821479,
        url: 'https://api.github.com/repos/eslint/eslint/releases/62821479',
        tag_name: 'v8.12.0',
        published_at: '2022-03-25T22:31:44Z',
        body: '## Features\n* [`685a67a`](https://github.com/eslint/eslint/commit/685a67a62bdea19ca9ce12008a034b8d31162422) feat: fix logic for top-level `this` in no-invalid-this and no-eval (#15712) (Milos Djermanovic)\n\n## Chores\n* [`18f5e05`](https://github.com/eslint/eslint/commit/18f5e05bce10503186989d81ca484abb185a2c9d) chore: padding-line-between-statements remove useless `additionalItems` (#15706) (Martin Sadovy)',
      },
      {
        id: 61648516,
        url: 'https://api.github.com/repos/eslint/eslint/releases/61648516',
        tag_name: 'v8.11.0',
        published_at: '2022-03-11T22:28:14Z',
        body: '## Features\n* [`800bd25`](https://github.com/eslint/eslint/commit/800bd258e4484de24323809ebbf13fc72fcbabac) feat: add `destructuredArrayIgnorePattern` option in `no-unused-vars` (#15649) (Nitin Kumar)\n* [`8933fe7`](https://github.com/eslint/eslint/commit/8933fe7afcc7cdd99cc0efccc08e8fe3a5e2996f) feat: Catch `undefined` and `Boolean()` in no-constant-condition (#15613) (Jordan Eldredge)\n* [`f90fd9d`](https://github.com/eslint/eslint/commit/f90fd9d779a5b28dfd15ca3f993e6b3cd09e71e8) feat: Add ESLint favicon to the HTML report document (#15671) (Mahdi Hosseinzadeh)\n* [`57b8a57`](https://github.com/eslint/eslint/commit/57b8a57be75ed2379fe39c93168175090dfe4cdd) feat: `valid-typeof` always ban `undefined` (#15635) (Zzzen)\n\n## Bug Fixes\n* [`6814922`](https://github.com/eslint/eslint/commit/68149221637faa8e4f2718773e751126b7ae8ac9) fix: escaping for square brackets in ignore patterns (#15666) (Milos Djermanovic)\n* [`c178ce7`](https://github.com/eslint/eslint/commit/c178ce7044b5c19db2f4aabfdbe58003db5062fd) fix: extend the autofix range in comma-dangle to ensure the last element (#15669) (Milos Djermanovic)\n\n## Documentation\n* [`c481cec`](https://github.com/eslint/eslint/commit/c481cecacc728618832b4044374e445d332b4381) docs: add fast-eslint-8 to atom integrations (userguide) (#15695) (db developer)\n* [`d2255db`](https://github.com/eslint/eslint/commit/d2255db24526de604b4a34e90c870158c4ea277e) docs: Add clarification about `eslint-enable` (#15680) (dosisod)\n* [`8b9433c`](https://github.com/eslint/eslint/commit/8b9433c90c842d8ec06f633df7fbba6ac6d5036b) docs: add object pattern to first section of computed-property-spacing (#15679) (Milos Djermanovic)\n* [`de800c3`](https://github.com/eslint/eslint/commit/de800c3c0b8e3f85921b40eaa97134fef12effa2) docs: link to minimatch docs added.  (#15688) (Gaurav Tewari)\n* [`8f675b1`](https://github.com/eslint/eslint/commit/8f675b1f7f6c0591abe36c20410d226bd9e1faa6) docs: sort-imports add single named import example (#15675) (Arye Eidelman)\n\n## Chores\n* [`385c9ad`](https://github.com/eslint/eslint/commit/385c9ad685b24b1821ec4085596b3aad299fb751) chore: rm trailing space in docs (#15689) (唯然)',
      },
    ],
  },
];

export const useChangelogs = () =>
  useSWR<Changelog[]>('/api/get-changelogs').data;

const handler: NextApiHandler = (_, res) => {
  /*
   * Const data = await Promise.all(
   *   CHANGELOG_TRACING_LIST.map(async (repo) => {
   *     const [, name] = repo.split('/');
   *     const response = await fetch(
   *       `https://api.github.com/repos/${repo}/releases?per_page=5`,
   *     );
   */

  /*
   *     Return {
   *       name,
   *       releases: (await response.json()) as Changelog['releases'],
   *     };
   *   }),
   * );
   */

  res.json(STATIC_DATA);
};

export default handler;
