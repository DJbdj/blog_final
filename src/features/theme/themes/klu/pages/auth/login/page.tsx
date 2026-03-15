import { Link } from "@tanstack/react-router";
import { Mail, Lock, ArrowRight, AlertCircle, Github, Loader2 } from "lucide-react";
import type { LoginPageProps } from "@/features/theme/contract/pages";

export function LoginPage({
  isEmailConfigured,
  loginForm,
  socialLogin,
  turnstileElement,
}: LoginPageProps) {
  const {
    register,
    errors,
    handleSubmit,
    isSubmitting,
    rootError,
    handleResendVerification,
    turnstilePending,
  } = loginForm;

  const { isLoading: isSocialLoading, handleGithubLogin, turnstilePending: socialTurnstilePending } = socialLogin;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-[var(--klu-text-primary)] mb-2">
          欢迎回来
        </h1>
        <p className="text-[var(--klu-text-secondary)]">
          登录以继续访问
        </p>
      </div>

      {/* GitHub Login */}
      <button
        onClick={handleGithubLogin}
        disabled={isSocialLoading || socialTurnstilePending}
        className="klu-btn w-full border border-[var(--klu-border-primary)] hover:bg-[var(--klu-bg-tertiary)]"
      >
        {isSocialLoading || socialTurnstilePending ? (
          <Loader2 size={18} className="animate-spin" />
        ) : (
          <Github size={18} />
        )}
        使用 GitHub 登录
      </button>

      {isEmailConfigured && (
        <>
          {/* Divider */}
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-[var(--klu-border-primary)]" />
            <span className="text-sm text-[var(--klu-text-muted)]">或使用邮箱</span>
            <div className="flex-1 h-px bg-[var(--klu-border-primary)]" />
          </div>

          {/* Email Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Root Error */}
            {rootError && (
              <div className="p-3 rounded-lg bg-[var(--klu-accent-danger)]/10 text-[var(--klu-accent-danger)] text-sm flex items-center gap-2">
                <AlertCircle size={16} />
                {rootError}
              </div>
            )}

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-[var(--klu-text-secondary)] mb-1.5">
                邮箱
              </label>
              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--klu-text-muted)]"
                />
                <input
                  {...register("email")}
                  type="email"
                  placeholder="your@email.com"
                  className="klu-input w-full pl-10"
                />
              </div>
              {errors.email && (
                <p className="mt-1.5 text-sm text-[var(--klu-accent-danger)]">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-[var(--klu-text-secondary)] mb-1.5">
                密码
              </label>
              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--klu-text-muted)]"
                />
                <input
                  {...register("password")}
                  type="password"
                  placeholder="输入密码"
                  className="klu-input w-full pl-10"
                />
              </div>
              {errors.password && (
                <p className="mt-1.5 text-sm text-[var(--klu-accent-danger)]">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Turnstile */}
            <div className="py-2">{turnstileElement}</div>

            {/* Resend Verification */}
            {loginForm.isUnverifiedEmail && (
              <button
                type="button"
                onClick={handleResendVerification}
                disabled={isSubmitting}
                className="text-sm text-[var(--klu-accent-primary)] hover:underline"
              >
                重新发送验证邮件
              </button>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting || turnstilePending}
              className="klu-btn klu-btn-primary w-full"
            >
              {isSubmitting ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <>
                  登录
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>
        </>
      )}

      {/* Links */}
      {isEmailConfigured && (
        <div className="flex items-center justify-center gap-4 text-sm">
          <Link
            to="/register"
            className="text-[var(--klu-accent-primary)] hover:underline"
          >
            注册账号
          </Link>
          <span className="text-[var(--klu-border-primary)]">|</span>
          <Link
            to="/forgot-password"
            className="text-[var(--klu-text-secondary)] hover:text-[var(--klu-accent-primary)]"
          >
            忘记密码？
          </Link>
        </div>
      )}
    </div>
  );
}
