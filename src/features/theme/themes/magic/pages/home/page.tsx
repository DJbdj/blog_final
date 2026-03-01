import { Link } from "@tanstack/react-router";
import { Mail, Rss, ArrowRight, Calendar, Tag, Eye } from "lucide-react";
import { Github as GithubIcon } from "lucide-react";
import { useMemo } from "react";
import type { HomePageProps } from "@/features/theme/contract/pages";
import { config } from "@/features/theme/themes/magic/config";
import { blogConfig } from "@/blog.config";
import { formatDate } from "@/lib/utils";

function PostCard({ post, featured = false }: { post: any; featured?: boolean }) {
  const imageUrl = post.coverImage || `/images/default-${featured ? 'featured' : 'post'}.jpg`;

  return (
    <article className="magic-post-card magic-card">
      {/* Featured Image */}
      <div className="overflow-hidden rounded-t-xl">
        <div
          className="magic-post-image"
          style={{
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {featured && (
          <div className="flex items-center gap-2 text-xs">
            <span className="magic-tag">精选</span>
          </div>
        )}

        <h3 className="text-xl font-semibold line-clamp-2 group-hover:text-primary transition-colors">
          <Link to="/post/$slug" params={{ slug: post.slug }} className="hover:underline">
            {post.title}
          </Link>
        </h3>

        {post.summary && (
          <p className="text-muted-foreground line-clamp-2 text-sm">
            {post.summary}
          </p>
        )}

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
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
          {post.tags && post.tags.length > 0 && (
            <div className="flex items-center gap-1">
              <Tag size={12} />
              <div className="flex gap-1">
                {post.tags.slice(0, 3).map((tag: any) => (
                  <span key={tag.id} className="magic-tag">
                    #{tag.name}
                  </span>
                ))}
                {post.tags.length > 3 && (
                  <span className="text-muted-foreground">+{post.tags.length - 3}</span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Read More Button */}
        <div className="pt-2">
          <Link
            to="/post/$slug"
            params={{ slug: post.slug }}
            className="inline-flex items-center gap-1 text-primary hover:underline"
          >
            阅读
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </article>
  );
}

export function HomePage({ posts }: HomePageProps) {
  const featuredPosts = useMemo(() => {
    return posts.slice(0, config.postsHeroCount);
  }, [posts]);

  const recentPosts = useMemo(() => {
    return posts.slice(config.postsHeroCount);
  }, [posts]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Hero Section */}
      <section className="text-center py-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Magic Blog</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          探索知识，分享见解，创造价值
        </p>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <svg
                className="w-5 h-5 text-primary"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
              精选文章
            </h2>
          </div>

          {/* Horizontal Scroll Featured Posts */}
          <div className="magic-featured-scroll flex gap-4 overflow-x-auto pb-4 -mx-4 px-4">
            {featuredPosts.map((post) => (
              <PostCard key={post.id} post={post} featured />
            ))}
          </div>
        </section>
      )}

      {/* Recent Posts */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">最新文章</h2>
          <Link to="/posts" className="text-primary hover:underline flex items-center gap-1">
            查看全部
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Grid Layout */}
        {recentPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">暂无文章</p>
          </div>
        )}
      </section>

      {/* Footer CTA */}
      <section className="text-center py-8 border-t border-border mt-16">
        <div className="flex items-center justify-center gap-6">
          <a
            href={blogConfig.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg hover:bg-secondary/50 transition-colors"
            aria-label="GitHub"
          >
            <GithubIcon size={20} />
          </a>
          <a
            href="/rss.xml"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg hover:bg-secondary/50 transition-colors"
            aria-label="RSS"
          >
            <Rss size={20} />
          </a>
          <a
            href={`mailto:${blogConfig.social.email}`}
            className="p-2 rounded-lg hover:bg-secondary/50 transition-colors"
            aria-label="Email"
          >
            <Mail size={20} />
          </a>
        </div>
      </section>
    </div>
  );
}
