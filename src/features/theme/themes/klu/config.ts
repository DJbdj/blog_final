import type { ThemeConfig } from "@/features/theme/contract/config";

export const config: ThemeConfig = {
  home: {
    featuredPostsLimit: 6,
  },
  posts: {
    postsPerPage: 10,
  },
  post: {
    relatedPostsLimit: 5,
  },
};
