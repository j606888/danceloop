# Repository Guidelines

## Project Structure & Module Organization
- `src/app`: Next.js app routes and pages.
- `src/features`: Feature-focused UI modules (e.g., `PlaylistDetail`, `VideoUpload`). Keep components colocated with feature logic.
- `src/components`: Reusable, feature-agnostic UI primitives (e.g., `Drawer`).
- `src/store`: Redux Toolkit + RTK Query slices (`src/store/slices/...`).
- `src/lib` and `src/hooks`: Utilities and shared hooks.
- `public`: Static assets.
- `prisma`: Database schema (`schema.prisma`) and migrations.

## Build, Test, and Development Commands
- `yarn dev` — Run the app locally at `http://localhost:3000`.
- `yarn build` — Production build (Next.js).
- `yarn start` — Run the production server.
- `yarn lint` — Lint the codebase with Next/ESLint.
- Prisma: `npx prisma migrate dev` (apply/create dev migrations), `npx prisma studio` (DB UI), `npx prisma generate` (regen client).

## Coding Style & Naming Conventions
- TypeScript-first. Prefer explicit types for public APIs.
- Components: PascalCase filenames and exports (e.g., `ShareDrawer.tsx`). Hooks: `useX` naming.
- State/data access via RTK Query slices under `src/store/slices`.
- TailwindCSS for styles. Favor utility classes; avoid inline styles.
- Linting: follow `eslint.config.mjs` and run `yarn lint` before PRs.

## Testing Guidelines
- No formal test suite configured yet. When adding tests, colocate by feature (e.g., `src/features/X/__tests__`). Prefer React Testing Library for UI and Jest for unit tests. Use descriptive `*.test.ts(x)` names.

## Commit & Pull Request Guidelines
- Commits: imperative tone and scoped subjects (e.g., `playlist: add share drawer link copy`). Group related changes.
- PRs: concise description, screenshots for UI changes, reproduction steps for bug fixes, and link related issues. Keep diffs focused and incremental.

## Security & Configuration Tips
- Store secrets in `.env` (not committed). Required: `DATABASE_URL`, `JWT_SECRET`, Cloudflare/Google keys as applicable.
- Run `postinstall` (automatically) to `prisma generate` after dependency changes.

## Agent-Specific Notes
- Make minimal, focused changes; preserve existing patterns and file structure.
- Prefer feature colocation over global edits. Update related slices/types when touching data flows.
- Avoid adding new dependencies without discussion.
