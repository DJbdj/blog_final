import { Link } from "@tanstack/react-router";
import { Calendar, Clock, ArrowRight, Star } from "lucide-react";
import { useMemo } from "react";
import type { HomePageProps } from "@/features/theme/contract/pages";
import { config, extendedConfig } from "@/features/theme/themes/zlu/config";
import { formatDate } from "@/lib/utils";

function FeaturedPostCard({ post }: { post: any }) {
  const imageUrl = post.coverImage || "/images/default-featured.jpg";

  return (
    <article className="zlu-featured-card">
      <div className="overflow-hidden">
        <img
          src={imageUrl}
          alt={post.title}
          className="zlu-featured-image"
          loading="lazy"
        />
      </div>
      <div className="zlu-featured-content">
        <div className="flex items-center gap-2 mb-2">
          <span className="inline-flex items-center gap-1 text-xs text-[var(--zlu-primary)]">
            <Star className="w-3 h-3" fill="currentColor" />
            精选
          </span>
        </div>
        <h3 className="zlu-featured-title-text">
          <Link to="/post/$slug" params={{ slug: post.slug }}>
            {post.title}
          </Link>
        </h3>
        {post.summary && (
          <p className="text-xs text-[var(--zlu-text-tertiary)] line-clamp-2 mb-3">
            {post.summary}
          </p>
        )}
        <div className="zlu-featured-meta">
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
      </div>
    </article>
  );
}

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

export function HomePage({ posts }: HomePageProps) {
  const featuredPosts = useMemo(() => {
    return posts.slice(0, config.home.featuredPostsLimit);
  }, [posts]);

  const recentPosts = useMemo(() => {
    return posts.slice(config.home.featuredPostsLimit);
  }, [posts]);

  return (
    <div className="space-y-8">
      {/* Featured Posts - Horizontal Scroll */}
      {featuredPosts.length > 0 && (
        <section className="zlu-featured-section">
          <h2 className="zlu-featured-title">
            <Star className="w-5 h-5 text-blue-500" fill="currentColor" />
            {extendedConfig.featuredPostsTitle || "精选文章"}
          </h2>
          <div className="zlu-featured-scroll">
            {featuredPosts.map((post) => (
              <FeaturedPostCard key={post.id} post={post} />
            ))}
          </div>
        </section>
      )}

      {/* Recent Posts List */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-[var(--zlu-text-primary)] flex items-center gap-2">
            <ArrowRight className="w-5 h-5 text-[var(--zlu-primary)]" />
            {extendedConfig.postsListTitle || "最新文章"}
          </h2>
          <Link
            to="/posts"
            className="text-sm text-[var(--zlu-primary)] hover:text-[var(--zlu-primary-hover)] transition-colors flex items-center gap-1"
          >
            查看全部
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="space-y-4">
          {recentPosts.length > 0 ? (
            recentPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-[var(--zlu-text-tertiary)]">暂无文章</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
