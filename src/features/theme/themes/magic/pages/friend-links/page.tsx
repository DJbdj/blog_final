import { ArrowUpRight } from "lucide-react";
import { FriendLinksPage, FriendLinksPageSkeleton } from "@/features/theme/themes/magic/pages/friend-links/page";
import { FriendLinkCard } from "./friend-link-card";
import type { FriendLinksPageProps } from "@/features/theme/contract/pages";

export function FriendLinksPage({ links }: FriendLinksPageProps) {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Header */}
      <header className="mb-12 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">友情链接</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          志同道合的站点，彼此链接，互相照亮
        </p>
      </header>

      {/* Links Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {links.map((link) => (
          <FriendLinkCard key={link.id} link={link} />
        ))}
      </div>

      {/* Empty State */}
      {links.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">暂无友链</p>
        </div>
      )}

      {/* Submit CTA */}
      <div className="border-t border-border pt-12">
        <div className="max-w-md mx-auto text-center space-y-4">
          <h3 class="text-lg font-semibold">加入我们</h3>
          <p class="text-muted-foreground">
            欢迎提交你的站点信息，审核通过后将在此展示
          </p>
          <a
            href="/submit-friend-link"
            class="magic-button inline-flex items-center gap-2"
          >
            申请加入
            <ArrowUpRight size={16} />
          </a>
        </div>
      </div>
    </div>
  );
}