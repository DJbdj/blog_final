import { clientEnv } from "@/lib/env/client.env";

const env = clientEnv();

// ZLu Theme config
export const config = {
  home: {
    featuredPostsLimit: Number(env.VITE_ZLU_FEATURED_COUNT) || 4,
  },
  posts: {
    postsPerPage: Number(env.VITE_ZLU_POSTS_PER_PAGE) || 10,
  },
  post: {
    relatedPostsLimit: 4,
  },
  preloadImages: [],
} satisfies ThemeConfig;

// Extended config for internal use
export const extendedConfig = {
  // General settings
  enableFeaturedPosts: String(env.VITE_ZLU_ENABLE_FEATURED_POSTS) !== 'false',
  featuredPostsTitle: "精选文章",
  postsListTitle: "归档",

  // Colors
  primaryColor: env.VITE_ZLU_PRIMARY_COLOR || "#3b82f6",
  accentColor: env.VITE_ZLU_ACCENT_COLOR || "#60a5fa",

  // Layout
  enableRightSidebar: String(env.VITE_ZLU_ENABLE_RIGHT_SIDEBAR) !== 'false',
  enableLeftSidebar: String(env.VITE_ZLU_ENABLE_LEFT_SIDEBAR) !== 'false',

  // Content
  showLastUpdated: String(env.VITE_ZLU_SHOW_LAST_UPDATED) === 'true',
  showWordCount: String(env.VITE_ZLU_SHOW_WORD_COUNT) === 'true',
  showReadTime: String(env.VITE_ZLU_SHOW_READ_TIME) === 'true',
  enableImageZoom: String(env.VITE_ZLU_ENABLE_IMAGE_ZOOM) === 'true',

  // UI Effects
  enableHoverEffects: String(env.VITE_ZLU_ENABLE_HOVER_EFFECTS) !== 'false',
  enableSkeletonLoader: String(env.VITE_ZLU_ENABLE_SKELETON_LOADER) !== 'false',
};

export type ThemeConfig = {
  home: {
    featuredPostsLimit: number;
  };
  posts: {
    postsPerPage: number;
  };
  post: {
    relatedPostsLimit: number;
  };
  preloadImages?: string[];
};

export type ExtendedConfig = typeof extendedConfig;
