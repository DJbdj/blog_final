"use client";

import { Link } from "@tanstack/react-router";
import { blogConfig } from "@/blog.config";
import type { PublicLayoutProps } from "@/features/theme/contract/layouts";
import { useTheme } from "@/components/common/theme-provider";

interface MobileMenuProps {
  navOptions: Array<{ label: string; to: string; id: string }>;
  isOpen: boolean;
  onClose: () => void;
  user?: PublicLayoutProps["user"];
  logout?: () => Promise<void>;
}

export function MobileMenu({ navOptions, isOpen, onClose, user, logout }: MobileMenuProps) {
  const { userTheme, setTheme } = useTheme();

  if (!isOpen) return null;

  const themeIcons = {
    light: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    dark: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
      </svg>
    ),
    system: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  };

  const themeLabels = {
    light: "浅色模式",
    dark: "深色模式",
    system: "跟随系统",
  };

  const cycleTheme = () => {
    const order: Array<"light" | "dark" | "system"> = ["light", "dark", "system"];
    const currentIndex = order.indexOf(userTheme as any);
    const nextIndex = (currentIndex + 1) % order.length;
    setTheme(order[nextIndex]);
  };

  return (
    <div className={`zlu-mobile-menu ${isOpen ? "open" : ""}`} onClick={onClose}>
      <div className="zlu-mobile-overlay" />
      <div className="zlu-mobile-panel" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-6">
          <Link to="/" className="zlu-logo" onClick={onClose}>
            {blogConfig.title}
          </Link>
          <button
            onClick={onClose}
            className="text-[var(--zlu-text-secondary)] hover:text-[var(--zlu-text-primary)] transition-colors"
            aria-label="关闭菜单"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="flex flex-col gap-2">
          {navOptions.map((item) => (
            <Link
              key={item.id}
              to={item.to}
              className="zlu-nav-item"
              onClick={onClose}
              activeProps={{ className: "active" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Theme Switcher */}
        <div className="mt-6 pt-6 border-t border-[var(--zlu-border)]">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-[var(--zlu-text-secondary)]">主题模式</span>
            <button
              onClick={cycleTheme}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--zlu-bg-tertiary)] hover:bg-[var(--zlu-bg-elevated)] transition-colors text-sm text-[var(--zlu-text-primary)]"
              aria-label={`切换主题 (当前：${themeLabels[userTheme]})`}
            >
              {themeIcons[userTheme]}
              <span>{themeLabels[userTheme]}</span>
            </button>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-[var(--zlu-border)]">
          {user ? (
            <>
              <div className="flex items-center gap-3 mb-4 px-2">
                {user.image ? (
                  <img src={user.image} alt={user.name} className="w-10 h-10 rounded-full" />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-[var(--zlu-primary)] flex items-center justify-center text-white font-semibold">
                    {user.name[0].toUpperCase()}
                  </div>
                )}
                <div>
                  <p className="text-sm font-medium text-[var(--zlu-text-primary)]">{user.name}</p>
                  {user.role && (
                    <p className="text-xs text-[var(--zlu-text-secondary)]">{user.role === "admin" ? "管理员" : "用户"}</p>
                  )}
                </div>
              </div>
              <Link to="/admin" className="zlu-button zlu-button-primary w-full mb-2" onClick={onClose}>
                控制台
              </Link>
              {logout && (
                <button
                  onClick={() => logout().then(onClose)}
                  className="zlu-button zlu-button-secondary w-full"
                >
                  退出登录
                </button>
              )}
            </>
          ) : (
            <Link to="/login" className="zlu-button zlu-button-primary w-full" onClick={onClose}>
              登录
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
