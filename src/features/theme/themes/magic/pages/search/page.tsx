import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Search, Tag } from "lucide-react";
import type { SearchPageProps } from "@/features/theme/contract/pages";

export function SearchPage({
  query,
  results,
  isSearching,
  onQueryChange,
  onSelectPost,
  onBack,
}: SearchPageProps) {
  const [searchQuery, setSearchQuery] = useState(query);

  useEffect(() => {
    setSearchQuery(query);
  }, [query]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onQueryChange(searchQuery);
  };

  const handleEscape = () => {
    onBack();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
      {/* Search Header */}
      <div className="mb-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4"
        >
          ← 返回
        </button>

        <form onSubmit={handleSubmit} className="relative">
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    onQueryChange(searchQuery);
                  }
                }}
                onDoubleClick={handleEscape}
                placeholder="搜索文章..."
                className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:border-primary text-lg"
                autoFocus
              />
            </div>
            <button
              type="submit"
              className="magic-button"
              disabled={isSearching}
            >
              {isSearching ? "搜索中..." : "搜索"}
            </button>
          </div>
        </form>
      </div>

      {/* Results */}
      <div className="space-y-6">
        {/* Search Info */}
        {query && (
          <div className="text-center py-4">
            <p className="text-muted-foreground">
              搜索 "{query}" 找到 {results.length} 个结果
            </p>
          </div>
        )}

        {/* Results List */}
        {results.length > 0 ? (
          <div className="space-y-4">
            {results.map((result) => (
              <Link
                key={result.post.id}
                to="/post/$slug"
                params={{ slug: result.post.slug }}
                onClick={() => onSelectPost(result.post.slug)}
                className="magic-card p-6 hover:shadow-lg transition-all duration-300"
              >
                {/* Title */}
                <h3 className="text-lg font-semibold mb-2 text-primary">
                  {result.matches?.title || result.post.title}
                </h3>

                {/* Summary */}
                {result.matches?.summary ? (
                  <p className="text-muted-foreground mb-3">
                    {result.matches.summary}
                  </p>
                ) : (
                  <p className="text-muted-foreground mb-3">
                    {result.post.summary}
                  </p>
                )}

                {/* Content Snippet */}
                {result.matches?.contentSnippet && (
                  <div className="bg-secondary/50 p-3 rounded-lg mb-3">
                    <p className="text-sm text-muted-foreground">
                      {result.matches.contentSnippet}
                    </p>
                  </div>
                )}

                {/* Meta */}
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  {result.post.tags && result.post.tags.length > 0 && (
                    <div className="flex items-center gap-1">
                      <Tag size={14} />
                      <div className="flex gap-1">
                        {result.post.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="magic-tag">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        ) : (
          /* No Results */
          <div className="text-center py-12">
            <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">没有找到相关内容</h3>
            <p className="text-muted-foreground">
              {query
                ? `试试使用不同的关键词搜索`
                : `输入关键词开始搜索`}
            </p>
            {query && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  onQueryChange("");
                }}
                className="magic-button magic-button-outline mt-4"
              >
                清空搜索
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}