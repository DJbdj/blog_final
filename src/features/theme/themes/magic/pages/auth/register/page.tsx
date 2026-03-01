import { Link, useNavigate } from "@tanstack/react-router";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useState } from "react";
import type { RegisterPageProps } from "@/features/theme/contract/pages";

export function RegisterPage({ form, turnstileElement, isEmailConfigured }: RegisterPageProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await form.handleSubmit();
  };

  if (form.isSuccess) {
    navigate({ to: "/login" });
  }

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <div className="magic-card p-8 space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">注册账户</h1>
          <p className="text-muted-foreground">
            创建新账户开始你的博客之旅
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              用户名
            </label>
            <input
              id="name"
              type="text"
              {...form.register("name")}
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-primary"
              placeholder="输入用户名"
            />
            {form.errors.name && (
              <p className="text-sm text-red-500">{form.errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              邮箱地址
            </label>
            <input
              id="email"
              type="email"
              {...form.register("email")}
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-primary"
              placeholder="your@email.com"
            />
            {form.errors.email && (
              <p className="text-sm text-red-500">{form.errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">
              密码
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                {...form.register("password")}
                className="w-full px-4 py-2 pr-10 border border-border rounded-lg focus:outline-none focus:border-primary"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>
            </div>
            {form.errors.password && (
              <p className="text-sm text-red-500">{form.errors.password.message}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="text-sm font-medium">
              确认密码
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                {...form.register("confirmPassword")}
                className="w-full px-4 py-2 pr-10 border border-border rounded-lg focus:outline-none focus:border-primary"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showConfirmPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>
            </div>
            {form.errors.confirmPassword && (
              <p className="text-sm text-red-500">{form.errors.confirmPassword.message}</p>
            )}
          </div>

          {/* Turnstile */}
          {turnstileElement}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={form.isSubmitting || turnstilePending}
            className="w-full magic-button flex items-center justify-center gap-2"
          >
            {form.isSubmitting ? (
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
        <div className="text-center">
          <span className="text-sm text-muted-foreground">
            已有账户？
          </span>
          <Link
            to="/login"
            className="ml-2 text-sm text-primary hover:underline"
          >
            立即登录
          </Link>
        </div>
      </div>
    </div>
  );
}