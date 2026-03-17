"use client";

import { Github, Loader2 } from "lucide-react";
import type { SocialLoginData } from "@/features/theme/contract/pages";

interface SocialLoginProps extends SocialLoginData {
  showDivider?: boolean;
}

export function SocialLogin({
  isLoading,
  handleGithubLogin,
  showDivider = true,
}: SocialLoginProps) {
  return (
    <div className="space-y-4">
      {showDivider && (
        <div className="relative flex items-center">
          <div className="grow h-px bg-[var(--zlu-border)]"></div>
          <span className="shrink-0 mx-4 text-xs text-[var(--zlu-text-secondary)]">
            或者
          </span>
          <div className="grow h-px bg-[var(--zlu-border)]"></div>
        </div>
      )}

      <button
        type="button"
        onClick={handleGithubLogin}
        disabled={isLoading}
        className="w-full py-2.5 px-4 border border-[var(--zlu-border)] rounded-lg flex items-center justify-center gap-2 transition-all hover:border-[var(--zlu-border-muted)] hover:bg-[var(--zlu-bg-tertiary)] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <Loader2 size={16} className="text-[var(--zlu-text-secondary)] animate-spin" />
        ) : (
          <Github size={16} className="text-[var(--zlu-text-secondary)]" />
        )}

        <span className="text-sm text-[var(--zlu-text-secondary)]">
          {isLoading ? "正在连接..." : "GitHub 登录"}
        </span>
      </button>
    </div>
  );
}
