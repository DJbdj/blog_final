import { Link, useNavigate } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import type { LoginPageProps } from "@/features/theme/contract/pages";

export function LoginPage({ loginForm, turnstileElement, isEmailConfigured }: LoginPageProps) {
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await loginForm.handleSubmit();
  };

  if (loginForm.isSuccess) {
    navigate({ to: "/" });
  }

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <div className="magic-card p-8 space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">登录</h1>
          <p className="text-muted-foreground">
            欢迎回来，请登录你的账户
          </p>
        </div>

        <loginForm onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              邮箱地址
            </label>
            <input
              id="email"
              type="email"
              {...loginForm.register("email")}
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-primary"
              placeholder="your@email.com"
            />
            {loginForm.errors.email && (
              <p className="text-sm text-red-500">{loginForm.errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">
              密码
            </label>
            <input
              id="password"
              type="password"
              {...loginForm.register("password")}
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-primary"
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
            className="w-full magic-button flex items-center justify-center gap-2"
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
        </loginForm>

        {/* Links */}
        <div className="space-y-4">
          {isEmailConfigured && (
            <Link
              to="/forgot-password"
              className="block text-center text-sm text-primary hover:underline"
            >
              忘记密码？
            </Link>
          )}
          <div className="text-center">
            <span className="text-sm text-muted-foreground">
              还没有账户？
            </span>
            <Link
              to="/register"
              className="ml-2 text-sm text-primary hover:underline"
            >
              立即注册
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}