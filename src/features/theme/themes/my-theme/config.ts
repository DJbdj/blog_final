import type { ThemeConfig } from "@/features/theme/contract/config";

// start with the default values and modify as needed
export const config: ThemeConfig = {
  home: {
    featuredPostsLimit: 4,
  },
  posts: {
    postsPerPage: 12,
  },
  post: {
    relatedPostsLimit: 3,
  },
};
