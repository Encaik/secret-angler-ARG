# CI Pipeline

**Purpose**: Automated quality gates via pre-commit hooks (Husky + lint-staged) and GitHub Actions CI workflow to prevent regressions before they reach the main branch.

## ADDED Requirements

### Requirement: Pre-commit hook with lint-staged

The project SHALL have a pre-commit hook (via Husky) that runs lint-staged on staged files to prevent committing code with obvious issues.

#### Scenario: Pre-commit runs on staged files only

- **WHEN** a developer runs `git commit` with modified `.astro` or `.ts` files staged
- **THEN** lint-staged runs ESLint and Prettier on only the staged files
- **THEN** if violations are found, the commit is blocked with a descriptive error message

#### Scenario: Pre-commit is fast enough for daily use

- **WHEN** a developer commits with <10 staged files
- **THEN** the pre-commit hook completes in under 5 seconds

#### Scenario: Pre-commit can be skipped

- **WHEN** `git commit --no-verify` is used
- **THEN** the pre-commit hook is bypassed
- **THEN** CI serves as the catch-all quality gate

### Requirement: CI workflow

The project SHALL have a GitHub Actions workflow (`.github/workflows/ci.yml`) that runs on push and pull requests to the `main` branch.

#### Scenario: CI passes on clean code

- **WHEN** code is pushed to any branch
- **THEN** the CI workflow runs `pnpm install`, `pnpm lint`, `pnpm test:ci`, and `pnpm build` in sequence
- **THEN** the workflow completes successfully if all steps pass

#### Scenario: CI fails on lint error

- **WHEN** pushed code contains an ESLint violation
- **THEN** the CI workflow fails at the lint step
- **THEN** the failure message includes the specific file and rule violated

#### Scenario: CI fails on test failure

- **WHEN** pushed code contains a failing test
- **THEN** the CI workflow fails at the test step
- **THEN** the failure message includes the specific test and assertion that failed

#### Scenario: CI fails on build error

- **WHEN** pushed code cannot be built by Astro
- **THEN** the CI workflow fails at the build step
- **THEN** the build error is surfaced in the CI log

### Requirement: CI-ready scripts

The project SHALL have `check`, `lint`, `lint:fix`, and `format` scripts defined in `package.json`.

#### Scenario: Full CI check runs locally

- **WHEN** `pnpm check` is executed
- **THEN** it runs `astro check && eslint . && vitest run && astro build` in order
- **THEN** it exits with a non-zero code if any step fails

#### Scenario: CI command matches GitHub Actions

- **WHEN** comparing `pnpm check` output to the GitHub Actions workflow
- **THEN** both execute the same checks in the same order with the same failure criteria
