import { Link } from "@tanstack/react-router";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import type { HomePageProps } from "@/features/theme/contract/pages";
import { formatDate } from "@/lib/utils";

function PostCard({ post }: { post: HomePageProps["posts"][0] }) {
  return (
    <article className="klu-card group overflow-hidden">
      <Link
        to="/post/$slug"
        params={{ slug: post.slug }}
        className="block p-6"
      >
        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag.id}
                className="klu-tag"
              >
                {tag.name}
              </span>
            ))}
            {post.tags.length > 3 && (
              <span className="klu-tag">+{post.tags.length - 3}</span>
            )}
          </div>
        )}

        {/* Title */}
        <h2 className="text-xl font-semibold text-[var(--klu-text-primary)] mb-3 group-hover:text-[var(--klu-accent-primary)] transition-colors line-clamp-2">
          {post.title}
        </h2>

        {/* Summary */}
        {post.summary && (
          <p className="text-[var(--klu-text-secondary)] text-sm mb-4 line-clamp-2 leading-relaxed">
            {post.summary}
          </p>
        )}

        {/* Meta */}
        <div className="flex items-center gap-4 text-xs text-[var(--klu-text-muted)]">
          <span className="flex items-center gap-1.5">
            <Calendar size={14} />
            {formatDate(post.publishedAt || post.createdAt)}
          </span>
          {post.readTimeInMinutes > 0 && (
            <span className="flex items-center gap-1.5">
              <Clock size={14} />
              {post.readTimeInMinutes} 分钟阅读
            </span>
          )}
        </div>
      </Link>
    </article>
  );
}

export function HomePage({ posts }: HomePageProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="klu-card p-6">
        <h1 className="text-2xl font-bold text-[var(--klu-text-primary)] mb-2">
          最新文章
        </h1>
        <p className="text-[var(--klu-text-secondary)] text-sm">
          探索 {posts.length} 篇精彩文章
        </p>
      </div>

      {/* Posts Grid */}
      <div className="grid gap-4">
        {posts.map((post, index) => (
          <div
            key={post.id}
            className="klu-animate-fade-in"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <PostCard post={post} />
          </div>
        ))}
      </div>

      {/* View all link */}
      <div className="flex justify-center pt-4">
        <Link
          to="/posts"
          className="klu-btn klu-btn-ghost group"
        >
          查看全部文章
          <ArrowRight
            size={16}
            className="group-hover:translate-x-1 transition-transform"
          />
        </Link>
      </div>
    </div>
  );
}

export function HomePageSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header skeleton */}
      <div className="klu-card p-6">
        <div className="h-8 w-32 klu-skeleton mb-2" />
        <div className="h-4 w-48 klu-skeleton" />
      </div>

      {/* Posts skeleton */}
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="klu-card p-6 space-y-4">
          <div className="flex gap-2">
            <div className="h-5 w-16 klu-skeleton rounded-full" />
            <div className="h-5 w-12 klu-skeleton rounded-full" />
          </div>
          <div className="h-6 w-3/4 klu-skeleton" />
          <div className="h-4 w-full klu-skeleton" />
          <div className="h-4 w-2/3 klu-skeleton" />
          <div className="flex gap-4">
            <div className="h-3 w-20 klu-skeleton" />
            <div className="h-3 w-24 klu-skeleton" />
          </div>
        </div>
      ))}
    </div>
  );
}
