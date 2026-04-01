# CLAUDE.md

本文件为 Claude Code (claude.ai/code) 在此代码仓库中工作提供指导。

## 项目概述

一个运行在 **Cloudflare Workers** 上的全栈博客 CMS。基于 TanStack Start（React 19 SSR 元框架）、Hono（API 网关）、Drizzle ORM（D1 SQLite）和 Better Auth（GitHub OAuth）构建。

## 命令

```bash
bun dev              # 开发服务器，端口 3000
bun run build        # 生产构建（生成 manifest + vite 构建）
bun run test         # 运行所有测试（Vitest with Cloudflare Workers pool）— 不要用 npx vitest
bun run test posts   # 运行匹配模式的测试
bun run test src/features/posts/posts.service.test.ts  # 运行特定测试文件
bun lint             # ESLint 检查
bun lint:fix         # ESLint 修复 + 格式化
bun check            # 类型检查 + lint + 格式化（tsc --noEmit && lint:fix && format）
```

## 架构

### 功能模块（`src/features/`）

每个功能遵循分层模式：

```
features/<name>/
├── api/              # Server functions（TanStack Start）和/或 Hono 路由
├── data/             # 数据访问层 — 纯 Drizzle 查询，无业务逻辑
│                     # 函数签名：(db: DB, params) → Promise<T>
├── <name>.service.ts # 业务逻辑 — 编排数据、缓存、工作流
├── <name>.schema.ts  # Zod 模式 + 缓存键工厂
├── components/       # 此功能专属的 React 组件
├── queries/          # TanStack Query hooks + 查询键工厂
├── utils/            # 功能专属工具函数
└── workflows/        # Cloudflare Workflows（异步处理）
```

### Server Functions（`createServerFn`）

Server functions 是向客户端暴露 API 的主要方式。它们使用中间件进行认证和上下文注入：

```typescript
import { createServerFn } from "@tanstack/react-start";
import { adminMiddleware } from "@/lib/middlewares";

export const someFunction = createServerFn({ method: "POST" })
  .middleware([adminMiddleware])
  .inputValidator(z.object({ /* schema */ }))
  .handler(async ({ data, context }) => {
    // context.db, context.session 通过中间件注入
    // 返回数据给客户端
  });
```

### 中间件链（`src/lib/middlewares.ts`）

TanStack Start 中间件组合顺序：`dbMiddleware` → `sessionMiddleware` → `authMiddleware` → `adminMiddleware`。每一层向上下文注入数据（`context.db`、`context.session`、`context.auth`）。`DbContext` 类型广泛用于服务函数签名中。

```typescript
// 中间件组合示例
export const adminMiddleware = createMiddleware({ type: "function" })
  .middleware([authMiddleware])
  .server(async ({ context, next }) => {
    if (context.session.user.role !== "admin") {
      throw new Error("PERMISSION_DENIED");
    }
    return next({ context });
  });
```

### 错误处理的 Result 类型（`src/lib/error.ts`）

服务函数返回 `Result<TData, { reason: string }>` 而不是抛出异常：

```typescript
import { ok, err } from "@/lib/error";

// 服务返回 Result
const exists = await TagRepo.nameExists(db, name);
if (exists) return err({ reason: "TAG_NAME_ALREADY_EXISTS" });
return ok(tag);

// 调用者使用穷尽 switch 处理
if (result.error) {
  switch (result.error.reason) {
    case "TAG_NAME_ALREADY_EXISTS":
      throw new Error("标签已存在");
    default:
      result.error.reason satisfies never;
  }
}
```

### 主题系统

主题定义在 `src/features/theme/themes/` 中，每个主题通过布局组件实现契约：

```
themes/<name>/
├── layouts/        # public-layout.tsx, auth-layout.tsx, user-layout.tsx
├── pages/          # 主题专属页面实现
├── components/     # 主题专属组件（内容渲染器、背景等）
├── styles/         # CSS 主题变量和组件样式
└── index.ts        # 主题导出（名称、布局、页面）
```

**重要**：主题 CSS 变量作用域为 `html.light` 和 `html.dark` 类（**不是** `.theme-name.light`）。主题脚本 `theme-provider.tsx` 将这些类直接添加到 `<html>` 元素上。

