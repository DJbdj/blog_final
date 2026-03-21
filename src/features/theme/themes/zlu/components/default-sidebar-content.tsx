"use client";

import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Megaphone, TrendingUp, Tag, ChevronRight } from "lucide-react";
import { useRightSidebar } from "../../contexts/right-sidebar-context";
import type { PostPageProps } from "@/features/theme/contract/pages";
import { formatDate } from "@/lib/utils";

// 默认公告内容
function NoticeCard() {
  return (
    <div className="zlu-sidebar-card">
      <h3 className="zlu-sidebar-title">
        <Megaphone className="w-4 h-4" />
        公告
      </h3>
      <div className="text-sm text-[var(--zlu-text-secondary)] space-y-2">
        <p>欢迎来到我的博客！这里记录着我的学习心得和技术分享。</p>
      </div>
    </div>
  );
}

// 热门文章
function PopularPostsCard({ posts }: { posts: any[] }) {
  const popularPosts = posts.slice(0, 5);

  if (popularPosts.length === 0) return null;

  return (
    <div className="zlu-sidebar-card">
      <h3 className="zlu-sidebar-title">
        <TrendingUp className="w-4 h-4" />
        热门文章
      </h3>
      <nav className="space-y-2">
        {popularPosts.map((post: any) => (
          <Link
            key={post.id}
            to="/post/$slug"
            params={{ slug: post.slug }}
            className="group flex items-start gap-2 text-sm text-[var(--zlu-text-secondary)] hover:text-[var(--zlu-primary)] transition-colors"
          >
            <ChevronRight className="w-4 h-4 mt-0.5 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="line-clamp-2">{post.title}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}

// 标签云
function TagsCard({ tags }: { tags: any[] }) {
  if (tags.length === 0) return null;

  return (
    <div className="zlu-sidebar-card">
      <h3 className="zlu-sidebar-title">
        <Tag className="w-4 h-4" />
        标签
      </h3>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag: any) => (
          <Link
            key={tag.id}
            to="/posts"
            search={{ tagName: tag.name }}
            className="zlu-tag hover:text-[var(--zlu-primary)] transition-colors"
          >
            #{tag.name}
            <span className="ml-1 text-xs opacity-60">({tag.postCount})</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

// 统计信息
function StatsCard({ posts }: { posts: any[] }) {
  const totalPosts = posts.length;
  const totalTags = new Set(posts.flatMap((p: any) => p.tags?.map((t: any) => t.name) || [])).size;

  return (
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
  );
}

// 完整的默认右侧边栏内容
interface DefaultSidebarProps {
  posts: any[];
  tags?: any[];
}

export function DefaultSidebarContent({ posts, tags = [] }: DefaultSidebarProps) {
  const { setContent } = useRightSidebar();

  useEffect(() => {
    setContent(
      <div className="space-y-4">
        <NoticeCard />
        <StatsCard posts={posts} />
        <PopularPostsCard posts={posts} />
        {tags.length > 0 && <TagsCard tags={tags} />}
      </div>
    );

    return () => setContent(null);
  }, [posts, tags, setContent]);

  return null;
}
