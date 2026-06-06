# Search Data

**Purpose:** Define the search data schema — including archived content, hidden page cache entries, related search suggestions, page title mappings, and keyword aliases — that powers the in-game search experience. All searchable content flows through this data module.

## Requirements

### Requirement: 新增相关搜索推荐数据

`search-data.ts` SHALL 导出 `SEARCH_SUGGESTIONS` 映射表，为搜索词提供相关搜索推荐。

#### Scenario: SEARCH_SUGGESTIONS数据结构

- **WHEN** 开发者查看 `SEARCH_SUGGESTIONS` 导出
- **THEN** 数据结构为 `Record<string, { normal: string[]; stuck: string[] }>`
- **AND** `normal` 数组包含与此搜索词自然相关的其他搜索词（模拟真实搜索引擎的相关搜索）
- **AND** `stuck` 数组包含更具方向引导性的搜索词（仅卡关时使用）

#### Scenario: 常见搜索词的推荐覆盖

- **WHEN** 玩家搜索"沈辞"、"贺兰山"、"信号"、"加密"、"外星"、"古迹"等常见词
- **THEN** `SEARCH_SUGGESTIONS` 中存在对应的推荐条目
- **AND** 推荐词不直接包含谜题答案（如"helanshan06"、"多站同源"等）

### Requirement: 新增页面标题映射

`search-data.ts` SHALL 导出 `PAGE_TITLES` 映射表，为搜索结果中的页面 URL 提供中文标题。

#### Scenario: PAGE_TITLES数据结构

- **WHEN** 开发者查看 `PAGE_TITLES` 导出
- **THEN** 数据结构为 `Record<string, string>`（URL 路径 → 中文页面标题）

#### Scenario: 所有MOCK_RESULTS中的页面均有标题

- **WHEN** 搜索结果渲染页面导航条目
- **THEN** `MOCK_RESULTS` 中出现的每个 URL 在 `PAGE_TITLES` 中均有对应标题
- **AND** 标题与该页面的实际 `<h1>` 或 `<title>` 一致

### Requirement: 补充拼音和缩写搜索关键词

`ARCHIVED_CONTENT` 和 `MOCK_RESULTS` SHALL 包含常见拼音和缩写形式的关键词映射，确保使用这些形式搜索的玩家也能获得结果。

#### Scenario: 拼音搜索有结果

- **WHEN** 玩家搜索 `helanshan`（拼音）
- **THEN** `ARCHIVED_CONTENT` 中存在 `helanshan` 关键词映射
- **AND** 返回与"贺兰山"相同的历史存档内容

#### Scenario: 英文账号名搜索有结果

- **WHEN** 玩家搜索 `shenci` 或 `lyu`
- **THEN** 搜索结果包含对应的用户搜索结果和该用户的历史帖文
- **AND** 行为与当前一致（已有映射，确认完整性）

#### Scenario: 新增关键词不创建重复内容

- **WHEN** 为已有内容新增关键词映射
- **THEN** 新关键词指向已有的 `ArchivedPost[]` 数据
- **AND** 不在数据文件中复制内容文本