可用主题：`default`、`fuwari`、`zlu`、`klu`、`magic`

### 缓存策略

多层缓存：Cloudflare CDN（Cache-Control 头）→ KV 存储（版本化键）→ D1。缓存键在 `*.schema.ts` 文件中定义为工厂函数。

```typescript
// *.schema.ts 中的缓存键工厂模式
export const cacheKeys = {
  all: () => ["posts"],
  byId: (id: string) => ["posts", id],
  list: (filter: PostFilter) => ["posts", "list", filter],
};
```

### 环境变量

- 客户端：Vite 注入，在 `src/lib/env/client.env.ts` 中验证（前缀 `VITE_`）
- 服务端：Wrangler 注入，在 `src/lib/env/server.env.ts` 中验证

### 测试

测试通过 `@cloudflare/vitest-pool-workers` 在 Cloudflare Workers 池中运行。`vitest.config.ts` 配置应用 D1 迁移并提供 mock 绑定。测试辅助和 mocks 位于 `tests/`。

### 结构化日志

使用 JSON 格式日志以支持 Cloudflare Workers Observability 的搜索/过滤：

```typescript
console.error(
  JSON.stringify({ message: "request failed", error: String(error) }),
);
```

## 关键模式

### Dialog 组件

使用 Radix UI 原语。使用 `DialogTrigger` 时，要么配合原生 DOM 元素使用 `asChild`，要么直接使用 `onClick`：

```tsx
// 方式一：onClick 处理器（推荐）
<Dialog open={isOpen} onOpenChange={setIsOpen}>
  <button onClick={() => setIsOpen(true)}>打开</button>
  <DialogContent>...</DialogContent>
</Dialog>

// 方式二：asChild 配合原生元素
<Dialog open={isOpen} onOpenChange={setIsOpen}>
  <DialogTrigger asChild>
    <button>打开</button>
  </DialogTrigger>
  <DialogContent>...</DialogContent>
</Dialog>
```

### Button 的 asChild

`Button` 组件通过 `@radix-ui/react-slot` 支持 `asChild`，允许在与 `DialogTrigger` 等组合组件配合使用时合并属性。

### Markdown 上传

文件通过 `uploadMarkdownFn` server function 上传到 R2 存储，然后解析并返回给客户端。参见 `MarkdownFileUpload` 组件了解上传流程。

### R2 存储路径

- 媒体文件：`images/<timestamp>-<filename>`
- Markdown 文件：`markdowns/<timestamp>-<filename>`
- 公开 URL 格式：`/images/<key>`

## 其他事项

- 除非我明确说明，任何情况不要执行 git 操作
- 为你配置了 MCP 服务器 chrome-devtools，你可以通过这个来获取页面效果
- 你可以访问 blog.djbdj.space 来获得上次更改后的效果。注意，只有在我手动 git 提交后才能应用更改，也就是说，你在下一次对话才能通过网址看到本次的更改
- 每次更新文件时使用skill:cachechange进入开发模式，如果过期则续期
- 有时我会给你一些文件（比如截图/源码更新包等）让你学习，这些文件会放在项目的 clearn 目录下
- 有时候我会给你一些资源（如背景图片、字体文件），这些文件会放在项目的 src_personal 目录下
- 你可以用测试管理员的账户。账号：yfanyuhan@189.cn 密码：lyh52000
- 你可以查看 README.md 来学习该项目的开发流程
- 如果要在本地构建，则调用对应的 agent 进行构建及后续测试
- 项目托管在 cloudflare 上，变量 CLOUDFLARE_API_TOKEN=cfut_6TElxtJ56ytcBEtISFILqcbqeyOYw8WBFtqACMcS12c24807。权限参考模板 Edit Cloudflare Workers，你可以用这个尝试远程部署

---

## Figma MCP 集成规则

本章节定义如何将 Figma 设计稿翻译为此项目的代码，涵盖组件组织、样式约定、设计令牌、资源处理和必需的 Figma-to-code 工作流。

### 必需工作流（不可跳过）

