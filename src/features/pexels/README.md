# Pexels 每日精选背景功能

## 功能描述

在浅色模式下，自动使用 Pexels API 获取的每日精选图片作为网站背景。

## 当前实现

**已支持的主题：**
- ✅ **zlu 主题** - 完全支持
- ✅ **default 主题** - 代码已实现（需要切换到 default 主题）

## 使用方法

### 1. 获取 Pexels API 密钥

访问 https://www.pexels.com/api/new/ 申请免费的 API 密钥。

### 2. 配置环境变量

在 Cloudflare Dashboard 中添加环境变量：
- 变量名：`PEXELS_API_KEY`
- 值：你的 Pexels API 密钥

**注意：** 不需要重新构建，添加变量后自动生效。

### 3. 功能行为

- **浅色模式**：自动显示 Pexels 每日精选图片
- **深色模式**：不显示 Pexels 背景（保持原主题样式）
- **系统模式**：根据系统主题自动切换
- **摄影师署名**：右下角显示"Photo by [摄影师] on Pexels"链接

## 技术实现

### API 端点

使用 Pexels Curated Photos API：
```
GET https://api.pexels.com/v1/curated
```

### Server Function

实现在 `src/features/config/api/site.api.ts` 中：
- `getPexelsDailyBackgroundFn` - 获取每日精选图片

### 组件集成

**ZLu 主题**：`src/features/theme/themes/zlu/components/background-layer.tsx`
- 使用 `useDailyBackground` Hook
- 浅色模式下显示 Pexels 背景
- 叠加渐变光球效果

**Default 主题**：`src/features/theme/themes/default/components/background-layer.tsx`
- 使用 `useDailyBackground` Hook
- 仅在无自定义背景图片时使用 Pexels

### 缓存策略

- 使用 Cloudflare KV 存储缓存
- 缓存键：`pexels:daily:YYYY-MM-DD`
- 缓存 TTL：24 小时

### 速率限制

- Pexels API：每小时 200 次，每月 20,000 次
- 通过 KV 缓存可有效避免触发限流

## 测试

1. 切换到浅色模式（点击主题切换按钮直到显示太阳图标）
2. 查看页面底部是否有 Pexels 背景图片
3. 右下角应显示摄影师署名链接

## 注意事项

1. **仅浅色模式有效**：深色模式和系统模式（当系统为深色时）不会显示 Pexels 背景
2. **主题依赖**：当前主要支持 zlu 主题（博客默认使用该主题）
3. **遵守许可协议**：Pexels 要求标注摄影师信息（已自动实现）
4. **API 密钥安全**：密钥存储在服务端，不会暴露给客户端

## 故障排除

### 图片不显示

1. 确认处于浅色模式
2. 检查 Cloudflare 环境变量是否正确配置
3. 刷新页面（Ctrl+Shift+R）

### 查看控制台错误

打开浏览器开发者工具（F12），查看 Console 是否有错误信息。

### 检查网络请求

在 Network 标签中查找是否有关于 Pexels API 的请求。
