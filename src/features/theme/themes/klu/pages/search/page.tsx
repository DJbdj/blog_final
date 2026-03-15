import { useRef, useEffect } from "react";
import { Search, X, ArrowRight, Hash, FileText } from "lucide-react";
import type { SearchPageProps } from "@/features/theme/contract/pages";

export function SearchPage({
  query,
  results,
  isSearching,
  onQueryChange,
  onSelectPost,
  onBack,
}: SearchPageProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-1 text-sm text-[var(--klu-text-muted)] hover:text-[var(--klu-accent-primary)] transition-colors"
      >
        <ArrowRight size={16} className="rotate-180" />
        返回
      </button>

      {/* Search input */}
      <div className="klu-card p-6">
        <h1 className="text-xl font-bold text-[var(--klu-text-primary)] mb-4">
          搜索文章
        </h1>
        <div className="relative">
          <Search
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--klu-text-muted)]"
          />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="输入关键词搜索..."
            className="klu-input w-full pl-12 pr-10 py-3 text-lg"
          />
          {query && (
            <button
              onClick={() => onQueryChange("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--klu-text-muted)] hover:text-[var(--klu-text-primary)] transition-colors"
            >
              <X size={18} />
            </button>
          )}
        </div>
        {query && (
          <p className="mt-3 text-sm text-[var(--klu-text-muted)]">
            找到 {results.length} 个结果
          </p>
        )}
      </div>

      {/* Results */}
      <div className="space-y-3">
        {isSearching ? (
          // Loading state
          Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="klu-card p-4 space-y-3">
              <div className="h-5 w-3/4 klu-skeleton" />
              <div className="h-4 w-full klu-skeleton" />
              <div className="h-4 w-1/2 klu-skeleton" />
            </div>
          ))
        ) : results.length > 0 ? (
          results.map((result, index) => (
            <div
              key={result.post.id}
              className="klu-card klu-animate-fade-in cursor-pointer group"
              style={{ animationDelay: `${index * 50}ms` }}
              onClick={() => onSelectPost(result.post.slug)}
            >
              <div className="p-4">
                {/* Title with highlight */}
                <h3
                  className="font-medium text-[var(--klu-text-primary)] group-hover:text-[var(--klu-accent-primary)] transition-colors mb-2"
                  dangerouslySetInnerHTML={{
                    __html: result.matches.title || result.post.title,
                  }}
                />

                {/* Summary with highlight */}
                {result.matches.summary && (
                  <p
                    className="text-sm text-[var(--klu-text-secondary)] mb-2 line-clamp-2"
                    dangerouslySetInnerHTML={{
                      __html: result.matches.summary,
                    }}
                  />
                )}

                {/* Content snippet */}
                {result.matches.contentSnippet && (
                  <p
                    className="text-sm text-[var(--klu-text-muted)] line-clamp-2"
                    dangerouslySetInnerHTML={{
                      __html: result.matches.contentSnippet,
                    }}
                  />
                )}

                {/* Tags */}
                {result.post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {result.post.tags.map((tag) => (
                      <span key={tag} className="klu-tag">
                        <Hash size={10} />
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))
        ) : query ? (
          <div className="klu-card p-8 text-center">
            <FileText size={48} className="mx-auto mb-4 text-[var(--klu-text-muted)]" />
            <h3 className="text-lg font-medium text-[var(--klu-text-primary)] mb-2">
              未找到结果
            </h3>
            <p className="text-sm text-[var(--klu-text-secondary)]">
              尝试使用其他关键词搜索
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export function SearchPageSkeleton() {
  return (
    <div className="space-y-6">
      <div className="h-5 w-16 klu-skeleton" />
      <div className="klu-card p-6 space-y-4">
        <div className="h-6 w-32 klu-skeleton" />
        <div className="h-12 w-full klu-skeleton" />
      </div>
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="klu-card p-4 space-y-3">
          <div className="h-5 w-3/4 klu-skeleton" />
          <div className="h-4 w-full klu-skeleton" />
          <div className="h-4 w-2/3 klu-skeleton" />
        </div>
      ))}
    </div>
  );
}