1. **首先运行** `get_design_context` 获取目标节点的 structured representation
2. 如果响应过大或被截断，运行 `get_metadata` 获取高层节点映射，然后仅 re-fetch 所需节点
3. **运行** `get_screenshot` 获取视觉参考
4. **仅在获取两者后** 开始实现：下载所需资源，开始代码实现
5. 将 Figma MCP 输出（通常为 React + Tailwind）转换为此项目的约定和样式
6. **验证** 1:1 视觉对齐 Figma 截图后方可标记完成

### 实现规则

- 将 Figma MCP 输出视为设计和行为的参考，**不是最终代码**
- 使用 Tailwind CSS v4 进行样式设计（项目使用 `@tailwindcss/vite`）
- 复用现有组件时从 `src/components/ui/` 导入
- 主题特定组件位于 `src/features/theme/themes/<theme-name>/components/`
- 页面组件位于 `src/features/theme/themes/<theme-name>/pages/`
- 始终使用项目的设计令牌（CSS 变量），不要硬编码颜色/间距值
- 遵循现有的路由、状态管理和数据获取模式
- 努力实现与 Figma 设计的 1:1 视觉一致性

---

## 组件组织规则

### UI 组件位置

- **通用 UI 组件**: `src/components/ui/` - Button, Card, Input, Badge 等基础组件
- **通用组件**: `src/components/common/` - ThemeProvider, ThemeToggle, ErrorPage 等
- **管理组件**: `src/components/admin/` - AdminSidebar, AdminPagination 等管理界面组件
- **内容组件**: `src/components/content/` - MathFormula 等内容渲染组件
- **功能特定组件**: `src/features/<feature>/components/` - 该功能专属的组件

### 主题组件结构

```
themes/<name>/
├── layouts/        # public-layout.tsx, auth-layout.tsx, user-layout.tsx
├── pages/          # 主题专属页面实现
├── components/     # 主题专属组件（内容渲染器、背景等）
├── styles/         # CSS 主题变量和组件样式
└── index.ts        # 主题导出（名称、布局、页面）
```

### 组件命名约定

- **IMPORTANT**: 组件名称使用 PascalCase（如 `FeaturedPostCard`, `DefaultSidebarContent`）
- 组件文件与其导出的主要组件同名
- 每个组件应接受 `className` 属性用于样式组合
- 变体属性使用联合类型：`variant: 'primary' | 'secondary' | 'ghost'`

---

## 样式规则

### CSS 框架

- **使用 Tailwind CSS v4** 进行样式设计
- 项目使用 `@tailwindcss/vite` 插件
- 自定义 CSS 变量定义在各主题的 `styles/index.css` 中
- 主题 CSS 变量作用域为 `html.light` 和 `html.dark` 类

### ZLu 主题设计令牌

**IMPORTANT**: ZLu 主题使用以下 CSS 变量（位于 `src/features/theme/themes/zlu/styles/index.css`）：

```css
/* 主色调 */
--zlu-primary: #4d80e6;        /* Light mode */
--zlu-primary-hover: #3a6fd6;
--zlu-primary-glow: rgba(77, 128, 230, 0.15);

/* 背景色 */
--zlu-bg-primary: #ffffff;     /* Light mode */
--zlu-bg-secondary: #f9f9f9;
--zlu-bg-tertiary: #f2f3f5;
--zlu-bg-elevated: #ffffff;

/* 文字颜色 */
--zlu-text-primary: #1a1a1a;
--zlu-text-secondary: #666666;
--zlu-text-tertiary: #999999;

/* 边框颜色 */
--zlu-border: #e8e8e8;
--zlu-border-muted: #f0f0f0;

/* 圆角 */
--zlu-radius-sm: 6px;
--zlu-radius-md: 10px;
--zlu-radius-lg: 14px;
--zlu-radius-xl: 20px;

/* 过渡 */
--zlu-transition-fast: 150ms ease;
--zlu-transition-normal: 250ms ease;
--zlu-transition-slow: 350ms ease;
```

**IMPORTANT**: 不要硬编码颜色值 - 始终使用 `var(--zlu-*)` 令牌

### 重要样式类名约定

