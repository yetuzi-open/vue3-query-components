# Repository Guidelines

## Project Structure & Module Organization
This repository is a npm workspace monorepo:

- `packages/components`: core Vue 3 component library (`src/components`, `src/hooks`, `src/types`, `src/utils`), build scripts in `scripts/`, and release notes in `CHANGELOG.md`.
- `packages/docs`: VitePress documentation site with pages in `pages/` and runnable demos in `examples/`.
- Root files: workspace orchestration (`package.json`), shared formatting (`prettier`), and top-level docs (`README.md`).

Use `packages/components/src/components/CommonXxx/` for new components (PascalCase folder names), and export from `src/components/index.ts` plus `src/index.ts`.

## Build, Test, and Development Commands
Run commands at repository root unless noted:

- `npm run dev`: start component watch build and docs dev server in parallel.
- `npm run build`: build component package and docs site.
- `npm run type-check`: run `vue-tsc` for the components package.
- `npm run format`: format `ts/js/vue/json/md` files via Prettier.
- `npm run clean`: remove built artifacts.

Package-level examples:

- `cd packages/components && npm run build:minor`: versioned component build flow.
- `cd packages/docs && npm run dev`: docs-only local development.

## Coding Style & Naming Conventions
- Use TypeScript + Vue SFC (`<script setup lang="ts">`).
- Follow Prettier defaults (2-space indentation, trailing commas where supported).
- Prefer named exports and centralized re-exports through `index.ts`.
- Component directories and component names: `PascalCase` (e.g., `CommonQueryTable`).
- Keep prop/type files explicit (`type.ts`) alongside component implementation.

## Testing Guidelines
There is no dedicated unit test runner in the current workspace. Validation is done through:

1. `npm run type-check`
2. `npm run build`
3. Manual verification in docs demos (`packages/docs/examples`)

When adding behavior, include or update a demo page that reproduces the scenario.

## Commit & Pull Request Guidelines
Git history follows Conventional Commits, commonly:

- `feat: ...`
- `fix: ...`
- `docs: ...`
- `refactor: ...`
- `chore(release): ...`

Keep each commit focused on one logical change. For PRs, include:

1. Clear summary of user-visible impact.
2. Linked issue/task (if available).
3. Screenshots or GIFs for docs/UI changes.
4. Verification notes (type-check/build/manual demo path).
