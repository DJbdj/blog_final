import { useEffect, useRef, useMemo } from "react";
import { Link } from "@tanstack/react-router";
import { Calendar, Clock, Hash } from "lucide-react";
import type { PostsPageProps } from "@/features/theme/contract/pages";

// Group posts by year
function groupPostsByYear(posts: PostsPageProps["posts"]) {
  const groups: Record<string, typeof posts> = {};
  posts.forEach((post) => {
    const year = new Date(post.publishedAt || post.createdAt).getFullYear().toString();
    if (!groups[year]) groups[year] = [];
    groups[year].push(post);
  });
  return Object.entries(groups).sort((a, b) => Number(b[0]) - Number(a[0]));
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
  const observerRef = useRef<HTMLDivElement>(null);
  const groupedPosts = useMemo(() => groupPostsByYear(posts), [posts]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1, rootMargin: "100px" },
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div className="space-y-6">
      {/* Tags filter */}
      <div className="klu-card p-4">
        <div className="flex items-center gap-2 mb-3">
          <Hash size={16} className="text-[var(--klu-accent-primary)]" />
          <span className="text-sm font-medium text-[var(--klu-text-secondary)]">
            标签筛选
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onTagClick("")}
            className={`klu-tag ${!selectedTag ? "active" : ""}`}
          >
            全部
          </button>
          {tags.map((tag) => (
            <button
              key={tag.id}
              onClick={() => onTagClick(tag.name)}
              className={`klu-tag ${selectedTag === tag.name ? "active" : ""}`}
            >
              {tag.name}
              <span className="text-[var(--klu-text-muted)] ml-1">{tag.postCount}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Posts by year */}
      <div className="space-y-8">
        {groupedPosts.map(([year, yearPosts], yearIndex) => (
          <div
            key={year}
            className="klu-animate-fade-in"
            style={{ animationDelay: `${yearIndex * 100}ms` }}
          >
            {/* Year header */}
            <div className="flex items-center gap-4 mb-4">
              <span className="text-3xl font-bold text-[var(--klu-accent-primary)]">
                {year}
              </span>
              <div className="flex-1 h-px bg-[var(--klu-border-primary)]" />
              <span className="text-sm text-[var(--klu-text-muted)]">
                {yearPosts.length} 篇文章
              </span>
            </div>

            {/* Posts list */}
            <div className="space-y-3">
              {yearPosts.map((post) => (
                <article
                  key={post.id}
                  className="klu-card group"
                >
                  <Link
                    to="/post/$slug"
                    params={{ slug: post.slug }}
                    className="flex items-center gap-4 p-4"
                  >
                    {/* Date */}
                    <div className="shrink-0 w-14 text-center">
                      <div className="text-lg font-semibold text-[var(--klu-text-primary)]">
                        {new Date(post.publishedAt || post.createdAt).getDate().toString().padStart(2, "0")}
                      </div>
                      <div className="text-xs text-[var(--klu-text-muted)]">
                        {new Date(post.publishedAt || post.createdAt).getMonth() + 1}月
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-[var(--klu-text-primary)] group-hover:text-[var(--klu-accent-primary)] transition-colors truncate">
                        {post.title}
                      </h3>
                      <div className="flex items-center gap-3 mt-1 text-xs text-[var(--klu-text-muted)]">
                        <span className="flex items-center gap-1">
                          <Clock size={12} />
                          {post.readTimeInMinutes || 1} 分钟
                        </span>
                        {post.tags && post.tags.length > 0 && (
                          <span className="flex items-center gap-1">
                            <Hash size={12} />
                            {post.tags.slice(0, 2).map(t => t.name).join(", ")}
                            {post.tags.length > 2 && "..."}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Load more trigger */}
      <div ref={observerRef} className="flex justify-center py-8">
        {isFetchingNextPage ? (
          <div className="flex items-center gap-2 text-[var(--klu-text-muted)]">
            <div className="w-2 h-2 bg-[var(--klu-accent-primary)] rounded-full animate-bounce" />
            <div className="w-2 h-2 bg-[var(--klu-accent-primary)] rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
            <div className="w-2 h-2 bg-[var(--klu-accent-primary)] rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
          </div>
        ) : hasNextPage ? (
          <div className="h-px w-24 bg-[var(--klu-border-primary)]" />
        ) : posts.length > 0 ? (
          <div className="flex items-center gap-3 text-[var(--klu-text-muted)]">
            <div className="h-px w-12 bg-current" />
            <span className="text-sm">已显示全部文章</span>
            <div className="h-px w-12 bg-current" />
          </div>
        ) : (
          <div className="klu-card p-8 text-center">
            <Calendar size={48} className="mx-auto mb-3 text-[var(--klu-text-muted)]" />
            <p className="text-[var(--klu-text-secondary)]">暂无文章</p>
          </div>
        )}
      </div>
    </div>
  );
}

export function PostsPageSkeleton() {
  return (
    <div className="space-y-6">
      {/* Tags skeleton */}
      <div className="klu-card p-4">
        <div className="h-4 w-16 klu-skeleton mb-3" />
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-6 w-16 klu-skeleton rounded-full" />
          ))}
        </div>
      </div>

      {/* Years skeleton */}
      {Array.from({ length: 2 }).map((_, yearIndex) => (
        <div key={yearIndex} className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="h-8 w-16 klu-skeleton" />
            <div className="flex-1 h-px bg-[var(--klu-border-primary)]" />
            <div className="h-4 w-20 klu-skeleton" />
          </div>
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="klu-card p-4 flex items-center gap-4">
              <div className="w-14 space-y-2">
                <div className="h-6 w-8 klu-skeleton mx-auto" />
                <div className="h-4 w-6 klu-skeleton mx-auto" />
              </div>
              <div className="flex-1 space-y-2">
                <div className="h-5 w-3/4 klu-skeleton" />
                <div className="h-3 w-1/2 klu-skeleton" />
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
