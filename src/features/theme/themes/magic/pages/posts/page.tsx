import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Tag, Calendar, Eye } from "lucide-react";
import type { PostsPageProps } from "@/features/theme/contract/pages";
import { config } from "@/features/theme/themes/magic/config";
import { formatDate } from "@/lib/utils";

export function PostsPage({
  posts,
  tags,
  selectedTag,
  onTagClick,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
}: PostsPageProps) {
  const observerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1, rootMargin: "100px" }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Header */}
      <header className="mb-12 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">文章</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          探索我们的知识库，发现有价值的内容
        </p>
      </header>

      {/* Tags Filter */}
      <div className="mb-10">
        <h3 className="text-sm font-medium text-muted-foreground mb-4 flex items-center gap-2">
          <Tag size={14} />
          分类筛选
        </h3>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onTagClick("")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedTag
                ? "text-muted-foreground hover:text-primary"
                : "text-primary bg-primary/10"
            }`}
          >
            全部
          </button>
          {tags.map((tag) => (
            <button
              key={tag.id}
              onClick={() => onTagClick(tag.name)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedTag === tag.name
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              {tag.name}
              {config.showTagCount && (
                <span className="text-xs text-muted-foreground ml-2">
                  {tag.postCount}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {posts.map((post) => {
          const imageUrl = post.coverImage || `/images/default-post.jpg`;
          const primaryTag = post.tags?.[0];

          return (
            <article
              key={post.id}
              className="magic-card group"
            >
              {/* Cover Image */}
              <div className="aspect-video overflow-hidden rounded-t-xl">
                <div
                  className="magic-post-image group-hover:scale-105 transition-transform duration-300"
                  style={{
                    backgroundImage: `url(${imageUrl})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                {/* Tags */}
                {config.showCategory && primaryTag && (
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">分类：</span>
                    <Link
                      to="/posts"
                      search={{ tagName: primaryTag.name }}
                      className="magic-tag"
                    >
                      #{primaryTag.name}
                    </Link>
                  </div>
                )}

                {/* Title */}
                <h3 className="text-lg font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                  <Link
                    to={`/post/${post.slug}`}
                    className="hover:underline"
                  >
                    {post.title}
                  </Link>
                </h3>

                {/* Summary */}
                {post.summary && (
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {post.summary}
                  </p>
                )}

                {/* Meta */}
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  {post.publishedAt && (
                    <div className="flex items-center gap-1">
                      <Calendar size={12} />
                      <span>{formatDate(post.publishedAt)}</span>
                    </div>
                  )}
                  {post.readTimeInMinutes && (
                    <div className="flex items-center gap-1">
                      <Eye size={12} />
                      <span>{post.readTimeInMinutes} 分钟</span>
                    </div>
                  )}
                </div>

                {/* More Button */}
                <div className="pt-2">
                  <Link
                    to={`/post/${post.slug}`}
                    className="text-primary hover:underline text-sm flex items-center gap-1"
                  >
                    阅读更多 →
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Loading More */}
      <div ref={observerRef} className="flex justify-center py-8">
        {isFetchingNextPage && (
          <div className="flex items-center gap-2 text-muted-foreground">
            <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            <span>加载中...</span>
          </div>
        )}
        {!isFetchingNextPage && !hasNextPage && posts.length > 0 && (
          <p className="text-muted-foreground">没有更多文章了</p>
        )}
      </div>
    </div>
  );
}
