import useSWR from 'swr';

import Config from '#utils/config';
import { CHANGELOG_TRACKING_LIST } from '#utils/constant';

import type { NextApiHandler } from 'next';
import type { Changelog } from '#utils/model';

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
        id: 67435941,
        url: 'https://api.github.com/repos/eslint/eslint/releases/67435941',
        tag_name: 'v8.16.0',
        published_at: '2022-05-20T22:38:17Z',
        body: "## Features\n* [`cab0c22`](https://github.com/eslint/eslint/commit/cab0c2287e12561d869dfcfcd1c4e14c9d6d70d5) feat: add Unicode flag suggestion in no-misleading-character-class (#15867) (Milos Djermanovic)\n* [`38ae956`](https://github.com/eslint/eslint/commit/38ae9564a41e1d38adad55976565d85c5c981e1d) feat: check Unicode code point escapes in no-control-regex (#15862) (Milos Djermanovic)\n* [`ee69cd3`](https://github.com/eslint/eslint/commit/ee69cd30b3551b3adebfd959a44a9a149221946a) feat: Update global variables (#15871) (Sébastien Règne)\n\n## Bug Fixes\n* [`3f09aab`](https://github.com/eslint/eslint/commit/3f09aab709980ca974b721de474be2dd183409a2) fix: function-paren-newline crash on \"new new Foo();\" (#15850) (coderaiser)\n\n## Documentation\n* [`050d5f4`](https://github.com/eslint/eslint/commit/050d5f4e0456ae9a9d769f4306bc0d60058b0898) docs: Static further reading links (#15890) (Nicholas C. Zakas)\n* [`36287c0`](https://github.com/eslint/eslint/commit/36287c00d56596fbb2672cfe3f9b9dd24b2926da) docs: fix absolute paths in related rules shortcode to work from /docs (#15892) (Milos Djermanovic)\n* [`90b6990`](https://github.com/eslint/eslint/commit/90b69901efd265fd11425540928793f1387095cc) docs: fix absolute links in rule macro to work from /docs (#15891) (Milos Djermanovic)\n* [`f437249`](https://github.com/eslint/eslint/commit/f437249a3bedb47155d33ac753b821ae31b814fa) docs: Adjust docs site path prefix (#15889) (Nicholas C. Zakas)\n* [`6e16025`](https://github.com/eslint/eslint/commit/6e16025e8fbffa0e1d0c977cb4b6eae30a502d9b) docs: update 'Related Rules' and 'Further Reading' in remaining rules (#15884) (Milos Djermanovic)\n* [`1d39f69`](https://github.com/eslint/eslint/commit/1d39f698a22e2995bbfcf90b6dafd196a173092a) docs: remove confusing examples for no-mixed-operators (#15875) (Milos Djermanovic)\n* [`3071d76`](https://github.com/eslint/eslint/commit/3071d76772c002bd7b03053be5be54da52c01242) docs: Fix some grammar issues (#15837) (byodian)\n\n## Chores\n* [`1768d0d`](https://github.com/eslint/eslint/commit/1768d0de58e10046ed3e54f0fa52be48ba41f12b) chore: upgrade @eslint/eslintrc@1.3.0 (#15903) (Milos Djermanovic)\n* [`c686e4c`](https://github.com/eslint/eslint/commit/c686e4c4a04525118f5585fd76bdba59dddf3a97) chore: Add deploy workflow for docs site (#15894) (Nicholas C. Zakas)\n* [`c7894cd`](https://github.com/eslint/eslint/commit/c7894cd433319e09b10a80b260a5398dac0d5dab) chore: enable some rules from eslint-plugin-unicorn internally (#15878) (Bryan Mishkin)\n* [`ea65cb5`](https://github.com/eslint/eslint/commit/ea65cb5435162ad29559d175e68f5b6d97e6cdcc) chore: upgrade eslint-plugin-eslint-plugin@^4.2.0 (#15882) (唯然)\n* [`cc29c69`](https://github.com/eslint/eslint/commit/cc29c696a08430fcbf202482306b8c3dbccc0257) chore: Upgrade official GitHub actions to latest versions (#15880) (Darius Dzien)\n* [`5891c75`](https://github.com/eslint/eslint/commit/5891c7533f500110129fdea7b9b63c8a409da0bd) chore: Refactor rule docs format (#15869) (Nicholas C. Zakas)",
      },
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
    ],
  },
  {
    name: 'commitlint',
    releases: [
      {
        id: 67762308,
        url: 'https://api.github.com/repos/conventional-changelog/commitlint/releases/67762308',
        tag_name: 'v17.0.1',
        published_at: '2022-05-25T05:53:20Z',
        body: '# [17.0.1](https://github.com/conventional-changelog/commitlint/compare/v17.0.0...v17.0.1) (2022-05-25)\r\n\r\n### Bug Fixes\r\n\r\n* **cli:** use `core.commentChar` from git config with `--edit` flag ([#3191](https://github.com/conventional-changelog/commitlint/issues/3191)) ([e5fee05](https://github.com/conventional-changelog/commitlint/commit/e5fee05301ab7441b6091e4ee6fc095d26bbd589)), closes [#3190](https://github.com/conventional-changelog/commitlint/issues/3190) [#3190](https://github.com/conventional-changelog/commitlint/issues/3190) [#3190](https://github.com/conventional-changelog/commitlint/issues/3190)\r\n\r\n## New Contributors\r\n* @jscheid made their first contribution in https://github.com/conventional-changelog/commitlint/pull/3191\r\n\r\n**Full Changelog**: https://github.com/conventional-changelog/commitlint/compare/v17.0.0...v17.0.1',
      },
      {
        id: 66948550,
        url: 'https://api.github.com/repos/conventional-changelog/commitlint/releases/66948550',
        tag_name: 'v17.0.0',
        published_at: '2022-05-16T10:37:57Z',
        body: '# [17.0.0](https://github.com/conventional-changelog/commitlint/compare/v16.3.0...v17.0.0) (2022-05-16)\r\n\r\n\r\n### Bug Fixes\r\n\r\n* update dependency yargs to v17.5.1 ([#3183](https://github.com/conventional-changelog/commitlint/issues/3183)) ([8db72f0](https://github.com/conventional-changelog/commitlint/commit/8db72f09e5e4e6a82e43246322cbd42d82d10bb6))\r\n\r\n\r\n* chore!: minimum node version v14 (#3128) ([ac5f9b4](https://github.com/conventional-changelog/commitlint/commit/ac5f9b47a9e3cd5c9d58b14da0feb426f06b1ef9)), closes [#3128](https://github.com/conventional-changelog/commitlint/issues/3128)\r\n\r\n\r\n### BREAKING CHANGES\r\n\r\n* drop node v12 support\r\n\r\n* chore: rename circleci windows job\r\n\r\n* Migrate @nrwl/tao to nx following 13.9.0 release by @fguitton in https://github.com/conventional-changelog/commitlint/pull/3135\r\n\r\n## New Contributors\r\n* @lxow456 made their first contribution in https://github.com/conventional-changelog/commitlint/pull/3179\r\n\r\n**Full Changelog**: https://github.com/conventional-changelog/commitlint/compare/v16.3.0...v17.0.0',
      },
      {
        id: 66872362,
        url: 'https://api.github.com/repos/conventional-changelog/commitlint/releases/66872362',
        tag_name: 'v16.3.0',
        published_at: '2022-05-14T08:26:31Z',
        body: '# [16.3.0](https://github.com/conventional-changelog/commitlint/compare/v16.2.4...v16.3.0) (2022-05-14)\r\n\r\n\r\n### Bug Fixes\r\n\r\n* update dependency cosmiconfig-typescript-loader to v2 ([#3154](https://github.com/conventional-changelog/commitlint/issues/3154)) ([20122e8](https://github.com/conventional-changelog/commitlint/commit/20122e8d6e999b74eab3bab08a6d52cda3f13e37))\r\n* update dependency yargs to v17.5.0 ([#3171](https://github.com/conventional-changelog/commitlint/issues/3171)) ([0e6542b](https://github.com/conventional-changelog/commitlint/commit/0e6542bd0a0d193d0080809fc23031ad83b8e2d9))\r\n\r\n\r\n### Features\r\n\r\n* add ability to filter Nx projects in @commitlint/config-nx-scopes ([#3155](https://github.com/conventional-changelog/commitlint/issues/3155)) ([e595693](https://github.com/conventional-changelog/commitlint/commit/e595693eb9be51a874cff01580b883982083ba0e)), closes [#3152](https://github.com/conventional-changelog/commitlint/issues/3152)\r\n\r\n\r\n\r\n\r\n## New Contributors\r\n* @jaytavares made their first contribution in https://github.com/conventional-changelog/commitlint/pull/3155\r\n* @matthewborgman made their first contribution in https://github.com/conventional-changelog/commitlint/pull/3173\r\n\r\n**Full Changelog**: https://github.com/conventional-changelog/commitlint/compare/v16.2.4...v16.3.0',
      },
      {
        id: 65527516,
        url: 'https://api.github.com/repos/conventional-changelog/commitlint/releases/65527516',
        tag_name: 'v16.2.4',
        published_at: '2022-04-28T01:53:00Z',
        body: '## [16.2.4](https://github.com/conventional-changelog/commitlint/compare/v16.2.3...v16.2.4) (2022-04-28)\r\n\r\n### Bug Fixes\r\n\r\n* **rules:** footer-leading-blank should work with body comments ([#3139](https://github.com/conventional-changelog/commitlint/issues/3139)) ([7dd88c9](https://github.com/conventional-changelog/commitlint/commit/7dd88c913cba9f444acc587c77210cb718c928c9))\r\n* update dependency cosmiconfig to v7.0.1 ([#3138](https://github.com/conventional-changelog/commitlint/issues/3138)) ([407837d](https://github.com/conventional-changelog/commitlint/commit/407837df9e5cfe3af06158a4684f95ff590000cb))\r\n* update dependency cosmiconfig-typescript-loader to v1.0.7 ([#3102](https://github.com/conventional-changelog/commitlint/issues/3102)) ([d0f2b3f](https://github.com/conventional-changelog/commitlint/commit/d0f2b3fe0f4b3bd2658efdde6d728bdacbc79557))\r\n* update dependency cosmiconfig-typescript-loader to v1.0.9 ([#3106](https://github.com/conventional-changelog/commitlint/issues/3106)) ([d91e70d](https://github.com/conventional-changelog/commitlint/commit/d91e70db61554e906851c66de1b4cb867eccb916))\r\n* update dependency fs-extra to v10.1.0 ([#3124](https://github.com/conventional-changelog/commitlint/issues/3124)) ([482613f](https://github.com/conventional-changelog/commitlint/commit/482613f4bf0de1d81a5ecda4ea9965165cd78120))\r\n* update dependency semver to v7.3.6 ([#3112](https://github.com/conventional-changelog/commitlint/issues/3112)) ([ad886fd](https://github.com/conventional-changelog/commitlint/commit/ad886fd7ea46bc2df346099f9d4f10defd51fe75))\r\n* update dependency semver to v7.3.7 ([#3119](https://github.com/conventional-changelog/commitlint/issues/3119)) ([c9c49b2](https://github.com/conventional-changelog/commitlint/commit/c9c49b2de935528d84a817de750cd65b8f765c48))\r\n* update dependency yargs to v17.4.0 ([#3080](https://github.com/conventional-changelog/commitlint/issues/3080)) ([1477d7c](https://github.com/conventional-changelog/commitlint/commit/1477d7c0de15000f0881329f177476082fee2067))\r\n* update dependency yargs to v17.4.1 ([#3116](https://github.com/conventional-changelog/commitlint/issues/3116)) ([69bf135](https://github.com/conventional-changelog/commitlint/commit/69bf135d69abb0e871ae7d1b6c76a5f343899edc))\r\n\r\n## New Contributors\r\n* @ddsultan made their first contribution in https://github.com/conventional-changelog/commitlint/pull/3084\r\n* @sd-godaddy made their first contribution in https://github.com/conventional-changelog/commitlint/pull/3113\r\n* @SukkaW made their first contribution in https://github.com/conventional-changelog/commitlint/pull/3146\r\n* @wtho made their first contribution in https://github.com/conventional-changelog/commitlint/pull/3139\r\n\r\n**Full Changelog**: https://github.com/conventional-changelog/commitlint/compare/v16.2.3...v16.2.4',
      },
      {
        id: 61957740,
        url: 'https://api.github.com/repos/conventional-changelog/commitlint/releases/61957740',
        tag_name: 'v16.2.3',
        published_at: '2022-03-16T03:51:01Z',
        body: '## [16.2.3](https://github.com/conventional-changelog/commitlint/compare/v16.2.2...v16.2.3) (2022-03-16)\r\n\r\n### Bug Fixes\r\n\r\n* update dependency @types/fs-extra to v9.0.13 ([#3054](https://github.com/conventional-changelog/commitlint/issues/3054)) ([4c7dd7c](https://github.com/conventional-changelog/commitlint/commit/4c7dd7c32f89f3187f9f655c8170d35b6be8f90a))\r\n* update dependency cosmiconfig-typescript-loader to v1.0.6 ([#3059](https://github.com/conventional-changelog/commitlint/issues/3059)) ([256e194](https://github.com/conventional-changelog/commitlint/commit/256e194cbe8ed773ed9d966fa06f9531a6bc4d37))\r\n* update dependency fs-extra to v10.0.1 ([#3041](https://github.com/conventional-changelog/commitlint/issues/3041)) ([1236c83](https://github.com/conventional-changelog/commitlint/commit/1236c8388bb9b684cdfe41577b90cc5eaa852a47))\r\n* update dependency git-raw-commits to v2.0.11 ([#3055](https://github.com/conventional-changelog/commitlint/issues/3055)) ([d5089f1](https://github.com/conventional-changelog/commitlint/commit/d5089f1ce211592bc9315c03ad79183f142b7f1b))\r\n\r\n## New Contributors\r\n* @zetaraku made their first contribution in https://github.com/conventional-changelog/commitlint/pull/3038\r\n* @cotes2020 made their first contribution in https://github.com/conventional-changelog/commitlint/pull/3042\r\n* @hxtmdev made their first contribution in https://github.com/conventional-changelog/commitlint/pull/3066\r\n\r\n**Full Changelog**: https://github.com/conventional-changelog/commitlint/compare/v16.2.2...v16.2.3',
      },
    ],
  },
  {
    name: 'Chart.js',
    releases: [
      {
        id: 59405637,
        url: 'https://api.github.com/repos/chartjs/Chart.js/releases/59405637',
        tag_name: 'v3.8.0',
        published_at: '2022-05-25T14:13:07Z',
        body: "# Essential Links\r\n\r\n* [npm](https://www.npmjs.com/package/chart.js)\r\n* [Migration guide](https://www.chartjs.org/docs/latest/getting-started/v3-migration)\r\n* [Docs](https://www.chartjs.org/docs/latest/)\r\n* [API](https://www.chartjs.org/docs/latest/api/)\r\n* [Samples](https://www.chartjs.org/docs/latest/samples/)\r\n\r\n- #10341 Correct auto.esm.js import to allow module to work in browser\r\n- #10316 Use abs() when comparing for spanGaps\r\n- #10320 Bump async from 2.6.3 to 2.6.4\r\n- #10290 Bump moment from 2.29.1 to 2.29.2\r\n- #10260 Bump minimist from 1.2.5 to 1.2.6\r\n- #10204 Bump karma from 6.3.14 to 6.3.16\r\n- #10200 Bump url-parse from 1.5.7 to 1.5.10\r\n- #10198 Bump prismjs from 1.25.0 to 1.27.0\r\n- #10181 Bump url-parse from 1.5.3 to 1.5.7\r\n- #10146 Bump karma from 6.3.9 to 6.3.14\r\n- #10150 Bump log4js from 6.3.0 to 6.4.1\r\n- #10152 Bump engine.io from 6.1.0 to 6.1.2\r\n- #10151 Bump node-fetch from 2.6.6 to 2.6.7\r\n- #10149 Bump follow-redirects from 1.14.6 to 1.14.8\r\n\r\n## Enhancements\r\n\r\n- #10362 Add option to include invisible points\r\n- #10328 Resolve canvasGradient is undefined in node\r\n- #10293 Enable configuration of radial scale point label border radius\r\n- #10278 Allow time scale to offset using skipped ticks\r\n- #10046 Interaction functions\r\n- #10182 Allow individual chart controllers to opt-in to the decimation plugin\r\n- #10088 Make object notation usable for polarArea and radar\r\n- #10106 Add new align 'inner' for X axis\r\n\r\n## Bugs Fixed\r\n\r\n- #10371 Update to v0.2.1 color dependency to fix bug with invalid colours\r\n- #10340 Update scale polarArea correctly on data hide\r\n- #10289 display tooltips only at points in chart area\r\n- #10328 Resolve canvasGradient is undefined in node\r\n- #10301 Trigger legend onLeave when the mouse leaves the canvas\r\n- #10276 Document tooltip draw hooks and only call hooks when the tooltip draws\r\n- #10157 minimum bar length setting keeps bar base in view\r\n\r\n## Types\r\n\r\n- #10364 Types: Allow font to be partial scriptable and individually scriptable\r\n- #10283 Types: add 'middle' to borderSkipped\r\n- #10275 Export types for cartesian and radial tick options\r\n- #10269 add startAngle to radial scale options typings\r\n- #10254 Add missing fields to the ScriptableContext type\r\n- #10179 Allow array for line opts in dataset\r\n\r\n## Documentation\r\n\r\n- #10308 Add links to docs in all the samples\r\n- #10259 Fix a typo in data-structures.md\r\n- #10266 Correct chart initialization flow\r\n- #10250 Update link to filler plugin\r\n- #10184 Fix broken link in Animations docs page.\r\n- #10158 remove hardcoded licenseYear in docs\r\n- #10156 update link to license and bump license year\r\n- #10154 Document scale update plugin hooks\r\n\r\n## Development\r\n\r\n- #10377 Bump to 3.8.0\r\n- #10247 Resolve circulair import filler plugin\r\n- #10243 Replace deprecated String.prototype.substr()\r\n- #10040 Refactor filler plugin for easier maintenance\r\n\r\nThanks to @CommanderRoot, @LeeLenaleee, @Talla2XLC, @akiraaso, @dependabot, @dependabot[bot], @etimberg, @joshkel, @kurkle, @kylejonesdev, @linkviii, @luke-heberling, @msteiger, @pzelnip, @t-mangoe and @yhvicey\r\n",
      },
      {
        id: 56257623,
        url: 'https://api.github.com/repos/chartjs/Chart.js/releases/56257623',
        tag_name: 'v3.7.1',
        published_at: '2022-02-12T14:51:30Z',
        body: '# Essential Links\r\n\r\n* [npm](https://www.npmjs.com/package/chart.js)\r\n* [Migration guide](https://www.chartjs.org/docs/latest/getting-started/v3-migration)\r\n* [Docs](https://www.chartjs.org/docs/latest/)\r\n* [API](https://www.chartjs.org/docs/latest/api/)\r\n* [Samples](https://www.chartjs.org/docs/latest/samples/)\r\n\r\n## Bugs Fixed\r\n\r\n- #10024 Fix using above/below filling option with discontinuous lines\r\n\r\n## Types\r\n\r\n- #10124 Add missing mouse events to CoreChartOptions.events type\r\n- #10133 Allow spanGaps to be specified on LineOptions\r\n- #10137 Ensure that min/max of TimeScaleOptions can be a string\r\n- #10075 fix: allow colors as array\r\n- #10131 Correct type for updateHoverStyle\r\n- #10130 Type Chart.legend property\r\n- #10111 Change repeating alingment string to single type\r\n- #10078 Move scriptable and array to helper function in types\r\n- #10057 add typing and docs for maxTicksLimit all scales\r\n\r\n## Documentation\r\n\r\n- #10138 Sort docs sub menus alphabetically, add line and plugin sample\r\n- #10100 Sort line and bubble dataset options alphabetically\r\n- #10103 Fix typos found by codespell\r\n- #10057 add typing and docs for maxTicksLimit all scales\r\n- #10045 typo Cofiguration\r\n\r\n## Development\r\n\r\n- #10148 Bump to 3.7.1\r\n- #10117 add SubTitle to TS register test \r\n- #10078 Move scriptable and array to helper function in types\r\n- #10038 Improve issue templates\r\n\r\nThanks to @DimitriPapadopoulos, @LeeLenaleee, @LovelyAndy, @caub, @charlesmass2, @etimberg, @jmorel and @stockiNail\r\n',
      },
      {
        id: 54658024,
        url: 'https://api.github.com/repos/chartjs/Chart.js/releases/54658024',
        tag_name: 'v3.7.0',
        published_at: '2021-12-23T19:06:16Z',
        body: '# Essential Links\r\n\r\n* [npm](https://www.npmjs.com/package/chart.js)\r\n* [Migration guide](https://www.chartjs.org/docs/latest/getting-started/v3-migration)\r\n* [Docs](https://www.chartjs.org/docs/latest/)\r\n* [API](https://www.chartjs.org/docs/latest/api/)\r\n* [Samples](https://www.chartjs.org/docs/latest/samples/)\r\n\r\n## Enhancements\r\n\r\n- #9949 Add centerPointLabels option for linear radial scale\r\n- #9970 Limit active element changes to chartArea\r\n- #9944 Improvements to tooltip positioners\r\n- #9933 add beforeDestroy hook\r\n- #9919 Support "r" axis for non-intersecting interaction\r\n- #9920 Feature/active elements on top\r\n- #9877 Add borderJoinStyle option for arc elements\r\n\r\n## Bugs Fixed\r\n\r\n- #10021 radialLinear: fix positioning \\& scaling\r\n- #10020 radialLinear: fix getIndexAngle when there are no labels (left)\r\n- #10018 radialLinear: Hide pointLabels of hidden data\r\n- #9992 Fix setActiveElements behavior after a mouse event\r\n- #9970 Limit active element changes to chartArea\r\n- #9969 Pass object from array as value to \\_fallback\r\n\r\n## Types\r\n\r\n- #9986 Types/ type suggestedMin and suggestedMax for time scale\r\n- #9985 Types/Allow min-max as string timescale\r\n- #9937 Types/allow for multiline labels in tick callback\r\n\r\n## Documentation\r\n\r\n- #10013 Docs/Add sample for centered point labels\r\n- #9994 Docs/clarify usage of ticks callback (#<!---->9991)\r\n- #9960 Docs/clarify samples \r\n- #9952 Try to improve documentation for new users\r\n\r\n## Development\r\n\r\n- #10011 Bump version to 3.7.0, update deps\r\n\r\nThanks to @LeeLenaleee, @doug-a-brunner, @joshkel, @kurkle, @luukdv and @t-mangoe\r\n',
      },
      {
        id: 54451407,
        url: 'https://api.github.com/repos/chartjs/Chart.js/releases/54451407',
        tag_name: 'v3.6.2',
        published_at: '2021-12-05T13:47:40Z',
        body: '# Essential Links\r\n\r\n* [npm](https://www.npmjs.com/package/chart.js)\r\n* [Migration guide](https://www.chartjs.org/docs/latest/getting-started/v3-migration)\r\n* [Docs](https://www.chartjs.org/docs/latest/)\r\n* [API](https://www.chartjs.org/docs/latest/api/)\r\n* [Samples](https://www.chartjs.org/docs/latest/samples/)\r\n\r\n## Bugs Fixed\r\n\r\n- #9939 Stop modifying options in interaction handlers\r\n- #9938 Fix resolver caching issue when setting values\r\n\r\n## Development\r\n\r\n- #9953 Bump version to 3.6.2\r\n\r\nThanks to @kurkle\r\n',
      },
      {
        id: 51933923,
        url: 'https://api.github.com/repos/chartjs/Chart.js/releases/51933923',
        tag_name: 'v3.6.1',
        published_at: '2021-11-30T18:30:51Z',
        body: '# Essential Links\r\n\r\n* [npm](https://www.npmjs.com/package/chart.js)\r\n* [Migration guide](https://www.chartjs.org/docs/latest/getting-started/v3-migration)\r\n* [Docs](https://www.chartjs.org/docs/latest/)\r\n* [API](https://www.chartjs.org/docs/latest/api/)\r\n* [Samples](https://www.chartjs.org/docs/latest/samples/)\r\n\r\n- #9683 Update stale documentation for axis titles\r\n\r\n## Bugs Fixed\r\n\r\n- #9922 Fix tooltip caret position when it is positioned at the corners\r\n- #9921 Category: Track automatically added labels\r\n- #9915 Chart area boxes receive 0 margin during the final layout process\r\n- #9876 Detect detach/attach in same observation\r\n- #9857 Synchronize data visibility with data changes\r\n- #9871 Fix inRange for full circle arc\r\n- #9872 Configure all datasets before updating any\r\n- #9861 Prevent proxying CanvasGradient in Node platform\r\n- #9855 Fix incomplete TS type for Chart.register + others\r\n- #9831 Pass number format to tooltip\r\n- #9794 Remove scriptability from defaults.font types\r\n\r\n## Types\r\n\r\n- #9917 Add a note about the type parameters of the ChartData type\r\n- #9916 Doughnut chart options have an offset property\r\n- #9858 Types: add autopadding to typing\r\n- #9855 Fix incomplete TS type for Chart.register + others\r\n- #9837 update animation event to include currentStep instead of currentState\r\n- #9834 Types: include initial variable in the AnimationEvent\r\n- #9794 Remove scriptability from defaults.font types\r\n- #9800 Fix object notation border width barchart\r\n\r\n## Documentation\r\n\r\n- #9923 Add notes about more specific options for axes\r\n- #9917 Add a note about the type parameters of the ChartData type\r\n- #9900 Fix a typo in index.md\r\n- #9893 Fix a typo in contributing.md\r\n- #9866 docs: Add a link to front-end integrations\r\n- #9865 Update misleading sample comment\r\n- #9812 Docs/update scale position type\r\n- #9803 Define with let to avoid "assignment to constant" errors\r\n- #9798 New sample: Progressive Line With Easing\r\n- #9791 Update namespace and charts for legend override\r\n- #9787 Add warning about chart types overriding plugin defaults\r\n\r\n## Development\r\n\r\n- #9929 Bump to 3.6.1\r\n\r\nThanks to @LeeLenaleee, @NorthBlue333, @benmccann, @carsonalh, @erictheise, @etimberg, @fishmandev, @igorlukanin and @kurkle\r\n',
      },
    ],
  },
];

export const useChangelogs = () =>
  useSWR<Changelog[]>('/api/get-changelogs').data;

const handler: NextApiHandler = async (_, res) => {
  if (_.body === '') {
    res.json(STATIC_DATA);
  } else {
    const data = await Promise.all(
      CHANGELOG_TRACKING_LIST.map(async (repo) => {
        const [, name] = repo.split('/');
        const response = await fetch(
          `${Config.GH_API_URL}/repos/${repo}/releases?per_page=5`,
        );

        return {
          name,
          releases: (await response.json()) as Changelog['releases'],
        };
      }),
    );

    res.json(data);
  }
};

export default handler;
