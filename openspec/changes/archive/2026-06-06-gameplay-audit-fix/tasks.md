## 1. 搜索数据补充

- [x] 1.1 在 `search-data.ts` 中新增 `SEARCH_SUGGESTIONS` 导出（`Record<string, { normal: string[]; stuck: string[] }>`），为各阶段常见搜索词提供相关搜索推荐
- [x] 1.2 在 `search-data.ts` 中新增 `PAGE_TITLES` 导出（`Record<string, string>`），为 `MOCK_RESULTS` 中出现的所有 URL 提供中文页面标题
- [x] 1.3 在 `ARCHIVED_CONTENT` 中补充拼音关键词映射（如 `helanshan` → 贺兰山相关内容），使用已有数据引用而非复制内容
- [x] 1.4 复核 `MOCK_RESULTS` 中已有的关键词覆盖是否完整（检查常见搜索词的映射是否存在）

## 2. 搜索结果页改进

- [x] 2.1 修改 `search.astro` 中的结果计数格式：将分段技术格式替换为 `找到约 N 条结果`
- [x] 2.2 修改 `search.astro` 中的"相关搜索"渲染逻辑：移除 `if (showHint)` 条件，改为始终尝试渲染（当 `SEARCH_SUGGESTIONS` 中有匹配时）；根据 `?hint=1` 参数选择 `normal` 或 `stuck` 推荐词列表
- [x] 2.3 修改 `search.astro` 中的页面导航结果渲染：从 `PAGE_TITLES` 读取标题，显示为"标题（链接）+ URL（灰色小字）"格式，替代当前仅显示 URL 路径的方式

## 3. 验证

- [x] 3.1 验证搜索结果计数：搜索"沈辞"等常见词，确认显示"找到约 N 条结果"格式
- [x] 3.2 验证相关搜索：搜索"沈辞"→ 底部显示相关搜索推荐（如"贺兰山"、"地下三尺"）；卡关时（`?hint=1`）显示更具引导性的推荐词
- [x] 3.3 验证页面结果标题：搜索"外星"→ 页面导航结果显示中文标题而非裸 URL
- [x] 3.4 验证拼音搜索：搜索"helanshan"→ 返回贺兰山相关内容
- [x] 3.5 `pnpm check` 全量验证通过
