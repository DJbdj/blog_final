import { Link } from "@tanstack/react-router";
import { Globe, Link2, FileText, AlertCircle, CheckCircle, Clock, XCircle, ArrowRight } from "lucide-react";
import type { SubmitFriendLinkPageProps } from "@/features/theme/contract/pages";

export function SubmitFriendLinkPage({
  myLinks,
  form,
}: SubmitFriendLinkPageProps) {
  const {
    register,
    errors,
    handleSubmit,
    isSubmitting,
    turnstileProps,
  } = form;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle size={16} className="text-[var(--klu-accent-success)]" />;
      case "pending":
        return <Clock size={16} className="text-[var(--klu-accent-warning)]" />;
      case "rejected":
        return <XCircle size={16} className="text-[var(--klu-accent-danger)]" />;
      default:
        return null;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "approved":
        return "已通过";
      case "pending":
        return "审核中";
      case "rejected":
        return "已拒绝";
      default:
        return status;
    }
  };

  return (
    <div className="space-y-6">
      {/* Back link */}
      <Link
        to="/friend-links"
        className="inline-flex items-center gap-1 text-sm text-[var(--klu-text-muted)] hover:text-[var(--klu-accent-primary)] transition-colors"
      >
        <ArrowRight size={16} className="rotate-180" />
        返回友链列表
      </Link>

      {/* My Links */}
      {myLinks.length > 0 && (
        <div className="klu-card p-6">
          <h2 className="text-lg font-semibold text-[var(--klu-text-primary)] mb-4">
            我的申请
          </h2>
          <div className="space-y-3">
            {myLinks.map((link) => (
              <div
                key={link.id}
                className="flex items-center justify-between p-3 rounded-lg bg-[var(--klu-bg-tertiary)]"
              >
                <div className="flex items-center gap-3">
                  <Globe size={18} className="text-[var(--klu-text-muted)]" />
                  <div>
                    <p className="font-medium text-[var(--klu-text-primary)]">
                      {link.siteName}
                    </p>
                    <p className="text-xs text-[var(--klu-text-muted)] truncate max-w-[200px]">
                      {link.siteUrl}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  {getStatusIcon(link.status)}
                  <span className={`text-sm ${
                    link.status === "approved"
                      ? "text-[var(--klu-accent-success)]"
                      : link.status === "pending"
                      ? "text-[var(--klu-accent-warning)]"
                      : "text-[var(--klu-accent-danger)]"
                  }`}>
                    {getStatusText(link.status)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Submit Form */}
      <div className="klu-card p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-[var(--klu-accent-primary)]/20 flex items-center justify-center">
            <Link2 size={20} className="text-[var(--klu-accent-primary)]" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-[var(--klu-text-primary)]">
              申请友情链接
            </h1>
            <p className="text-sm text-[var(--klu-text-secondary)]">
              填写信息提交友链申请
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Site Name */}
          <div>
            <label className="block text-sm font-medium text-[var(--klu-text-secondary)] mb-1.5">
              网站名称
            </label>
            <div className="relative">
              <Globe
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--klu-text-muted)]"
              />
              <input
                {...register("siteName")}
                type="text"
                placeholder="你的网站名称"
                className="klu-input w-full pl-10"
              />
            </div>
            {errors.siteName && (
              <p className="mt-1.5 text-sm text-[var(--klu-accent-danger)] flex items-center gap-1">
                <AlertCircle size={14} />
                {errors.siteName.message}
              </p>
            )}
          </div>

          {/* Site URL */}
          <div>
            <label className="block text-sm font-medium text-[var(--klu-text-secondary)] mb-1.5">
              网站地址
            </label>
            <div className="relative">
              <Link2
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--klu-text-muted)]"
              />
              <input
                {...register("siteUrl")}
                type="url"
                placeholder="https://example.com"
                className="klu-input w-full pl-10"
              />
            </div>
            {errors.siteUrl && (
              <p className="mt-1.5 text-sm text-[var(--klu-accent-danger)] flex items-center gap-1">
                <AlertCircle size={14} />
                {errors.siteUrl.message}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-[var(--klu-text-secondary)] mb-1.5">
              网站描述
            </label>
            <div className="relative">
              <FileText
                size={18}
                className="absolute left-3 top-3 text-[var(--klu-text-muted)]"
              />
              <textarea
                {...register("description")}
                rows={3}
                placeholder="简单介绍一下你的网站..."
                className="klu-input w-full pl-10 resize-none"
              />
            </div>
            {errors.description && (
              <p className="mt-1.5 text-sm text-[var(--klu-accent-danger)] flex items-center gap-1">
                <AlertCircle size={14} />
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Logo URL (Optional) */}
          <div>
            <label className="block text-sm font-medium text-[var(--klu-text-secondary)] mb-1.5">
              Logo 地址 <span className="text-[var(--klu-text-muted)]">(可选)</span>
            </label>
            <input
              {...register("logoUrl")}
              type="url"
              placeholder="https://example.com/logo.png"
              className="klu-input w-full"
            />
            {errors.logoUrl && (
              <p className="mt-1.5 text-sm text-[var(--klu-accent-danger)] flex items-center gap-1">
                <AlertCircle size={14} />
                {errors.logoUrl.message}
              </p>
            )}
          </div>

          {/* Turnstile */}
          <div className="py-2">
            <div {...turnstileProps} />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="klu-btn klu-btn-primary w-full"
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                提交中...
              </div>
            ) : (
              "提交申请"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
