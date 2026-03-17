import { Link } from "@tanstack/react-router";
import { Search, ArrowLeft } from "lucide-react";
import type { SearchPageProps } from "@/features/theme/contract/pages";

export function SearchPage({
  query,
  results,
  isSearching,
  onQueryChange,
  onBack,
}: SearchPageProps) {
  return (
    <div className="space-y-6">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-[var(--zlu-text-secondary)] hover:text-[var(--zlu-text-primary)] transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        返回
      </button>

      {/* Search Box */}
      <div className="zlu-search-box">
        <Search className="zlu-search-icon" />
        <input
          type="text"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="搜索文章..."
          className="zlu-search-input"
          autoFocus
        />
      </div>

      {/* Results */}
      {isSearching ? (
        <div className="text-center py-12">
          <div className="inline-block w-8 h-8 border-2 border-[var(--zlu-primary)] border-t-transparent rounded-full animate-spin" />
          <p className="text-[var(--zlu-text-secondary)] mt-4">搜索中...</p>
        </div>
      ) : results.length > 0 ? (
        <div className="space-y-4">
          <p className="text-[var(--zlu-text-secondary)] text-sm">
            找到 {results.length} 个结果
          </p>
          {results.map((result) => (
            <article
              key={result.post.id}
              className="zlu-post-card p-6"
            >
              <h3 className="zlu-post-card-title text-lg mb-2">
                <Link
                  to="/post/$slug"
                  params={{ slug: result.post.slug }}
                  className="hover:underline"
                >
                  {result.matches.title || result.post.title}
                </Link>
              </h3>
              <p className="text-[var(--zlu-text-secondary)] text-sm mb-4">
                {result.matches.summary || result.post.summary || ""}
              </p>
              {result.post.tags && result.post.tags.length > 0 && (
                <div className="zlu-post-tags mb-4">
                  {result.post.tags.map((tag: string) => (
                    <span key={tag} className="zlu-tag">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
              <div className="flex items-center gap-2 text-xs text-[var(--zlu-text-tertiary)]">
                {result.post.tags && result.post.tags.length > 0 && (
                  <span>
                    {result.post.tags.slice(0, 3).map((tag: string) => (
                      <span key={tag} className="zlu-tag mr-1">
                        #{tag}
                      </span>
                    ))}
                  </span>
                )}
              </div>
            </article>
          ))}
        </div>
      ) : query ? (
        <div className="text-center py-12">
          <Search className="w-12 h-12 text-[var(--zlu-text-tertiary)] mx-auto mb-4" />
          <p className="text-[var(--zlu-text-secondary)]">未找到相关结果</p>
          <p className="text-[var(--zlu-text-tertiary)] text-sm mt-2">
            尝试其他关键词或浏览全部文章
          </p>
        </div>
      ) : (
        <div className="text-center py-12">
          <Search className="w-12 h-12 text-[var(--zlu-text-tertiary)] mx-auto mb-4" />
          <p className="text-[var(--zlu-text-secondary)]">输入关键词开始搜索</p>
        </div>
      )}
    </div>
  );
}
