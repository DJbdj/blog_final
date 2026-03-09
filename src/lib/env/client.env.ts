import z from "zod";

const clientEnvSchema = z.object({
  VITE_UMAMI_WEBSITE_ID: z.string().optional(),
  VITE_TURNSTILE_SITE_KEY: z.string().optional(),
  // 博客配置
  VITE_BLOG_TITLE: z.string().optional(),
  VITE_BLOG_NAME: z.string().optional(),
  VITE_BLOG_AUTHOR: z.string().optional(),
  VITE_BLOG_DESCRIPTION: z.string().optional(),
  VITE_BLOG_GITHUB: z.string().optional(),
  VITE_BLOG_EMAIL: z.string().optional(),
  // Fuwari 主题配置
  VITE_FUWARI_HOME_BG: z.string().optional(),
  VITE_FUWARI_AVATAR: z.string().optional(),
  // 背景图片配置
  VITE_DEFAULT_HOME_IMAGE: z.string().optional(),
  VITE_DEFAULT_GLOBAL_IMAGE: z.string().optional(),
  VITE_DEFAULT_LIGHT_OPACITY: z.coerce.number().optional(),
  VITE_DEFAULT_DARK_OPACITY: z.coerce.number().optional(),
  VITE_DEFAULT_BACKDROP_BLUR: z.coerce.number().optional(),
  VITE_DEFAULT_TRANSITION_DURATION: z.coerce.number().optional(),
  // Magic 主题配置
  VITE_MAGIC_POSTS_PER_PAGE: z.coerce.number().optional(),
  VITE_MAGIC_POSTS_HERO_COUNT: z.coerce.number().optional(),
  VITE_MAGIC_SHOW_LAST_UPDATED: z.string().transform(val => val === 'true').optional(),
  VITE_MAGIC_PROSE_SIZE: z.string().optional(),
  VITE_MAGIC_ENABLE_IMAGE_ZOOM: z.string().transform(val => val === 'true').optional(),
  VITE_MAGIC_ENABLE_MATH_FORMULA: z.string().transform(val => val === 'true').optional(),
  VITE_MAGIC_SHOW_WORD_COUNT: z.string().transform(val => val === 'true').optional(),
  VITE_MAGIC_SHOW_READ_TIME: z.string().transform(val => val === 'true').optional(),
  VITE_MAGIC_ENABLE_HOVER_EFFECTS: z.string().transform(val => val === 'true').optional(),
  VITE_MAGIC_PRIMARY_COLOR: z.string().optional(),
  VITE_MAGIC_ACCENT_COLOR: z.string().optional(),
  VITE_MAGIC_ENABLE_FEATURED_POSTS: z.string().transform(val => val === 'true').optional(),
  VITE_MAGIC_FEATURED_POSTS_TITLE: z.string().optional(),
  VITE_MAGIC_POSTS_LIST_TITLE: z.string().optional(),
  VITE_MAGIC_SHOW_TAG_COUNT: z.string().transform(val => val === 'true').optional(),
  VITE_MAGIC_SHOW_CATEGORY: z.string().transform(val => val === 'true').optional(),
  VITE_MAGIC_ENABLE_SKELETON_LOADER: z.string().transform(val => val === 'true').optional(),
  VITE_MAGIC_DEFER_IMAGE_LOADING: z.string().transform(val => val === 'true').optional(),
  // ZLu 主题配置
  VITE_ZLU_AVATAR: z.string().optional(),
  VITE_ZLU_HOME_IMAGE: z.string().optional(),
  VITE_ZLU_FEATURED_COUNT: z.coerce.number().optional(),
  VITE_ZLU_POSTS_PER_PAGE: z.coerce.number().optional(),
  VITE_ZLU_ENABLE_FEATURED_POSTS: z.string().transform(val => val === 'true').optional(),
  VITE_ZLU_ENABLE_RIGHT_SIDEBAR: z.string().transform(val => val === 'true').optional(),
  VITE_ZLU_ENABLE_LEFT_SIDEBAR: z.string().transform(val => val === 'true').optional(),
  VITE_ZLU_PRIMARY_COLOR: z.string().optional(),
  VITE_ZLU_ACCENT_COLOR: z.string().optional(),
  VITE_ZLU_SHOW_LAST_UPDATED: z.string().transform(val => val === 'true').optional(),
  VITE_ZLU_SHOW_WORD_COUNT: z.string().transform(val => val === 'true').optional(),
  VITE_ZLU_SHOW_READ_TIME: z.string().transform(val => val === 'true').optional(),
  VITE_ZLU_ENABLE_IMAGE_ZOOM: z.string().transform(val => val === 'true').optional(),
  VITE_ZLU_ENABLE_HOVER_EFFECTS: z.string().transform(val => val === 'true').optional(),
  VITE_ZLU_ENABLE_SKELETON_LOADER: z.string().transform(val => val === 'true').optional(),
});

export function clientEnv() {
  return clientEnvSchema.parse(import.meta.env);
}
