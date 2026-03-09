import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Users } from "lucide-react";
import type { FriendLinksPageProps } from "@/features/theme/contract/pages";

interface FriendLink {
  id: string;
  name: string;
  url: string;
  avatar?: string | null;
  description?: string | null;
  createdAt?: string;
}

function FriendLinkCard({ link }: { link: FriendLink }) {
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="zlu-friend-card group"
    >
      <img
        src={link.avatar || "/images/default-avatar.png"}
        alt={link.name}
        className="zlu-friend-avatar"
        loading="lazy"
      />
      <div className="zlu-friend-info min-w-0 flex-1">
        <h3 className="zlu-friend-name group-hover:text-blue-400 transition-colors truncate">
          {link.name}
        </h3>
        <p className="zlu-friend-description truncate">
          {link.description || "暂无描述"}
        </p>
      </div>
      <ArrowUpRight className="w-5 h-5 text-gray-500 group-hover:text-blue-400 transition-colors flex-shrink-0" />
    </a>
  );
}

export function FriendLinksPage({ links }: FriendLinksPageProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center py-6">
        <h1 className="text-3xl font-bold mb-2 text-white">友情链接</h1>
        <p className="text-gray-400">志同道合的站点，彼此链接，互相照亮</p>
      </div>

      {/* Links Grid */}
      {links.length > 0 ? (
        <div className="zlu-friend-grid">
          {links.map((link: any) => (
            <FriendLinkCard key={link.id} link={link} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 zlu-sidebar-card">
          <Users className="w-12 h-12 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400">暂无友链</p>
        </div>
      )}

      {/* Submit CTA */}
      {links.length > 0 && (
        <div className="border-t border-gray-700 pt-8">
          <div className="text-center space-y-4">
            <h3 className="text-lg font-semibold text-white">加入我们</h3>
            <p className="text-gray-400 text-sm">
              欢迎提交你的站点信息，审核通过后将在此展示
            </p>
            <Link
              to="/submit-friend-link"
              className="zlu-button zlu-button-primary inline-flex items-center gap-2"
            >
              申请加入
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
