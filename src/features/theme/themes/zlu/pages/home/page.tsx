"use client";

import { Link } from "@tanstack/react-router";
import { Calendar, Clock, Star } from "lucide-react";
import type { HomePageProps } from "@/features/theme/contract/pages";
import { extendedConfig } from "@/features/theme/themes/zlu/config";
import { DefaultSidebarContent } from "@/features/theme/themes/zlu/components/default-sidebar-content";
import { ArchiveSection } from "@/features/theme/themes/zlu/components/archive-section";
import { formatDate } from "@/lib/utils";
import { useState } from "react";

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
      className="zlu-featured-image"
      loading="lazy"
      onError={() => setHasError(true)}
    />
  );
}

function FeaturedPostCard({ post }: { post: any }) {
  return (
    <article className="zlu-featured-card">
      <div className="overflow-hidden">
        <ImageWithFallback
          coverImageKey={post.coverImage}
          alt={post.title}
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

export function HomePage({ posts, tags, archivePosts }: HomePageProps) {
  // posts 是精选文章列表

  return (
    <>
      <DefaultSidebarContent posts={posts} tags={tags} />
      <div className="space-y-8">
        {/* Featured Posts - Horizontal Scroll */}
        {posts.length > 0 ? (
          <section className="zlu-featured-section">
            <h2 className="zlu-featured-title">
              <Star className="w-5 h-5 text-blue-500" fill="currentColor" />
              {extendedConfig.featuredPostsTitle || "精选文章"}
            </h2>
            <div className="zlu-featured-scroll">
              {posts.map((post) => (
                <FeaturedPostCard key={post.id} post={post} />
              ))}
            </div>
          </section>
        ) : (
          <div className="text-center py-12">
            <p className="text-[var(--zlu-text-tertiary)]">暂无精选文章</p>
          </div>
        )}

        {/* Archive Section */}
        <ArchiveSection posts={archivePosts} />
      </div>
    </>
  );
}
