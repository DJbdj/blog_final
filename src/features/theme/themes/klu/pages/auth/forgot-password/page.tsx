import { Link } from "@tanstack/react-router";
import { Mail, ArrowRight, CheckCircle, Loader2, AlertCircle } from "lucide-react";
import type { ForgotPasswordPageProps } from "@/features/theme/contract/pages";

export function ForgotPasswordPage({ forgotPasswordForm, turnstileElement }: ForgotPasswordPageProps) {
  const { register, errors, handleSubmit, isSubmitting, isSent } = forgotPasswordForm;

  if (isSent) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--klu-accent-success)]/20 flex items-center justify-center">
          <CheckCircle size={32} className="text-[var(--klu-accent-success)]" />
        </div>
        <h2 className="text-xl font-bold text-[var(--klu-text-primary)] mb-2">
          邮件已发送
        </h2>
        <p className="text-[var(--klu-text-secondary)]">
          请检查邮箱并点击链接重置密码
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-[var(--klu-text-primary)] mb-2">
          找回密码
        </h1>
        <p className="text-[var(--klu-text-secondary)]">
          输入邮箱接收重置链接
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
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
            <p className="mt-1.5 text-sm text-[var(--klu-accent-danger)] flex items-center gap-1">
              <AlertCircle size={14} />
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Turnstile */}
        <div className="py-2">{turnstileElement}</div>

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
              发送重置链接
              <ArrowRight size={16} />
            </>
          )}
        </button>
      </form>

      {/* Back to login */}
      <div className="text-center text-sm">
        <Link
          to="/login"
          className="text-[var(--klu-accent-primary)] hover:underline"
        >
          返回登录
        </Link>
      </div>
    </div>
  );
}
