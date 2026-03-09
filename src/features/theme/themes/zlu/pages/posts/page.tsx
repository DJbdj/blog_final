import { Link } from "@tanstack/react-router";
import { Calendar, Clock } from "lucide-react";
import type { PostsPageProps } from "@/features/theme/contract/pages";
import { formatDate } from "@/lib/utils";

function PostCard({ post }: { post: any }) {
  const imageUrl = post.coverImage || "/images/default-post.jpg";

  return (
    <article className="zlu-post-card horizontal">
      <div className="overflow-hidden">
        <img
          src={imageUrl}
          alt={post.title}
          className="zlu-post-card-image"
          loading="lazy"
        />
      </div>
      <div className="zlu-post-card-content">
        <h3 className="zlu-post-card-title">
          <Link to="/post/$slug" params={{ slug: post.slug }} className="hover:underline">
            {post.title}
          </Link>
        </h3>
        {post.summary && (
          <p className="zlu-post-card-excerpt">
            {post.summary}
          </p>
        )}
        <div className="zlu-post-card-meta">
          {post.publishedAt && (
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {formatDate(post.publishedAt)}
            </span>
          )}
          {post.readTimeInMinutes && (
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {post.readTimeInMinutes} 分钟
            </span>
          )}
        </div>
        {post.tags && post.tags.length > 0 && (
          <div className="zlu-post-tags">
            {post.tags.slice(0, 3).map((tag: any) => (
              <span key={tag.id} className="zlu-tag">
                #{tag.name}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}

export function PostsPage({
  posts,
  tags,
  selectedTag,
  onTagClick,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
}: PostsPageProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center py-6">
        <h1 className="text-3xl font-bold mb-2 text-white">全部文章</h1>
        <p className="text-gray-400">共 {posts.length} 篇文章</p>
      </div>

      {/* Tags Filter */}
      {tags.length > 0 && (
        <div className="zlu-sidebar-card">
          <h3 className="zlu-sidebar-title">标签筛选</h3>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => onTagClick("")}
              className={`zlu-tag cursor-pointer transition-all ${
                !selectedTag ? "bg-blue-600 text-white border-blue-600" : ""
              }`}
            >
              全部
            </button>
            {tags.map((tag) => (
              <button
                key={tag.id}
                onClick={() => onTagClick(tag.name)}
                className={`zlu-tag cursor-pointer transition-all ${
                  selectedTag === tag.name ? "bg-blue-600 text-white border-blue-600" : ""
                }`}
              >
                #{tag.name}
                <span className="ml-1 text-xs opacity-60">({tag.postCount})</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Posts List */}
      <div className="space-y-4">
        {posts.length > 0 ? (
          posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400">暂无文章</p>
          </div>
        )}
      </div>

      {/* Load More */}
      {hasNextPage && (
        <div className="text-center pt-4">
          <button
            onClick={fetchNextPage}
            disabled={isFetchingNextPage}
            className="zlu-button zlu-button-secondary"
          >
            {isFetchingNextPage ? "加载中..." : "加载更多"}
          </button>
        </div>
      )}

      {isFetchingNextPage && (
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="zlu-skeleton h-48 rounded-xl" />
          ))}
        </div>
      )}
    </div>
  );
}
