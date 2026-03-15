import { Link } from "@tanstack/react-router";
import { Loader2, Mail } from "lucide-react";
import type { ForgotPasswordPageProps } from "@/features/theme/contract/pages";
export function ForgotPasswordPage({
  forgotPasswordForm,
}: ForgotPasswordPageProps) {

  if (forgotPasswordForm.isSent) {
    return (
      <div className="max-w-md mx-auto px-4 py-12 text-center">
        <Mail className="w-12 h-12 text-primary mx-auto mb-4" />
        <h2 className="text-xl font-bold mb-2">邮件已发送</h2>
        <p className="text-muted-foreground mb-6">
          检查你的邮箱，点击重置密码链接
        </p>
        <Link
          to="/login"
          className="magic-button"
        >
          返回登录
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <div className="magic-card p-8 space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">忘记密码</h1>
          <p className="text-muted-foreground">
            输入你的邮箱，我们将发送重置密码链接
          </p>
        </div>

        {forgotPasswordForm.errors.root && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
            {forgotPasswordForm.errors.root.message}
          </div>
        )}

        <form onSubmit={forgotPasswordForm.handleSubmit} className="space-y-6">
          {/* Email */}
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              邮箱地址
            </label>
            <input
              id="email"
              type="email"
              {...forgotPasswordForm.register("email")}
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-primary"
              placeholder="your@email.com"
            />
            {forgotPasswordForm.errors.email && (
              <p className="text-sm text-red-500">{forgotPasswordForm.errors.email.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={forgotPasswordForm.isSubmitting}
            className="w-full magic-button flex items-center justify-center gap-2"
          >
            {forgotPasswordForm.isSubmitting ? (
              <>
                <Loader2 className="animate-spin" size={16} />
                发送中...
              </>
            ) : (
              "发送重置链接"
            )}
          </button>
        </form>

        <div className="text-center">
          <Link
            to="/login"
            className="text-sm text-primary hover:underline"
          >
            返回登录
          </Link>
        </div>
      </div>
    </div>
  );
}