import { useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { CheckCircle, XCircle, Loader2, ArrowRight } from "lucide-react";
import type { VerifyEmailPageProps } from "@/features/theme/contract/pages";

export function VerifyEmailPage({ status }: VerifyEmailPageProps) {
  const isVerifying = status === "ANALYZING";

  useEffect(() => {
    // Trigger verification on mount
  }, []);

  return (
    <div className="text-center py-8">
      {isVerifying ? (
        <>
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--klu-accent-primary)]/20 flex items-center justify-center">
            <Loader2 size={32} className="text-[var(--klu-accent-primary)] animate-spin" />
          </div>
          <h2 className="text-xl font-bold text-[var(--klu-text-primary)] mb-2">
            正在验证...
          </h2>
          <p className="text-[var(--klu-text-secondary)]">
            请稍候，正在验证您的邮箱
          </p>
        </>
      ) : status === "SUCCESS" ? (
        <>
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--klu-accent-success)]/20 flex items-center justify-center">
            <CheckCircle size={32} className="text-[var(--klu-accent-success)]" />
          </div>
          <h2 className="text-xl font-bold text-[var(--klu-text-primary)] mb-2">
            验证成功
          </h2>
          <p className="text-[var(--klu-text-secondary)] mb-4">
            您的邮箱已成功验证
          </p>
          <Link to="/login" className="klu-btn klu-btn-primary">
            去登录
            <ArrowRight size={16} />
          </Link>
        </>
      ) : (
        <>
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--klu-accent-danger)]/20 flex items-center justify-center">
            <XCircle size={32} className="text-[var(--klu-accent-danger)]" />
          </div>
          <h2 className="text-xl font-bold text-[var(--klu-text-primary)] mb-2">
            验证失败
          </h2>
          <p className="text-[var(--klu-text-secondary)] mb-4">
            验证链接已过期或无效
          </p>
          <Link to="/register" className="klu-btn klu-btn-primary">
            重新注册
          </Link>
        </>
      )}
    </div>
  );
}
