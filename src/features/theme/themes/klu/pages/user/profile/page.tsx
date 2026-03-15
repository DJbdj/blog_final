import { User, Lock, Bell, LogOut, Camera, Loader2 } from "lucide-react";
import type { ProfilePageProps } from "@/features/theme/contract/pages";

export function ProfilePage({
  user,
  profileForm,
  passwordForm,
  notification,
  logout,
}: ProfilePageProps) {
  return (
    <div className="space-y-6">
      {/* Profile Card */}
      <div className="klu-card p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="relative">
            {user.image ? (
              <img
                src={user.image}
                alt={user.name}
                className="w-20 h-20 rounded-xl object-cover ring-2 ring-[var(--klu-border-primary)]"
              />
            ) : (
              <div className="w-20 h-20 rounded-xl bg-[var(--klu-accent-primary)]/20 flex items-center justify-center ring-2 ring-[var(--klu-border-primary)]">
                <User size={32} className="text-[var(--klu-accent-primary)]" />
              </div>
            )}
            <button className="absolute -bottom-2 -right-2 w-8 h-8 rounded-lg bg-[var(--klu-bg-tertiary)] border border-[var(--klu-border-primary)] flex items-center justify-center hover:bg-[var(--klu-bg-elevated)] transition-colors">
              <Camera size={14} />
            </button>
          </div>
          <div>
            <h1 className="text-xl font-bold text-[var(--klu-text-primary)]">
              {user.name}
            </h1>
            <p className="text-sm text-[var(--klu-text-muted)]">{user.email}</p>
            <span className="inline-block mt-2 text-xs px-2 py-0.5 rounded-full bg-[var(--klu-accent-primary)]/20 text-[var(--klu-accent-primary)]">
              {user.role === "admin" ? "管理员" : "用户"}
            </span>
          </div>
        </div>

        {/* Profile Form */}
        <form onSubmit={profileForm.handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[var(--klu-text-secondary)] mb-1.5">
              用户名
            </label>
            <div className="relative">
              <User
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--klu-text-muted)]"
              />
              <input
                {...profileForm.register("name")}
                type="text"
                className="klu-input w-full pl-10"
              />
            </div>
            {profileForm.errors.name && (
              <p className="mt-1.5 text-sm text-[var(--klu-accent-danger)]">
                {profileForm.errors.name.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={profileForm.isSubmitting}
            className="klu-btn klu-btn-primary"
          >
            {profileForm.isSubmitting ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              "保存修改"
            )}
          </button>
        </form>
      </div>

      {/* Notification Settings */}
      <div className="klu-card p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-[var(--klu-accent-primary)]/20 flex items-center justify-center">
            <Bell size={20} className="text-[var(--klu-accent-primary)]" />
          </div>
          <div>
            <h2 className="font-semibold text-[var(--klu-text-primary)]">
              通知设置
            </h2>
            <p className="text-sm text-[var(--klu-text-secondary)]">
              管理邮件通知
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between py-3 border-t border-[var(--klu-border-primary)]">
          <div>
            <p className="font-medium text-[var(--klu-text-primary)]">
              评论回复通知
            </p>
            <p className="text-sm text-[var(--klu-text-muted)]">
              当有人回复您的评论时发送邮件
            </p>
          </div>
          <button
            onClick={notification.toggle}
            disabled={notification.isPending}
            className={`relative w-11 h-6 rounded-full transition-colors ${
              notification.enabled
                ? "bg-[var(--klu-accent-primary)]"
                : "bg-[var(--klu-bg-tertiary)]"
            }`}
          >
            <span
              className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${
                notification.enabled ? "translate-x-5" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Password Change (only for email users) */}
      {passwordForm && (
        <div className="klu-card p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-[var(--klu-accent-primary)]/20 flex items-center justify-center">
              <Lock size={20} className="text-[var(--klu-accent-primary)]" />
            </div>
            <div>
              <h2 className="font-semibold text-[var(--klu-text-primary)]">
                修改密码
              </h2>
              <p className="text-sm text-[var(--klu-text-secondary)]">
                更新您的登录密码
              </p>
            </div>
          </div>

          <form onSubmit={passwordForm.handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[var(--klu-text-secondary)] mb-1.5">
                当前密码
              </label>
              <input
                {...passwordForm.register("currentPassword")}
                type="password"
                placeholder="当前密码"
                className="klu-input w-full"
              />
              {passwordForm.errors.currentPassword && (
                <p className="mt-1.5 text-sm text-[var(--klu-accent-danger)]">
                  {passwordForm.errors.currentPassword.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--klu-text-secondary)] mb-1.5">
                新密码
              </label>
              <input
                {...passwordForm.register("newPassword")}
                type="password"
                placeholder="新密码"
                className="klu-input w-full"
              />
              {passwordForm.errors.newPassword && (
                <p className="mt-1.5 text-sm text-[var(--klu-accent-danger)]">
                  {passwordForm.errors.newPassword.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--klu-text-secondary)] mb-1.5">
                确认新密码
              </label>
              <input
                {...passwordForm.register("confirmPassword")}
                type="password"
                placeholder="确认新密码"
                className="klu-input w-full"
              />
              {passwordForm.errors.confirmPassword && (
                <p className="mt-1.5 text-sm text-[var(--klu-accent-danger)]">
                  {passwordForm.errors.confirmPassword.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={passwordForm.isSubmitting}
              className="klu-btn klu-btn-primary"
            >
              {passwordForm.isSubmitting ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                "更新密码"
              )}
            </button>
          </form>
        </div>
      )}

      {/* Logout */}
      <div className="klu-card p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[var(--klu-accent-danger)]/20 flex items-center justify-center">
              <LogOut size={20} className="text-[var(--klu-accent-danger)]" />
            </div>
            <div>
              <h2 className="font-semibold text-[var(--klu-text-primary)]">
                退出登录
              </h2>
              <p className="text-sm text-[var(--klu-text-secondary)]">
                退出当前账号
              </p>
            </div>
          </div>
          <button
            onClick={logout}
            className="klu-btn border border-[var(--klu-accent-danger)]/50 text-[var(--klu-accent-danger)] hover:bg-[var(--klu-accent-danger)]/10"
          >
            退出
          </button>
        </div>
      </div>
    </div>
  );
}
