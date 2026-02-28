# Magic Theme 🎨

一个简约现代的博客主题，参考了 [blog.zhilu.site](https://blog.zhilu.site/) 的设计风格。

## 特性

- 🎨 现代简约的设计风格
- 🌓 内置深色/浅色模式支持
- 📱 完全响应式布局
- ✨ 平滑的过渡动画
- 🏷️ 标签系统
- 🔍 实时搜索功能
- 💬 评论系统
- 📝 完整的认证流程
- 🖼️ 图片预览和缩放
- 💻 代码高亮
- 🏷️ 友情链接系统
- 🔗 目录导航

## 设计理念

Magic 主题采用卡片式布局，干净利落的界面，注重内容的展示和用户体验。主要特点包括：

- **顶部导航栏**：简洁的品牌标识和导航菜单
- **精选文章轮播**：横向滚动的精选文章卡片
- **文章列表**：网格布局的文章卡片
- **文章详情**：优雅的排版和代码高亮
- **侧边栏**：友链展示
- **页脚**：社交媒体链接和版权信息

## 使用方法

### 1. 启用主题

在 `.env` 文件中设置：

```env
VITE_THEME=magic
```

### 2. 配置主题

通过环境变量自定义主题：

```env
# 布局配置
VITE_MAGIC_POSTS_PER_PAGE=8
VITE_MAGIC_POSTS_HERO_COUNT=4
VITE_MAGIC_ENABLE_FEATURED_POSTS=true

# 颜色配置
VITE_MAGIC_PRIMARY_COLOR=#3b82f6
VITE_MAGIC_ACCENT_COLOR=#60a5fa

# 功能开关
VITE_MAGIC_ENABLE_IMAGE_ZOOM=true
VITE_MAGIC_ENABLE_MATH_FORMULA=false
VITE_MAGIC_ENABLE_SKELETON_LOADER=true
```

### 3. 自定义样式

在 `styles/index.css` 中修改 CSS 变量来定制主题颜色：

```css
.theme-magic {
  --magic-primary: #3b82f6;
  --magic-primary-hover: #2563eb;
  --magic-text-primary: #1f2937;
  --magic-text-secondary: #6b7280;
  --magic-bg-primary: #ffffff;
  --magic-bg-secondary: #f9fafb;
  --magic-border: #e5e7eb;
}
```

## 文件结构

```
magic/
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
│   └── footer.tsx
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

- `PublicLayout`: 公共页面布局（导航栏 + 内容 + 页脚）
- `AuthLayout`: 认证页面布局
- `UserLayout`: 用户页面布局
- `Navbar`: 顶部导航栏
- `MobileMenu`: 移动端菜单
- `Footer`: 页脚

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

### 功能扩展

主题基于 TypeScript 和 React 组件架构，可以轻松扩展：

```tsx
// 添加新的内容类型
const extensions = [
  // ... 其他扩展
  CustomExtension,
];

// 在 render.tsx 中处理
nodeMapping: {
  customNode: ({ node }) => {
    // 自定义渲染逻辑
  },
},
```

## 兼容性

- React 18+
- TypeScript 4.5+
- Tailwind CSS 2.0+

## 许可证

MIT