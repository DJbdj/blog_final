# ZLu Theme

一个深色极简主义博客主题，参考了 [blog.zhilu.site](https://blog.zhilu.site/) 的设计风格。

## 特性

- 🎨 深色极简设计风格
- 🌓 自适应深色主题
- 📱 完全响应式布局
- ✨ 平滑的过渡动画
- 📌 精选文章轮播
- 📝 卡片式文章列表
- 🏷️ 标签系统
- 🔍 实时搜索功能
- 💬 评论系统
- 📁 完整的认证流程
- 🖼️ 图片预览和缩放
- 💻 代码高亮
- 🏷️ 友情链接系统
- 🔗 目录导航

## 设计理念

ZLu 主题采用深色极简设计，强调整洁的视觉效果和舒适的阅读体验。主要特点包括：

- **左侧边栏** - 固定的个人资料和导航菜单
- **右侧边栏** - 公告、热门文章和标签
- **精选文章轮播** - 横向滚动的精选文章卡片
- **文章列表** - 优雅的文章卡片布局
- **文章详情** - 优雅的排版和代码高亮
- **页脚** - 社交媒体链接和版权信息

## 使用方法

### 1. 启用主题

在 `.env` 文件中设置：

```env
THEME=zlu
```

### 2. 配置主题

通过环境变量自定义主题：

```env
# 布局配置
VITE_ZLU_FEATURED_COUNT=4
VITE_ZLU_POSTS_PER_PAGE=10

# 功能开关
VITE_ZLU_ENABLE_FEATURED_POSTS=true
VITE_ZLU_ENABLE_RIGHT_SIDEBAR=true
VITE_ZLU_ENABLE_LEFT_SIDEBAR=true

# 颜色配置
VITE_ZLU_PRIMARY_COLOR=#3b82f6
VITE_ZLU_ACCENT_COLOR=#60a5fa

# 内容显示
VITE_ZLU_SHOW_LAST_UPDATED=true
VITE_ZLU_SHOW_WORD_COUNT=true
VITE_ZLU_SHOW_READ_TIME=true
VITE_ZLU_ENABLE_IMAGE_ZOOM=true

# UI 效果
VITE_ZLU_ENABLE_HOVER_EFFECTS=true
VITE_ZLU_ENABLE_SKELETON_LOADER=true
```

### 3. 自定义样式

在 `styles/index.css` 中修改 CSS 变量来定制主题颜色：

```css
.theme-zlu {
  --zlu-primary: #3b82f6;
  --zlu-primary-hover: #2563eb;
  --zlu-bg-primary: #0d1117;
  --zlu-bg-secondary: #161b22;
  --zlu-text-primary: #f0f6fc;
  --zlu-text-secondary: #8b949e;
}
```

## 文件结构

```
zlu/
├── index.ts              # 主题入口文件
├── config.ts             # 主题配置
├── styles/
│   └── index.css        # 主题样式
├── layouts/              # 布局组件
│   ├── public-layout.tsx
│   ├── auth-layout.tsx
│   ├── user-layout.tsx
│   ├── navbar.tsx
│   ├── mobile-menu.tsx
│   ├── footer.tsx
│   └── background-layer.tsx
├── pages/                # 页面组件
│   ├── home/
│   ├── posts/
│   ├── post/
│   ├── friend-links/
│   ├── search/
│   ├── submit-friend-link/
│   ├── auth/
│   └── user/
├── components/           # 共享组件
│   ├── content/
│   └── comments/
└── README.md             # 说明文档
```

## 组件说明

### 布局组件

- `PublicLayout`: 公共页面布局（左侧边栏 + 内容 + 右侧边栏 + 页脚）
- `AuthLayout`: 认证页面布局
- `UserLayout`: 用户页面布局
- `Navbar`: 顶部导航栏
- `MobileMenu`: 移动端菜单
- `Footer`: 页脚
- `BackgroundLayer`: 背景装饰层

### 页面组件

- `HomePage`: 首页（精选文章 + 文章列表）
- `PostsPage`: 文章列表页
- `PostPage`: 文章详情页
- `FriendLinksPage`: 友链页面
- `SearchPage`: 搜索页面
- `ProfilePage`: 个人资料页

### 内容组件

- `ContentRenderer`: 内容渲染器
- `CodeBlock`: 代码块组件
- `ImageDisplay`: 图片显示组件
- `ZoomableImage`: 可缩放图片组件

### 评论组件

- `CommentSection`: 评论区

## 骨架屏

每个页面都提供了骨架屏组件，在加载时显示：

```tsx
import { HomePageSkeleton } from "./pages/home/skeleton";

// 在 Suspense 中使用
<Suspense fallback={<HomePageSkeleton />}>
  <HomePage />
</Suspense>
```

## 开发指南

### 添加新页面

1. 在 `pages` 目录下创建对应的页面组件
2. 实现骨架屏组件（可选）
3. 在 `index.ts` 中导出组件

### 修改样式

1. 编辑 `styles/index.css`
2. 使用 CSS 变量进行主题定制
3. 考虑深色模式的支持

## 环境变量

| 环境变量 | 说明 | 默认值 |
| --- | --- | --- |
| `VITE_ZLU_FEATURED_COUNT` | 精选文章数量 | 4 |
| `VITE_ZLU_POSTS_PER_PAGE` | 每页文章数 | 10 |
| `VITE_ZLU_PRIMARY_COLOR` | 主色调 | #3b82f6 |
| `VITE_ZLU_ACCENT_COLOR` | 强调色 | #60a5fa |

## 兼容性

- React 18+
- TypeScript 4.5+
- Tailwind CSS 3.0+

## 许可证

MIT
