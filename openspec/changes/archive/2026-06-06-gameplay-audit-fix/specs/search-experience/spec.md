## ADDED Requirements

### Requirement: 搜索结果计数使用搜索引擎标准格式

搜索结果页 SHALL 使用简洁的总数格式显示匹配计数，而非分段技术格式。

#### Scenario: 有结果时显示总数

- **WHEN** 搜索匹配到任意数量的结果
- **THEN** 结果列表上方显示"找到约 N 条结果"（N 为所有类别结果的总和）
- **AND** 不显示内部分类计数（如"历史存档"、"缓存页面"的数量）

#### Scenario: 无结果时保持不变

- **WHEN** 搜索无任何匹配
- **THEN** 显示"未找到相关结果"及搜索建议（与当前行为一致）

### Requirement: 相关搜索始终显示

搜索结果页 SHALL 在每次搜索时显示"相关搜索"推荐区域（当存在匹配的推荐词时），而非仅在卡关时显示。

#### Scenario: 正常搜索时显示普通推荐

- **WHEN** 玩家搜索的关键词在 `SEARCH_SUGGESTIONS` 中有 `normal` 级别的推荐
- **AND** 搜索 URL 中无 `hint=1` 参数
- **THEN** 搜索结果底部显示"相关搜索"区域
- **AND** 推荐词使用 `normal` 级别的列表

#### Scenario: 卡关时显示引导性推荐

- **WHEN** 玩家搜索的关键词在 `SEARCH_SUGGESTIONS` 中有 `stuck` 级别的推荐
- **AND** 搜索 URL 中有 `hint=1` 参数
- **THEN** 搜索结果底部显示"相关搜索"区域
- **AND** 推荐词使用 `stuck` 级别的列表（更具引导性）

#### Scenario: 搜索词无推荐时不显示区域

- **WHEN** 当前搜索词在 `SEARCH_SUGGESTIONS` 中无匹配
- **THEN** 不显示"相关搜索"区域

### Requirement: 页面导航结果显示可读标题

搜索结果中的页面导航条目 SHALL 显示页面的中文标题和 URL 路径，而非仅显示裸 URL。

#### Scenario: 页面结果显示标题和URL

- **WHEN** 搜索匹配到 `MOCK_RESULTS` 中的页面
- **THEN** 每条结果显示页面的中文标题（从 `PAGE_TITLES` 映射读取）作为可点击链接
- **AND** URL 路径以灰色小字显示在标题下方
- **AND** 标题链接和 URL 均使用 BASE 路径前缀

#### Scenario: 未收录标题的页面显示URL

- **WHEN** 某个页面 URL 在 `PAGE_TITLES` 中无映射
- **THEN** 以 URL 路径作为显示标题（与当前行为一致）
