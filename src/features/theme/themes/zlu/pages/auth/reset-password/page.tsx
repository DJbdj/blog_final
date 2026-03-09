"use client";

import { Loader2 } from "lucide-react";
import type { ResetPasswordPageProps } from "@/features/theme/contract/pages";

export function ResetPasswordPage({ resetPasswordForm, error }: ResetPasswordPageProps) {
  const { register, errors, handleSubmit, isSubmitting } = resetPasswordForm;

  if (error) {
    return (
      <div className="zlu-auth-card text-center">
        <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <h1 className="zlu-auth-title mb-2">重置失败</h1>
        <p className="text-gray-400 mb-6">{error}</p>
      </div>
    );
  }

  return (
    <div className="zlu-auth-card">
      <div className="text-center mb-6">
        <h1 className="zlu-auth-title">重置密码</h1>
        <p className="zlu-auth-subtitle">输入新密码</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="zlu-form-group">
          <label htmlFor="password" className="zlu-label">
            新密码
          </label>
          <input
            id="password"
            type="password"
            {...register("password")}
            className="zlu-input"
            placeholder="••••••••"
          />
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>

        <div className="zlu-form-group">
          <label htmlFor="confirmPassword" className="zlu-label">
            确认密码
          </label>
          <input
            id="confirmPassword"
            type="password"
            {...register("confirmPassword")}
            className="zlu-input"
            placeholder="••••••••"
          />
          {errors.confirmPassword && (
            <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>
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
              重置中...
            </>
          ) : (
            "重置密码"
          )}
        </button>
      </form>
    </div>
  );
}
