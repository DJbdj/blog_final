import { Link } from "@tanstack/react-router";
import { memo } from "react";
import { Calendar, Hash } from "lucide-react";
import type { PostItem as PostItemType } from "@/features/posts/posts.schema";
import { formatDate } from "@/lib/utils";

interface PostCardProps {
  post: PostItemType;
  featured?: boolean;
}

export const PostCard = memo(({ post, featured = false }: PostCardProps) => {
  return (
    <Link
      to="/post/$slug"
      params={{ slug: post.slug }}
      className={`magic-post-card magic-card group overflow-hidden ${featured ? "min-w-[280px] sm:min-w-[320px] max-w-[350px]" : ""}`}
    >
      {/* Cover Image */}
      {/* Cover image not available in PostItemSchema */}

      {/* Content */}
      <div className="p-4 sm:p-5 flex flex-col flex-1">
        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {post.tags.slice(0, 2).map((tag) => (
              <span key={tag.id} className="magic-tag text-[11px]">
                <Hash size={10} className="inline mr-0.5" />
                {tag.name}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-2">
          {post.title}
        </h3>

        {/* Summary */}
        {post.summary && (
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3 flex-1">
            {post.summary}
          </p>
        )}

        {/* Meta */}
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <time dateTime={post.publishedAt?.toISOString()}>
            <Calendar size={12} className="inline mr-1" />
            {formatDate(post.publishedAt)}
          </time>
          {post.readTimeInMinutes && (
            <span>{post.readTimeInMinutes} 分钟阅读</span>
          )}
        </div>
      </div>
    </Link>
  );
});

PostCard.displayName = "PostCard";
