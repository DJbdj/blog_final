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

### 其他事项

- 任何情况不要执行git操作
- 你可以访问blog.djbdj.space来获得上次更改后的效果。注意，只有在我手动git提交后才能应用更改，也就是说，你在下一次对话才能通过网址看到本次的更改
- 有时我会给你一些文件（比如截图/源码更新包等）让你学习，这些文件会放在项目的clearn目录下
- 有时候我会给你一些资源（如背景图片、字体文件），这些文件会放在项目的src_personal目录下
- 你可以用测试管理员的账户。账号：yfanyuhan@189.cn 密码：lyh52000
- 你可以查看README.md来学习该项目的开发流程