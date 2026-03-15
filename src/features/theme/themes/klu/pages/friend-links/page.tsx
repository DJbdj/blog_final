import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ExternalLink, Plus, Users, Globe } from "lucide-react";
import type { FriendLinksPageProps } from "@/features/theme/contract/pages";

export function FriendLinksPage({ links }: FriendLinksPageProps) {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const approvedLinks = links.filter((link) => link.status === "approved");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="klu-card p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-[var(--klu-text-primary)] mb-2">
              友情链接
            </h1>
            <p className="text-sm text-[var(--klu-text-secondary)]">
              与 {approvedLinks.length} 位朋友相互连接
            </p>
          </div>
          <Link
            to="/submit-friend-link"
            className="klu-btn klu-btn-primary"
          >
            <Plus size={16} />
            申请友链
          </Link>
        </div>
      </div>

      {/* Links Grid */}
      {approvedLinks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {approvedLinks.map((link, index) => (
            <a
              key={link.id}
              href={link.siteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="klu-card p-4 group klu-animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
              onMouseEnter={() => setHoveredId(link.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="flex items-start gap-4">
                {/* Avatar */}
                <div className="shrink-0">
                  {link.logoUrl ? (
                    <img
                      src={link.logoUrl}
                      alt={link.siteName}
                      className="w-12 h-12 rounded-xl object-cover ring-2 ring-[var(--klu-border-primary)] group-hover:ring-[var(--klu-accent-primary)] transition-all"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-xl bg-[var(--klu-accent-primary)]/20 flex items-center justify-center ring-2 ring-[var(--klu-border-primary)] group-hover:ring-[var(--klu-accent-primary)] transition-all">
                      <Globe size={24} className="text-[var(--klu-accent-primary)]" />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-medium text-[var(--klu-text-primary)] group-hover:text-[var(--klu-accent-primary)] transition-colors truncate">
                      {link.siteName}
                    </h3>
                    <ExternalLink
                      size={14}
                      className={`text-[var(--klu-text-muted)] transition-all ${
                        hoveredId === link.id
                          ? "opacity-100 translate-x-0"
                          : "opacity-0 -translate-x-2"
                      }`}
                    />
                  </div>
                  {link.description && (
                    <p className="text-sm text-[var(--klu-text-secondary)] line-clamp-2">
                      {link.description}
                    </p>
                  )}
                  <p className="text-xs text-[var(--klu-text-muted)] mt-2 truncate">
                    {link.siteUrl}
                  </p>
                </div>
              </div>

              {/* Owner info */}
              {link.user && (
                <div className="flex items-center gap-2 mt-3 pt-3 border-t border-[var(--klu-border-primary)]">
                  {link.user.image ? (
                    <img
                      src={link.user.image}
                      alt={link.user.name}
                      className="w-5 h-5 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-5 h-5 rounded-full bg-[var(--klu-bg-tertiary)] flex items-center justify-center">
                      <Users size={10} />
                    </div>
                  )}
                  <span className="text-xs text-[var(--klu-text-muted)]">
                    {link.user.name}
                  </span>
                </div>
              )}
            </a>
          ))}
        </div>
      ) : (
        <div className="klu-card p-8 text-center">
          <Users size={48} className="mx-auto mb-4 text-[var(--klu-text-muted)]" />
          <h3 className="text-lg font-medium text-[var(--klu-text-primary)] mb-2">
            暂无友链
          </h3>
          <p className="text-sm text-[var(--klu-text-secondary)] mb-4">
            成为第一个申请友情链接的朋友吧
          </p>
          <Link to="/submit-friend-link" className="klu-btn klu-btn-primary">
            申请友链
          </Link>
        </div>
      )}
    </div>
  );
}

export function FriendLinksPageSkeleton() {
  return (
    <div className="space-y-6">
      <div className="klu-card p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="h-6 w-24 klu-skeleton" />
            <div className="h-4 w-32 klu-skeleton" />
          </div>
          <div className="h-10 w-24 klu-skeleton rounded-lg" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="klu-card p-4 flex items-start gap-4">
            <div className="w-12 h-12 klu-skeleton rounded-xl" />
            <div className="flex-1 space-y-2">
              <div className="h-5 w-32 klu-skeleton" />
              <div className="h-4 w-full klu-skeleton" />
              <div className="h-3 w-24 klu-skeleton" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
