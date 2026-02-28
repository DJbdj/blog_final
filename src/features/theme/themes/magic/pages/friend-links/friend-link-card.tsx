import { ExternalLink } from "lucide-react";
import Link from "@tanstack/react-router";
import type { FriendLink as FriendLinkType } from "@/features/friend-links/friend-links.schema";

interface FriendLinkCardProps {
  link: FriendLinkType;
}

export function FriendLinkCard({ link }: FriendLinkCardProps) {
  const logoSize = 48;

  return (
    <a
      href={link.siteUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="magic-card p-6 hover:shadow-xl transition-all duration-300 group"
    >
      <div className="flex items-start gap-4">
        {/* Logo */}
        <div
          className="flex-shrink-0 rounded-lg overflow-hidden bg-secondary/30 flex items-center justify-center"
          style={{ width: logoSize, height: logoSize }}
        >
          {link.logoUrl ? (
            <img
              src={link.logoUrl}
              alt={link.siteName}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-lg font-bold text-primary">
              {link.siteName.charAt(0).toUpperCase()}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold mb-1 group-hover:text-primary transition-colors truncate">
            {link.siteName}
          </h3>
          {link.description && (
            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
              {link.description}
            </p>
          )}
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <ExternalLink size={12} />
            <span className="truncate">{link.siteUrl}</span>
          </div>
        </div>
      </div>
    </a>
  );
}