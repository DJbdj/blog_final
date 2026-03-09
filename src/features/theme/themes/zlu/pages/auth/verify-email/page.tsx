"use client";

import { Link } from "@tanstack/react-router";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import type { VerifyEmailPageProps } from "@/features/theme/contract/pages";

export function VerifyEmailPage({ status, error }: VerifyEmailPageProps) {
  if (status === "ANALYZING") {
    return (
      <div className="zlu-auth-card text-center">
        <Loader2 className="w-16 h-16 text-blue-500 animate-spin mx-auto mb-4" />
        <h1 className="zlu-auth-title mb-2">验证中...</h1>
        <p className="zlu-auth-subtitle">请稍候，正在验证您的邮箱</p>
      </div>
    );
  }

  if (status === "SUCCESS") {
    return (
      <div className="zlu-auth-card text-center">
        <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-green-500" />
        </div>
        <h1 className="zlu-auth-title mb-2">验证成功</h1>
        <p className="zlu-auth-subtitle mb-6">您的邮箱已成功验证</p>
        <Link to="/login" className="zlu-button zlu-button-primary inline-block">
          返回登录
        </Link>
      </div>
    );
  }

  return (
    <div className="zlu-auth-card text-center">
      <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
        <XCircle className="w-8 h-8 text-red-500" />
      </div>
      <h1 className="zlu-auth-title mb-2">验证失败</h1>
      <p className="zlu-auth-subtitle mb-6">{error || "验证链接已过期或无效"}</p>
      <Link to="/register" className="zlu-button zlu-button-primary inline-block">
        重新注册
      </Link>
    </div>
  );
}
