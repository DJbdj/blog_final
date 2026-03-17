"use client";

import { Link } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import type { ForgotPasswordPageProps } from "@/features/theme/contract/pages";

export function ForgotPasswordPage({ forgotPasswordForm }: ForgotPasswordPageProps) {
  const { register, errors, handleSubmit, isSubmitting, isSent, sentEmail } = forgotPasswordForm;

  return (
    <div className="zlu-auth-card">
      <div className="text-center mb-6">
        <h1 className="zlu-auth-title">忘记密码</h1>
        <p className="zlu-auth-subtitle">输入邮箱地址重置密码</p>
      </div>

      {isSent ? (
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
            <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-lg font-semibold text-[var(--zlu-text-primary)]">邮件已发送</h2>
          <p className="text-[var(--zlu-text-secondary)] text-sm">
            请检查邮箱 {sentEmail} 中的重置链接
          </p>
          <p className="text-[var(--zlu-text-tertiary)] text-xs">
            如果没有收到邮件，请检查垃圾邮件箱
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="zlu-form-group">
            <label htmlFor="email" className="zlu-label">
              邮箱地址
            </label>
            <input
              id="email"
              type="email"
              {...register("email")}
              className="zlu-input"
              placeholder="your@email.com"
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="zlu-button zlu-button-primary w-full"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin" size={16} />
                发送中...
              </>
            ) : (
              "发送重置邮件"
            )}
          </button>
        </form>
      )}

      <div className="text-center mt-6">
        <Link to="/login" className="text-sm text-[var(--zlu-primary)] hover:text-[var(--zlu-primary-hover)]">
          返回登录
        </Link>
      </div>
    </div>
  );
}
