## ADDED Requirements

### Requirement: Immersion terminology audit

The project SHALL have a documented audit of all game design terminology appearing in visible page content, with each occurrence classified as acceptable, needs-fix, or needs-exemption.

#### Scenario: Audit document exists

- **WHEN** the change is implemented
- **THEN** a file `openspec/changes/project-audit-optimize/content-audit-report.md` exists
- **THEN** it lists every occurrence of game design terminology ("线索", "谜题", "解谜", "触发", "结局", "关卡", etc.) found in visible text
- **THEN** each occurrence has a classification and brief justification

#### Scenario: Fixable terminology is corrected

- **WHEN** an occurrence is classified as "needs-fix"
- **THEN** the page text is updated with a natural alternative that preserves meaning and immersion
- **THEN** the updated text still reads naturally in its claimed context (forum post, internal doc, etc.)

#### Scenario: Acceptable terminology is retained

- **WHEN** an occurrence is classified as "acceptable" or "needs-exemption"
- **THEN** the text is left unchanged
- **THEN** the test suite's immersion check is updated to exclude that occurrence from future violations

### Requirement: Immersion regression test refinement

The existing immersion regression test SHALL be updated to distinguish between hard violations and accepted exemptions.

#### Scenario: Exemptions are tracked

- **WHEN** the immersion regression test runs
- **THEN** occurrences listed in the exemption manifest are excluded from violation counts
- **THEN** the test still fails on any new, un-reviewed terminology occurrences

#### Scenario: New terminology triggers a warning

- **WHEN** a developer adds a new page containing game design terminology not in the exemption list
- **THEN** the immersion regression test reports it as a violation with the exact file path and matched term

### Requirement: Game design document consistency check

The game design documents (`game-design/剧情推进逻辑.md` and `game-design/主线流程.md`) SHALL be audited against the current code implementation for consistency of puzzle answers, trigger conditions, and timeline dates.

#### Scenario: Puzzle answers match

- **WHEN** comparing each puzzle answer described in `主线流程.md` with the corresponding SHA-256 hash in `src/data/puzzles.ts`
- **THEN** all answers produce matching hashes
- **THEN** any discrepancy is documented with the specific puzzle ID and expected vs actual values

#### Scenario: Timeline consistency verified

- **WHEN** comparing date references in game design docs with dates in page content
- **THEN** key dates (沈辞失踪 2026-05-25, 站点建立 2021) are consistent across both
- **THEN** discrepancies are documented with source locations

#### Scenario: Trigger keywords match search data

- **WHEN** comparing search trigger keywords described in `剧情推进逻辑.md` with `src/data/search-data.ts`
- **THEN** all described keywords exist in the search data
- **THEN** missing or extra keywords are documented
