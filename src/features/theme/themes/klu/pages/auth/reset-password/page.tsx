import { Link } from "@tanstack/react-router";
import { Lock, ArrowRight, AlertCircle, Loader2 } from "lucide-react";
import type { ResetPasswordPageProps } from "@/features/theme/contract/pages";

export function ResetPasswordPage({
  resetPasswordForm,
  token,
  error,
}: ResetPasswordPageProps) {
  const { register, errors, handleSubmit, isSubmitting } = resetPasswordForm;

  if (!token && !error) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--klu-accent-danger)]/20 flex items-center justify-center">
          <Lock size={32} className="text-[var(--klu-accent-danger)]" />
        </div>
        <h2 className="text-xl font-bold text-[var(--klu-text-primary)] mb-2">
          无法重置密码
        </h2>
        <p className="text-[var(--klu-text-secondary)] mb-4">
          缺少必需的授权令牌
        </p>
        <Link to="/login" className="klu-btn klu-btn-primary">
          返回登录
        </Link>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--klu-accent-danger)]/20 flex items-center justify-center">
          <Lock size={32} className="text-[var(--klu-accent-danger)]" />
        </div>
        <h2 className="text-xl font-bold text-[var(--klu-text-primary)] mb-2">
          重置链接无效
        </h2>
        <p className="text-[var(--klu-text-secondary)] mb-4">{error}</p>
        <Link to="/forgot-password" className="klu-btn klu-btn-primary">
          重新请求链接
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-[var(--klu-text-primary)] mb-2">
          重置密码
        </h1>
        <p className="text-[var(--klu-text-secondary)]">
          设置新密码
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* New Password */}
        <div>
          <label className="block text-sm font-medium text-[var(--klu-text-secondary)] mb-1.5">
            新密码
          </label>
          <div className="relative">
            <Lock
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--klu-text-muted)]"
            />
            <input
              {...register("password")}
              type="password"
              placeholder="设置新密码"
              className="klu-input w-full pl-10"
            />
          </div>
          {errors.password && (
            <p className="mt-1.5 text-sm text-[var(--klu-accent-danger)] flex items-center gap-1">
              <AlertCircle size={14} />
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-sm font-medium text-[var(--klu-text-secondary)] mb-1.5">
            确认密码
          </label>
          <div className="relative">
            <Lock
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--klu-text-muted)]"
            />
            <input
              {...register("confirmPassword")}
              type="password"
              placeholder="再次输入新密码"
              className="klu-input w-full pl-10"
            />
          </div>
          {errors.confirmPassword && (
            <p className="mt-1.5 text-sm text-[var(--klu-accent-danger)] flex items-center gap-1">
              <AlertCircle size={14} />
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="klu-btn klu-btn-primary w-full"
        >
          {isSubmitting ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            <>
              重置密码
              <ArrowRight size={16} />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
