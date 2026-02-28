import { env } from "@/lib/env/client.env";

export const config = {
  // General
  postsPerPage: env.VITE_MAGIC_POSTS_PER_PAGE ?? 8,
  postsHeroCount: env.VITE_MAGIC_POSTS_HERO_COUNT ?? 4,
  showLastUpdated: env.VITE_MAGIC_SHOW_LAST_UPDATED ?? false,

  // Content
  proseSize: env.VITE_MAGIC_PROSE_SIZE ?? "lg",
  enableImageZoom: env.VITE_MAGIC_ENABLE_IMAGE_ZOOM ?? true,
  enableMathFormula: env.VITE_MAGIC_ENABLE_MATH_FORMULA ?? false,

  // UI
  showPostWordCount: env.VITE_MAGIC_SHOW_WORD_COUNT ?? true,
  showReadTime: env.VITE_MAGIC_SHOW_READ_TIME ?? true,
  enableHoverEffects: env.VITE_MAGIC_ENABLE_HOVER_EFFECTS ?? true,

  // Colors & Theme
  primaryColor: env.VITE_MAGIC_PRIMARY_COLOR ?? "#3b82f6",
  accentColor: env.VITE_MAGIC_ACCENT_COLOR ?? "#60a5fa",

  // Display
  enableFeaturedPosts: env.VITE_MAGIC_ENABLE_FEATURED_POSTS ?? true,
  featuredPostsTitle: env.VITE_MAGIC_FEATURED_POSTS_TITLE ?? "精选文章",
  postsListTitle: env.VITE_MAGIC_POSTS_LIST_TITLE ?? "最新文章",
  showTagCount: env.VITE_MAGIC_SHOW_TAG_COUNT ?? true,
  showCategory: env.VITE_MAGIC_SHOW_CATEGORY ?? true,

  // Performance
  enableSkeletonLoader: env.VITE_MAGIC_ENABLE_SKELETON_LOADER ?? true,
  deferImageLoading: env.VITE_MAGIC_DEFER_IMAGE_LOADING ?? true,
} satisfies ThemeConfig;

export type ThemeConfig = {
  // General
  postsPerPage: number;
  postsHeroCount: number;
  showLastUpdated: boolean;

  // Content
  proseSize: "sm" | "base" | "lg" | "xl" | "2xl" | "3xl";
  enableImageZoom: boolean;
  enableMathFormula: boolean;

  // UI
  showPostWordCount: boolean;
  showReadTime: boolean;
  enableHoverEffects: boolean;

  // Colors & Theme
  primaryColor: string;
  accentColor: string;

  // Display
  enableFeaturedPosts: boolean;
  featuredPostsTitle: string;
  postsListTitle: string;
  showTagCount: boolean;
  showCategory: boolean;

  // Performance
  enableSkeletonLoader: boolean;
  deferImageLoading: boolean;
};
