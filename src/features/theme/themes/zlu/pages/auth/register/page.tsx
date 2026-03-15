"use client";

import { Link, useNavigate } from "@tanstack/react-router";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useState } from "react";
import type { RegisterPageProps } from "@/features/theme/contract/pages";

export function RegisterPage({ registerForm }: RegisterPageProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  if (registerForm.isSuccess) {
    navigate({ to: "/login" });
  }

  return (
    <div className="zlu-auth-card">
      <div className="text-center mb-6">
        <h1 className="zlu-auth-title">注册账户</h1>
        <p className="zlu-auth-subtitle">创建新账户开始你的博客之旅</p>
      </div>

      <form onSubmit={registerForm.handleSubmit} className="space-y-5">
        {/* Name */}
        <div className="zlu-form-group">
          <label htmlFor="name" className="zlu-label">
            用户名
          </label>
          <input
            id="name"
            type="text"
            {...registerForm.register("name")}
            className="zlu-input"
            placeholder="输入用户名"
          />
          {registerForm.errors.name && (
            <p className="text-sm text-red-500">{registerForm.errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div className="zlu-form-group">
          <label htmlFor="email" className="zlu-label">
            邮箱地址
          </label>
          <input
            id="email"
            type="email"
            {...registerForm.register("email")}
            className="zlu-input"
            placeholder="your@email.com"
          />
          {registerForm.errors.email && (
            <p className="text-sm text-red-500">{registerForm.errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="zlu-form-group">
          <label htmlFor="password" className="zlu-label">
            密码
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              {...registerForm.register("password")}
              className="zlu-input pr-10"
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
            >
              {showPassword ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>
          </div>
          {registerForm.errors.password && (
            <p className="text-sm text-red-500">{registerForm.errors.password.message}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="zlu-form-group">
          <label htmlFor="confirmPassword" className="zlu-label">
            确认密码
          </label>
          <div className="relative">
            <input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              {...registerForm.register("confirmPassword")}
              className="zlu-input pr-10"
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
            >
              {showConfirmPassword ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>
          </div>
          {registerForm.errors.confirmPassword && (
            <p className="text-sm text-red-500">{registerForm.errors.confirmPassword.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={registerForm.isSubmitting}
          className="zlu-button zlu-button-primary w-full"
        >
          {registerForm.isSubmitting ? (
            <>
              <Loader2 className="animate-spin" size={16} />
              注册中...
            </>
          ) : (
            "注册"
          )}
        </button>
      </form>

      {/* Links */}
      <div className="text-center mt-6">
        <span className="text-sm text-gray-400">已有账户？</span>
        <Link
          to="/login"
          className="ml-2 text-sm text-blue-400 hover:text-blue-300"
        >
          立即登录
        </Link>
      </div>
    </div>
  );
}
