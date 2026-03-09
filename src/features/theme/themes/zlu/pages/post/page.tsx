import { Link } from "@tanstack/react-router";
import { Calendar, Clock, Tag, ArrowLeft } from "lucide-react";
import type { PostPageProps } from "@/features/theme/contract/pages";
import { ContentRendererWrapper as ContentRenderer } from "../../components/content/content-renderer";
import { formatDate } from "@/lib/utils";

export function PostPage({ post }: PostPageProps) {
  return (
    <article className="zlu-article">
      {/* Back Button */}
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        返回首页
      </Link>

      {/* Article Header */}
      <header className="zlu-article-header">
        <h1 className="zlu-article-title">{post.title}</h1>

        {post.summary && (
          <p className="text-gray-400 mb-6 text-lg">{post.summary}</p>
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
      <footer className="mt-8 pt-6 border-t border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {post.tags && post.tags.length > 0 && (
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Tag className="w-4 h-4" />
                {post.tags.map((tag: any) => (
                  <Link
                    key={tag.id}
                    to="/posts"
                    search={{ tagName: tag.name }}
                    className="text-blue-400 hover:text-blue-300"
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
