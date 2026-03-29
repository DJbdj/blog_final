# Pexels 每日精选背景功能

## 功能描述

在浅色模式下，当 default 主题没有配置自定义背景图片时，自动使用 Pexels API 获取的每日精选图片作为网站背景。

## 文件结构

```
src/features/pexels/
├── data/
│   └── pexels.data.ts       # Pexels API 数据层（类型定义、API 调用）
├── api/
│   └── pexels.api.ts        # TanStack Start Server Function
├── queries/
│   └── pexels.query.ts      # React Query Hook
├── pexels.service.ts        # 服务层（带 KV 缓存）
└── index.ts                 # 模块导出
```

## 使用方法

### 1. 获取 Pexels API 密钥

访问 https://www.pexels.com/api/new/ 申请免费的 API 密钥。

### 2. 配置环境变量

编辑 `.dev.vars`（本地开发）和在 Cloudflare 上配置生产环境变量：

```env
PEXELS_API_KEY=你的 pexels-api-key
```

### 3. 功能行为

- **浅色模式**：当未配置自定义背景图片时，自动显示 Pexels 每日精选图片
- **深色模式**：保持原有行为（不显示 Pexels 背景）
- **自定义背景**：如果配置了 `homeImage` 或 `globalImage`，优先使用自定义图片
- **摄影师署名**：右下角显示"Photo by [摄影师] on Pexels"链接

## 技术细节

### API 端点

使用 Pexels Curated Photos API：
```
GET https://api.pexels.com/v1/curated
```

### 缓存策略

- 使用 Cloudflare KV 存储缓存每日精选图片
- 缓存键：`pexels:daily:YYYY-MM-DD`（按日期缓存）
- 缓存 TTL：24 小时

### 速率限制

- 每小时 200 次请求
- 每月 20,000 次请求
- 通过 KV 缓存可有效避免触发限流

## 主题集成

修改了 `src/features/theme/themes/default/components/background-layer.tsx`：

- 添加了浅色模式检测（使用 MutationObserver 监听 HTML 类变化）
- 集成 `useDailyBackground` Hook
- 在浅色模式下自动获取并显示 Pexels 图片
- 添加了摄影师署名链接

## 注意事项

1. **必须配置 API 密钥**：未配置时功能自动禁用，不影响网站正常运行
2. **仅适用于 Default 主题**：其他主题（fuwari、zlu 等）不受影响
3. **遵守 Pexels 许可协议**：需要在显著位置标注摄影师信息（已自动实现）
4. **生产部署**：需要在 Cloudflare Workers 环境变量中配置 `PEXELS_API_KEY`

## 测试

1. 启动开发服务器：`bun dev`
2. 切换到浅色模式（点击主题切换按钮）
3. 确保未配置 `VITE_DEFAULT_HOME_IMAGE` 和 `VITE_DEFAULT_GLOBAL_IMAGE`
4. 查看首页是否显示 Pexels 精选图片
5. 右下角应显示摄影师署名链接

## 故障排除

### 图片不显示

1. 检查是否配置了 `PEXELS_API_KEY`
2. 检查是否处于浅色模式
3. 检查浏览器控制台是否有错误信息
4. 确认未配置自定义背景图片

### API 限流

如果触发 API 限流：
- 检查 KV 缓存是否正常工作
- 考虑增加缓存时间
- 减少刷新频率
