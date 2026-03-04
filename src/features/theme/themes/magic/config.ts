import { clientEnv } from "@/lib/env/client.env";

const env = clientEnv();

// Theme config - only the required properties for ThemeConfig interface
export const config = {
  home: {
    featuredPostsLimit: Number(env.VITE_MAGIC_POSTS_HERO_COUNT) || 4,
  },
  posts: {
    postsPerPage: Number(env.VITE_MAGIC_POSTS_PER_PAGE) || 8,
  },
  post: {
    relatedPostsLimit: Number(env.VITE_MAGIC_POSTS_HERO_COUNT) || 4,
  },
  preloadImages: [],
} satisfies ThemeConfig;

// Extended config for internal use
export const extendedConfig = {
  // General settings
  showLastUpdated: String(env.VITE_MAGIC_SHOW_LAST_UPDATED) === 'true',
  proseSize: ["sm", "base", "lg", "xl", "2xl", "3xl"].includes(env.VITE_MAGIC_PROSE_SIZE || "lg")
    ? (env.VITE_MAGIC_PROSE_SIZE as "sm" | "base" | "lg" | "xl" | "2xl" | "3xl")
    : "lg",
  enableImageZoom: String(env.VITE_MAGIC_ENABLE_IMAGE_ZOOM) === 'true',
  enableMathFormula: String(env.VITE_MAGIC_ENABLE_MATH_FORMULA) === 'true',
  showPostWordCount: String(env.VITE_MAGIC_SHOW_WORD_COUNT) === 'true',
  showReadTime: String(env.VITE_MAGIC_SHOW_READ_TIME) === 'true',
  enableHoverEffects: String(env.VITE_MAGIC_ENABLE_HOVER_EFFECTS) === 'true',
  primaryColor: env.VITE_MAGIC_PRIMARY_COLOR || "#3b82f6",
  accentColor: env.VITE_MAGIC_ACCENT_COLOR || "#60a5fa",
  enableFeaturedPosts: String(env.VITE_MAGIC_ENABLE_FEATURED_POSTS) === 'true',
  featuredPostsTitle: env.VITE_MAGIC_FEATURED_POSTS_TITLE || "精选文章",
  postsListTitle: env.VITE_MAGIC_POSTS_LIST_TITLE || "最新文章",
  showTagCount: String(env.VITE_MAGIC_SHOW_TAG_COUNT) === 'true',
  showCategory: String(env.VITE_MAGIC_SHOW_CATEGORY) === 'true',
  enableSkeletonLoader: String(env.VITE_MAGIC_ENABLE_SKELETON_LOADER) === 'true',
  deferImageLoading: String(env.VITE_MAGIC_DEFER_IMAGE_LOADING) === 'true',
};

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