- **布局**: `.zlu-layout`, `.zlu-navbar`, `.zlu-footer`
- **卡片**: `.zlu-post-card`, `.zlu-featured-card`, `.zlu-sidebar-card`
- **内容**: `.zlu-article`, `.zlu-article-content`, `.zlu-toc`
- **表单**: `.zlu-input`, `.zlu-button`, `.zlu-label`
- **导航**: `.zlu-nav-item`, `.zlu-menu-item`, `.zlu-tag`

### 毛玻璃效果

ZLu 主题使用 backdrop-filter 实现毛玻璃效果：

```css
/* 侧边栏毛玻璃 */
.zlu-left-sidebar {
  background: rgba(20, 20, 20, 0.8);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

/* Light mode 调整 */
html.light .zlu-left-sidebar {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(16px) saturate(180%);
}
```

---

## 资源处理规则

### 图片资源

- **IMPORTANT**: 如果 Figma MCP 服务器返回 localhost 来源的图片，直接使用该来源
- **不要** 导入/创建新的图标包 - 所有资源应包含在 Figma 输出中
- **不要** 使用或创建占位符（如果有 localhost 来源）
- 文章封面图片路径：`/images/<key>?quality=80&width=400`
- 使用 `useState` 实现图片加载失败的 fallback

### 图标

- 使用 `lucide-react` 图标库
- 图标尺寸通过 `w-* h-*` Tailwind 类控制
- 示例：`<Star className="w-5 h-5" fill="currentColor" />`

---

## 项目特定约定

### TanStack Start 约定

- 页面组件使用 `"use client"` 指令（当需要客户端交互时）
- 使用 `Link` 组件进行客户端导航
- Server functions 使用 `createServerFn` 创建
- 中间件模式：`dbMiddleware` → `sessionMiddleware` → `authMiddleware` → `adminMiddleware`

### 错误处理

- 服务函数返回 `Result<TData, { reason: string }>` 而不是抛出异常
- 使用 `ok()` 和 `err()` 辅助函数
- 调用者使用穷尽 switch 处理错误

### 缓存模式

- 缓存键在 `*.schema.ts` 文件中定义为工厂函数
- 多层缓存：CDN → KV → D1

### 可访问性标准

- 所有交互元素必须有适当的 aria 标签
- 图片必须有 alt 属性
- 颜色对比度必须满足 WCAG AA 标准

### 性能考虑

- 图片使用 `loading="lazy"` 进行懒加载
- 使用 TanStack Query 进行数据获取和缓存
- 骨架屏组件：使用 `.zlu-skeleton` 类和 `.zlu-skeleton-shimmer` 动画

---

## 示例：实现 Figma 卡片组件

```tsx
// 1. 获取设计上下文和截图后
// 2. 将 Figma 输出转换为此项目约定

interface FeaturedCardProps {
  title: string;
  excerpt?: string;
  coverImage?: string | null;
  date?: string;
  readTime?: number;
  featured?: boolean;
}

export function FeaturedCard({
  title,
  excerpt,
  coverImage,
  date,
  readTime,
  featured
}: FeaturedCardProps) {
  const [hasError, setHasError] = useState(false);
  const imageUrl = coverImage && !hasError
    ? `/images/${coverImage}?quality=80&width=400`
    : DEFAULT_COVER;

  return (
    <article className="zlu-featured-card">
      <div className="overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="zlu-featured-image"
          loading="lazy"
          onError={() => setHasError(true)}
        />
      </div>
      <div className="zlu-featured-content">
        {featured && (
          <span className="inline-flex items-center gap-1 text-xs text-[var(--zlu-primary)]">
            <Star className="w-3 h-3" fill="currentColor" />
            精选
          </span>
        )}
        <h3 className="zlu-featured-title-text">
          <Link to="/post/$slug" params={{ slug: slug }}>
            {title}
          </Link>
        </h3>
        {excerpt && (
          <p className="text-xs text-[var(--zlu-text-tertiary)] line-clamp-2 mb-3">
            {excerpt}
          </p>
        )}
        <div className="zlu-featured-meta">
          {date && (
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {date}
            </span>
          )}
          {readTime && (
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {readTime} 分钟
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
```
