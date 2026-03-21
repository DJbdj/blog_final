"use client";

import { useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { Calendar, Clock, Tag, ArrowLeft } from "lucide-react";
import type { PostPageProps } from "@/features/theme/contract/pages";
import { ContentRendererWrapper as ContentRenderer } from "@/features/theme/themes/zlu/components/content/content-renderer";
import { PostTableOfContents } from "./components/table-of-contents";
import { useRightSidebar } from "@/features/theme/themes/zlu/contexts/right-sidebar-context";
import { formatDate } from "@/lib/utils";

export function PostPage({ post }: PostPageProps) {
  const { setContent } = useRightSidebar();

  useEffect(() => {
    setContent(<PostTableOfContents content={post.contentJson} />);
    return () => setContent(null);
  }, [post.contentJson, setContent]);

  return (
    <article className="zlu-article">
      {/* Back Button */}
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-[var(--zlu-text-secondary)] hover:text-[var(--zlu-text-primary)] mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        返回首页
      </Link>

      {/* Article Header */}
      <header className="zlu-article-header">
        <h1 className="zlu-article-title">{post.title}</h1>

        {post.summary && (
          <p className="text-[var(--zlu-text-secondary)] mb-6 text-lg">{post.summary}</p>
        )}

        <div className="zlu-article-meta">
          {post.publishedAt && (
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {formatDate(post.publishedAt)}
            </span>
          )}
          {post.readTimeInMinutes && (
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {post.readTimeInMinutes} 分钟阅读
            </span>
          )}
        </div>

        {post.tags && post.tags.length > 0 && (
          <div className="zlu-post-tags mt-4">
            {post.tags.map((tag: any) => (
              <Link
                key={tag.id}
                to="/posts"
                search={{ tagName: tag.name }}
                className="zlu-tag"
              >
                #{tag.name}
              </Link>
            ))}
          </div>
        )}
      </header>

      {/* Article Content */}
      <div className="zlu-article-content">
        <ContentRenderer content={post.contentJson} />
      </div>

      {/* Article Footer */}
      <footer className="mt-8 pt-6 border-t border-[var(--zlu-border)]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {post.tags && post.tags.length > 0 && (
              <div className="flex items-center gap-2 text-sm text-[var(--zlu-text-secondary)]">
                <Tag className="w-4 h-4" />
                {post.tags.map((tag: any) => (
                  <Link
                    key={tag.id}
                    to="/posts"
                    search={{ tagName: tag.name }}
                    className="text-[var(--zlu-primary)] hover:text-[var(--zlu-primary-hover)]"
                  >
                    #{tag.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </footer>
    </article>
  );
}
