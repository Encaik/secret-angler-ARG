# CSS Modularization

**Purpose**: Organize CSS by responsibility into multiple files (global, layout, components, utilities) to improve maintainability over a single monolithic stylesheet, while preserving visual consistency across all 75 static pages.

## ADDED Requirements

### Requirement: CSS file modularization

The project SHALL have CSS organized into at least 4 files under `src/styles/` by responsibility, replacing the single monolithic `global.css` (559 lines).

#### Scenario: CSS files exist and are imported

- **WHEN** `pnpm build` completes successfully
- **THEN** `src/styles/global.css` contains CSS variables, reset, fonts, and base typography only
- **THEN** `src/styles/layout.css` contains navigation, footer, grid, and container classes
- **THEN** `src/styles/components.css` contains reusable component styles (search, cards, pagination, avatars)
- **THEN** `src/styles/utilities.css` contains utility classes (spacing, alignment, visibility)
- **THEN** all CSS files are imported in `Layout.astro` and `HiddenLayout.astro`

#### Scenario: No visual regression

- **WHEN** the CSS is modularized and the site is built
- **THEN** all 75 pages render identically to pre-modularization output (visual snapshot comparison)
- **THEN** no layout shifts or style breakages occur on any page

#### Scenario: CSS variable loading order preserved

- **WHEN** any page is built
- **THEN** `global.css` (containing CSS variables) appears before `layout.css`, `components.css`, and `utilities.css` in the `<head>` to ensure variable availability

### Requirement: Inline style elimination

All existing inline `<style>` blocks in `.astro` files SHALL be either migrated to the appropriate global CSS file or confirmed as intentional page-specific scoped styles.

#### Scenario: No unnecessary inline styles

- **WHEN** the build completes
- **THEN** no page contains a `<style>` block whose rules could be expressed as reusable global classes
- **THEN** any remaining `<style>` blocks are Astro scoped styles with component-specific selectors or are explicitly documented as intentional

#### Scenario: Component styles centralized

- **WHEN** a visual pattern (e.g., card, badge, button variant) appears on 3 or more pages
- **THEN** that pattern's styles reside in `components.css`, not in page-level `<style>` blocks
