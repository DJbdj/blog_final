import { Link, useSearchParams } from "@tanstack/react-router";
import { Mail, CheckCircle, AlertCircle } from "lucide-react";

export function VerifyEmailPage({
  isVerified,
  verifyEmail,
  isSuccess,
  error,
}: {
  isVerified: boolean;
  verifyEmail: () => Promise<void>;
  isSuccess: boolean;
  error?: string;
}) {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  if (!token) {
    return (
      <div className="max-w-md mx-auto px-4 py-12 text-center">
        <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
        <h2 className="text-xl font-bold mb-2">链接无效</h2>
        <p className="text-muted-foreground mb-6">
          验证链接已过期或无效
        </p>
        <Link
          to="/register"
          className="magic-button"
        >
          重新注册
        </Link>
      </div>
    );
  }

  if (isVerified) {
    return (
      <div className="max-w-md mx-auto px-4 py-12 text-center">
        <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
        <h2 className="text-xl font-bold mb-2">验证成功！</h2>
        <p className="text-muted-foreground mb-6">
          你的邮箱已成功验证
        </p>
        <Link
          to="/login"
          className="magic-button"
        >
          登录账户
        </Link>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="max-w-md mx-auto px-4 py-12 text-center">
        <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
        <h2 className="text-xl font-bold mb-2">邮件已发送</h2>
        <p className="text-muted-foreground mb-6">
          请检查你的邮箱并点击验证链接
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
          <h1 className="text-2xl font-bold mb-2">验证邮箱</h1>
          <p className="text-muted-foreground mb-4">
            {isVerified ? "邮箱已验证" : "我们将向你的邮箱发送验证链接"}
          </p>
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
              {error}
            </div>
          )}
        </div>

        {!isVerified && (
          <button
            onClick={verifyEmail}
            className="w-full magic-button flex items-center justify-center gap-2"
          >
            <Mail size={16} />
            {isSuccess ? "已发送" : "发送验证邮件"}
          </button>
        )}

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