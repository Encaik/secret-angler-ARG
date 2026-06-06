## ADDED Requirements

### Requirement: ESLint configuration

The project SHALL have an ESLint flat configuration (`eslint.config.mjs`) that enforces code style consistency across all `.astro`, `.ts`, and `.js` files.

#### Scenario: ESLint runs on all source files

- **WHEN** `pnpm lint` is executed
- **THEN** ESLint checks all files matching `src/**/*.{astro,ts,js}` against the configured rule set
- **THEN** the command exits with code 0 if no violations are found

#### Scenario: ESLint catches console.log in source

- **WHEN** a `.ts` file (excluding `src/scripts/console.ts`) contains `console.log()`
- **THEN** ESLint reports a warning or error for that line

#### Scenario: ESLint handles Astro files

- **WHEN** an `.astro` file with TypeScript frontmatter is linted
- **THEN** the TypeScript code within the frontmatter is validated against the same TS rules as standalone `.ts` files

### Requirement: Prettier integration

The project SHALL have a `.prettierrc` configuration that defines consistent formatting rules, integrated with ESLint via `eslint-config-prettier` to avoid conflicting rules.

#### Scenario: Prettier formats all file types

- **WHEN** `pnpm format` is executed
- **THEN** Prettier formats all `src/**/*.{astro,ts,css,json,md}` files according to `.prettierrc`

#### Scenario: No ESLint-Prettier conflicts

- **WHEN** ESLint and Prettier both run on the same file
- **THEN** no rule conflict is reported (e.g., ESLint does not enforce indent when Prettier handles it)

### Requirement: Lint scripts in package.json

The project SHALL have `lint`, `lint:fix`, and `format` scripts defined in `package.json`.

#### Scenario: Developer runs lint check

- **WHEN** `pnpm lint` is executed
- **THEN** both ESLint and `astro check` are run
- **THEN** the combined exit code reflects whether any violations or type errors exist

#### Scenario: Developer auto-fixes lint issues

- **WHEN** `pnpm lint:fix` is executed
- **THEN** ESLint auto-fixes all fixable violations and reports remaining unfixable issues

### Requirement: Dev dependencies declared

All tools required for code quality SHALL be declared in `devDependencies` with pinned or compatible version ranges.

#### Scenario: Fresh install works

- **WHEN** `pnpm install` is run on a clean checkout
- **THEN** `eslint`, `prettier`, `eslint-plugin-astro`, `@typescript-eslint/parser`, and `eslint-config-prettier` are installed and functional
