# puzzle skill — 创建谜题

按照游戏谜题系统的约定，创建一个新的谜题。

## 输入参数
- **谜题类型**：base64 / caesar / keyword / stegano / coordinate / password
- **所在阶段**：1-5（对应游戏五大阶段）
- **难度等级**：easy / medium / hard
- **所属页面**：谜题所在的页面路径

## 输出格式
输出谜题的完整定义，包含：

1. **谜题 ID**（snake_case，如 `stage2_base64_source`）
2. **谜题描述**（面向开发者的技术描述）
3. **线索文本**（面向玩家的叙事文本，暗示而不明示）
4. **答案**（明文答案，代码中存储 SHA-256 哈希）
5. **答案哈希**（`sha256("答案")` 的结果）
6. **解锁条件**（触发该谜题需要的前置条件）
7. **解锁效果**（解答后触发什么——解锁新页面/新文件/新线索）
8. **关联文件**（clueTags，用于探索进度追踪）

## 规范约束

- 所有谜题答案通过 SHA-256 哈希存储，不得在代码中出现明文答案
- 每条谜题必须提供至少 2 条不同维度的线索
- 线索必须在叙事上下文中有自然呼应
- 谜题难度逐阶段递进：
  - 阶段1：观察力（找隐藏文字）+ 简单常识
  - 阶段2：基础解密（Base64/凯撒）+ 源码查看
  - 阶段3：多步解密 + 关键词触发 + 隐写识别
  - 阶段4：逻辑拼图 + 证据整合
- 关联文件标记 clueTags，用于计算探索百分比

## 示例输出

```typescript
{
  id: 'stage2_base64_source_comment',
  stage: 2,
  difficulty: 'medium',
  description: '玩家在沈辞文章页面源码中找到Base64编码的注释，解码后获得凯撒密码线索',
  page: '/user/shenci',
  clueLocations: [
    '/user/shenci (HTML源码注释)',
    '/community/post/shenci-log-003 (正文暗示"留白处藏通路")'
  ],
  answerHash: 'abc123def456...', // sha256("秘境之下")
  unlockConditions: ['stage1_computer_login'],
  unlockEffects: ['reveal_caesar_clue', 'add_progress_15'],
  clueTags: ['source_code', 'base64'],
}
```
