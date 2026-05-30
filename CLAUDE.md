# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

TMAX ("Turbulent miZyind at Xion") is miZyind's personal website (https://mizyind.dev), a Next.js **Pages Router** app deployed on Netlify. The home page is a hexagonal navigation hub that opens tools/pages and dialogs.

## Commands

```bash
yarn dev     # start dev server (http://localhost:3000)
yarn build   # production build
yarn start   # serve production build
yarn lint    # eslint with --max-warnings 0 (must be clean)
yarn clean   # rm -rf .next
```

- Package manager is **yarn 1.x** (`packageManager: yarn@1.22.22`); Node `>=22`.
- There is **no test framework** in this repo.
- Lint a single file: `yarn eslint path/to/file.tsx --max-warnings 0`.
- Pre-commit (husky + lint-staged) runs eslint on staged `*.{ts,tsx}`; commit messages are enforced by **commitlint (conventional commits)** — use `feat:`, `fix:`, `chore:`, `ci:`, etc.

## Architecture

- **Path aliases** (tsconfig `paths`) — always import via these, never relative paths across dirs:
  `#api/*`, `#component/*`, `#context/*`, `#data/*`, `#icon/*`, `#lib/*`, `#singularity`.
- **Routing** is the Pages Router (`pages/`): `index.tsx` (hexind hub), `changelog-tracker.tsx`, `singularity.tsx` (Unity WebGL game). API routes live in `pages/api/` (`get-changelogs`, `get-prices`, `stats`, `oauth/callback`, `oauth/sign-out`).
- **Provider stack** in `pages/_app.tsx`: `StyleSheetManager` → `ThemeProvider` → `SWRConfig` (global `fetcher` from `#lib/fetcher`) → `BlueprintProvider`. Pages receive `className={Classes.DARK}` (app is dark-themed). `_document.tsx` does SSR collection of styled-components via `ServerStyleSheet`.

### Data fetching
- **Client side**: SWR with the global `fetcher` (typed: `fetcher<T>`). Hit internal `/api/*` routes.
- **Server side**: `getServerSideProps` wrapped in `withPageTransitionDelay` from `#lib/hoc`. This HOC delays the response by `PAGE_TRANSITION_DELAY` (1000ms) before running the optional inner `getServerSideProps`, so the page-transition animation stays visible — wrap any new page's `getServerSideProps` with it for consistency.
- API routes return JSON and integrate external sources: GitHub API (changelogs, stats SVG), and Vietnamese market price feeds (gold + stocks, codes in `Code` enum). `data/stats.json` is the fallback for the stats route.

### Styling
- **styled-components** only (compiler plugin enabled in `next.config.ts`); no CSS files except imported vendor CSS in `_app.tsx`. `shouldForwardProp` is globally `true`.
- Theme lives in `#lib/theme` (responsive `queries` media strings + `paths.hexagon` clip-path); typed via `types/styled-components.d.ts`. Access with `${({ theme }) => theme.queries.tablet}`.
- BlueprintJS (`@blueprintjs/core`) is the UI kit — use its `Classes`/`Colors` constants for style overrides and components (Dialog, Tree, PanelStack, Button, etc.).

### Component conventions
- Components grouped by feature under `component/<feature>/` (e.g. `hexind/`, `dialog-hctk/`, `dialog-analytics/`, `changelog-tracker/`); cross-cutting ones (e.g. `page-transition.tsx`) sit at `component/` root. No shared layout wrapper.
- Common pattern: define the component, then `export default styled(Component)\`...\`` at the file bottom. Props extend the global `StyledProps` (`{ className?: string }`).
- Animations use **GSAP** (hexagons, page transition, Unity loader).

### State, types, cookies
- Two contexts in `context/`: `dialogs.tsx` (`useReducer`, toggles HCTK/ANALYTICS dialogs, can init from `?dialog=` query) and `token.tsx` (GitHub OAuth token, read from cookie).
- Global ambient types in `types/global.d.ts`: `Handler` is a `[req, res]` **tuple** (spread into API handler signatures, with `query: Record<string,string>` and `body: unknown`), plus `StyledProps`. Domain models (`Price`, `Changelog`) in `#lib/model`. App constants/enums (`Code`, `LogoPath`, `CHANGELOG_TRACKING_LIST`, `COOKIE_MAX_AGE`) in `#lib/constant`.
- Cookies via `cookies-next` wrapped in `#lib/cookie` (`Settings` and `Token` keys; `COOKIE_MAX_AGE` = 1 year). Env access is centralized in the flat `Config` object in `#lib/config` (`Config.GA_ID`, `Config.GH_CLIENT_ID`, `Config.GH_TOKEN`, …) — read env there, not via `process.env` directly.

## Environment

Copy `.env.example` → `.env`. Server-only secrets: `GH_CLIENT_SECRET`, `GH_TOKEN`. Public: `NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_GH_CLIENT_ID`, `NEXT_PUBLIC_GH_REDIRECT_URI`. Deploy is Netlify (`netlify.toml`, `@netlify/plugin-nextjs`).
