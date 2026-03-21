import type { PostItem } from "@/features/posts/schema/posts.schema";
import type { TagWithCount } from "@/features/tags/tags.schema";

export interface HomePageProps {
  posts: Array<PostItem>;
  tags: Array<TagWithCount>;
}
