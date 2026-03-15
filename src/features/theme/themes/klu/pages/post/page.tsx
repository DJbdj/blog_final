import { Link } from "@tanstack/react-router";
import { Calendar, Clock, Hash, FileText, Pencil, ChevronLeft } from "lucide-react";
import type { PostPageProps } from "@/features/theme/contract/pages";
import { ContentRenderer } from "../../components/content/content-renderer";
import { KluCommentSection } from "../../components/comments/view/comment-section";
import { formatDate } from "@/lib/utils";
import { authClient } from "@/lib/auth/auth.client";

function TableOfContents({ headers }: { headers: PostPageProps["post"]["toc"] }) {
  if (!headers || headers.length === 0) return null;

  return (
    <div className="klu-card p-4 sticky top-8">
      <h3 className="text-sm font-semibold text-[var(--klu-text-primary)] mb-3">
        目录
      </h3>
      <nav className="space-y-1">
        {headers.map((header) => (
          <a
            key={header.id}
            href={`#${header.id}`}
            className={`block text-sm text-[var(--klu-text-secondary)] hover:text-[var(--klu-accent-primary)] transition-colors ${
              header.level === 1 ? "font-medium" : "pl-3"
            }`}
          >
            {header.text}
          </a>
        ))}
      </nav>
    </div>
  );
}

export function PostPage({ post }: PostPageProps) {
  const { data: session } = authClient.useSession();
  const wordCount = post.readTimeInMinutes * 300;

  return (
    <div className="space-y-6">
      {/* Back link */}
      <Link
        to="/posts"
        className="inline-flex items-center gap-1 text-sm text-[var(--klu-text-muted)] hover:text-[var(--klu-accent-primary)] transition-colors"
      >
        <ChevronLeft size={16} />
        返回文章列表
      </Link>

      {/* Main content with optional TOC sidebar */}
      <div className="flex gap-8">
        <div className="flex-1 min-w-0">
          {/* Article card */}
          <article className="klu-card overflow-hidden">
            {/* Header */}
            <div className="p-6 pb-4 border-b border-[var(--klu-border-primary)]">
              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag) => (
                    <Link
                      key={tag.id}
                      to="/posts"
                      search={{ tagName: tag.name }}
                      className="klu-tag"
                    >
                      <Hash size={12} />
                      {tag.name}
                    </Link>
                  ))}
                </div>
              )}

              {/* Title */}
              <h1 className="text-2xl md:text-3xl font-bold text-[var(--klu-text-primary)] mb-4">
                {post.title}
              </h1>

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--klu-text-muted)]">
                <span className="flex items-center gap-1.5">
                  <Calendar size={14} />
                  {formatDate(post.publishedAt || post.createdAt)}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock size={14} />
                  {post.readTimeInMinutes} 分钟阅读
                </span>
                <span className="flex items-center gap-1.5">
                  <FileText size={14} />
                  约 {wordCount} 字
                </span>
                {session?.user.role === "admin" && (
                  <Link
                    to="/admin/posts/edit/$id"
                    params={{ id: String(post.id) }}
                    className="flex items-center gap-1.5 text-[var(--klu-accent-primary)] hover:underline"
                  >
                    <Pencil size={14} />
                    编辑
                  </Link>
                )}
              </div>
            </div>

            {/* Summary */}
            {post.summary && (
              <div className="px-6 py-4 bg-[var(--klu-bg-tertiary)]/50 border-b border-[var(--klu-border-primary)]">
                <p className="text-[var(--klu-text-secondary)] italic">
                  {post.summary}
                </p>
              </div>
            )}

            {/* Content */}
            <div className="p-6 klu-content">
              <ContentRenderer content={post.contentJson || { type: "doc", content: [] }} />
            </div>

            {/* End marker */}
            <div className="px-6 py-8 flex items-center justify-center">
              <div className="h-px w-16 bg-[var(--klu-border-primary)]" />
              <span className="mx-4 text-xs font-mono tracking-widest text-[var(--klu-text-muted)]">
                END
              </span>
              <div className="h-px w-16 bg-[var(--klu-border-primary)]" />
            </div>
          </article>

          {/* Comments */}
          <div className="klu-card p-6">
            <KluCommentSection postId={post.id} />
          </div>
        </div>

        {/* TOC Sidebar - Desktop */}
        {post.toc && post.toc.length > 0 && (
          <aside className="hidden xl:block w-64 shrink-0">
            <TableOfContents headers={post.toc} />
          </aside>
        )}
      </div>
    </div>
  );
}

export function PostPageSkeleton() {
  return (
    <div className="space-y-6">
      {/* Back skeleton */}
      <div className="h-5 w-24 klu-skeleton" />

      {/* Article skeleton */}
      <div className="klu-card overflow-hidden">
        <div className="p-6 pb-4 border-b border-[var(--klu-border-primary)] space-y-4">
          <div className="flex gap-2">
            <div className="h-5 w-14 klu-skeleton rounded-full" />
            <div className="h-5 w-16 klu-skeleton rounded-full" />
          </div>
          <div className="h-9 w-3/4 klu-skeleton" />
          <div className="flex gap-4">
            <div className="h-4 w-24 klu-skeleton" />
            <div className="h-4 w-28 klu-skeleton" />
            <div className="h-4 w-20 klu-skeleton" />
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div className="h-4 w-full klu-skeleton" />
          <div className="h-4 w-full klu-skeleton" />
          <div className="h-4 w-2/3 klu-skeleton" />
          <div className="h-32 w-full klu-skeleton my-6" />
          <div className="h-4 w-full klu-skeleton" />
          <div className="h-4 w-full klu-skeleton" />
          <div className="h-4 w-3/4 klu-skeleton" />
        </div>
      </div>
    </div>
  );
}
