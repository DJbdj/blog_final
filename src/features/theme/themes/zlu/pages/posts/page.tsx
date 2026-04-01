"use client";

import { Link } from "@tanstack/react-router";
import { Calendar, Clock, Filter } from "lucide-react";
import { useEffect, useState } from "react";
import type { PostsPageProps } from "@/features/theme/contract/pages";
import { useRightSidebar } from "@/features/theme/themes/zlu/contexts/right-sidebar-context";
import { formatDate } from "@/lib/utils";

// 从 Pexels 每日精选图获取默认封面
const PEXELS_DAILY_COVER = "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg";

function ImageWithFallback({
  coverImageKey,
  alt
}: {
  coverImageKey?: string | null;
  alt: string
}) {
  const [hasError, setHasError] = useState(false);

  // 如果有 coverImageKey 且没有错误，显示文章内的图片
  const imageUrl = coverImageKey && !hasError
    ? `/images/${coverImageKey}?quality=80&width=400`
    : PEXELS_DAILY_COVER;

  return (
    <img
      src={imageUrl}
      alt={alt}
      className="zlu-post-card-image"
      loading="lazy"
      onError={() => setHasError(true)}
    />
  );
}

function PostCard({ post }: { post: any }) {
  return (
    <article className="zlu-post-card horizontal">
      <div className="overflow-hidden">
        <ImageWithFallback
          coverImageKey={post.coverImage}
          alt={post.title}
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

// 右侧边栏内容组件
function PostsSidebar({
  tags,
  selectedTag,
  onTagClick,
  posts,
}: {
  tags: any[];
  selectedTag: string;
  onTagClick: (tag: string) => void;
  posts: any[];
}) {
  const { setContent } = useRightSidebar();

  useEffect(() => {
    const totalPosts = posts.length;
    const totalTags = tags.length;

    setContent(
      <div className="space-y-4">
        {/* 统计 */}
        <div className="zlu-sidebar-card">
          <div className="zlu-stats-grid">
            <div className="zlu-stat-item">
              <div className="zlu-stat-value">{totalPosts}</div>
              <div className="zlu-stat-label">文章</div>
            </div>
            <div className="zlu-stat-item">
              <div className="zlu-stat-value">{totalTags}</div>
              <div className="zlu-stat-label">标签</div>
            </div>
          </div>
        </div>

        {/* 标签筛选 */}
        {tags.length > 0 && (
          <div className="zlu-sidebar-card">
            <h3 className="zlu-sidebar-title">
              <Filter className="w-4 h-4" />
              标签筛选
            </h3>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => onTagClick("")}
                className={`zlu-tag cursor-pointer transition-all ${
                  !selectedTag ? "bg-[var(--zlu-primary)] text-white border-[var(--zlu-primary)]" : ""
                }`}
              >
                全部
              </button>
              {tags.map((tag) => (
                <button
                  key={tag.id}
                  onClick={() => onTagClick(tag.name)}
                  className={`zlu-tag cursor-pointer transition-all ${
                    selectedTag === tag.name ? "bg-[var(--zlu-primary)] text-white border-[var(--zlu-primary)]" : ""
                  }`}
                >
                  #{tag.name}
                  <span className="ml-1 text-xs opacity-60">({tag.postCount})</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );

    return () => setContent(null);
  }, [tags, selectedTag, onTagClick, posts, setContent]);

  return null;
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
    <>
      <PostsSidebar tags={tags} selectedTag={selectedTag} onTagClick={onTagClick} posts={posts} />
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center py-6">
          <h1 className="text-3xl font-bold mb-2 text-[var(--zlu-text-primary)]">全部文章</h1>
          <p className="text-[var(--zlu-text-secondary)]">共 {posts.length} 篇文章</p>
        </div>

        {/* Posts List */}
        <div className="space-y-4">
          {posts.length > 0 ? (
            posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-[var(--zlu-text-tertiary)]">暂无文章</p>
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
    </>
  );
}
