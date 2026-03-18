import { ExternalLink, CheckCircle, Clock, XCircle } from "lucide-react";
import { FriendLinkSubmitForm } from "./form";
import type { SubmitFriendLinkPageProps } from "@/features/theme/contract/pages";
import { formatDate } from "@/lib/utils";

export function SubmitFriendLinkPage({
  myLinks,
  form,
}: SubmitFriendLinkPageProps) {
  const statusIcons = {
    approved: <CheckCircle size={14} className="text-green-600" />,
    pending: <Clock size={14} className="text-amber-500" />,
    rejected: <XCircle size={14} className="text-red-500" />,
  };

  const statusLabels = {
    approved: "已通过",
    pending: "审核中",
    rejected: "未通过",
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      {/* Header */}
      <header className="text-center">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">友链申请</h1>
        <p className="text-muted-foreground">
          提交你的站点信息，审核通过后将展示在友链页面
        </p>
      </header>

      {/* Submit Form */}
      <section className="magic-card p-6">
        <FriendLinkSubmitForm form={form} />
      </section>

      {/* My Links */}
      {myLinks.length > 0 && (
        <section>
          <h2 className="text-xl font-bold mb-4">我的申请</h2>
          <div className="space-y-3">
            {myLinks.map((link) => (
              <div
                key={link.id}
                className="magic-card p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium">{link.siteName}</span>
                    <div className="flex items-center gap-1">
                      {statusIcons[link.status]}
                      <span className="text-xs text-muted-foreground">
                        {statusLabels[link.status]}
                      </span>
                    </div>
                  </div>
                  <a
                    href={link.siteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 truncate"
                  >
                    <ExternalLink size={12} />
                    <span className="truncate">{link.siteUrl}</span>
                  </a>
                  {link.rejectionReason && (
                    <p className="text-sm text-red-500 mt-1">
                      拒绝理由：{link.rejectionReason}
                    </p>
                  )}
                </div>
                <div className="text-xs text-muted-foreground shrink-0">
                  {formatDate(link.createdAt)}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
