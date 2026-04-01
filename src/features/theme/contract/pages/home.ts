import type { PostItem } from "@/features/posts/schema/posts.schema";
import type { TagWithCount } from "@/features/tags/tags.schema";

// Archive post type - simplified post with tags for archive visualization
export interface ArchivePost {
  id: number;
  title: string;
  slug: string;
  publishedAt: Date | string;
  coverImage?: string | null;
  tags: Array<{
    id: number;
    name: string;
  }>;
}

export interface HomePageProps {
  posts: Array<PostItem>;
  tags: Array<TagWithCount>;
  archivePosts: Array<ArchivePost>;
}
