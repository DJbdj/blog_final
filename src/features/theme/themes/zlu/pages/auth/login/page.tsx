"use client";

import { Link, useNavigate } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import type { LoginPageProps } from "@/features/theme/contract/pages";

export function LoginPage({ loginForm, turnstileElement, isEmailConfigured }: LoginPageProps) {
  const navigate = useNavigate();

  if (loginForm.loginStep === "SUCCESS") {
    navigate({ to: "/" });
  }

  return (
    <div className="zlu-auth-card">
      <div className="text-center mb-6">
        <h1 className="zlu-auth-title">登录</h1>
        <p className="zlu-auth-subtitle">欢迎回来，请登录你的账户</p>
      </div>

      <form onSubmit={loginForm.handleSubmit} className="space-y-5">
        {/* Email */}
        <div className="zlu-form-group">
          <label htmlFor="email" className="zlu-label">
            邮箱地址
          </label>
          <input
            id="email"
            type="email"
            {...loginForm.register("email")}
            className="zlu-input"
            placeholder="your@email.com"
          />
          {loginForm.errors.email && (
            <p className="text-sm text-red-500">{loginForm.errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="zlu-form-group">
          <label htmlFor="password" className="zlu-label">
            密码
          </label>
          <input
            id="password"
            type="password"
            {...loginForm.register("password")}
            className="zlu-input"
            placeholder="••••••••"
          />
          {loginForm.errors.password && (
            <p className="text-sm text-red-500">{loginForm.errors.password.message}</p>
          )}
        </div>

        {/* Turnstile */}
        {turnstileElement}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loginForm.isSubmitting}
          className="zlu-button zlu-button-primary w-full"
        >
          {loginForm.isSubmitting ? (
            <>
              <Loader2 className="animate-spin" size={16} />
              登录中...
            </>
          ) : (
            "登录"
          )}
        </button>
      </form>

      {/* Links */}
      <div className="space-y-4 mt-6">
        {isEmailConfigured && (
          <Link
            to="/forgot-password"
            className="block text-center text-sm text-blue-400 hover:text-blue-300"
          >
            忘记密码？
          </Link>
        )}
        <div className="text-center">
          <span className="text-sm text-gray-400">还没有账户？</span>
          <Link
            to="/register"
            className="ml-2 text-sm text-blue-400 hover:text-blue-300"
          >
            立即注册
          </Link>
        </div>
      </div>
    </div>
  );
}
